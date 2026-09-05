import { computePei } from "./calculator";
import { phaseFor } from "./dimensions";
import { materialize } from "./catalog";
import { COUNTRY_SEEDS } from "./countries";
import type { ConnectionStatus, CountryRecord, DimId, DimScores } from "./types";

type WbRow = {
  countryiso3code?: string;
  value: number | null;
};

export const ISO2_TO_ISO3: Record<string, string> = {
  NO: "NOR",
  CH: "CHE",
  NZ: "NZL",
  CA: "CAN",
  JP: "JPN",
  DE: "DEU",
  AU: "AUS",
  KR: "KOR",
  GB: "GBR",
  FR: "FRA",
  PL: "POL",
  US: "USA",
  IT: "ITA",
  BR: "BRA",
  IN: "IND",
  ID: "IDN",
  VN: "VNM",
  MX: "MEX",
  ZA: "ZAF",
  TR: "TUR",
  SA: "SAU",
  EG: "EGY",
  NG: "NGA",
  ET: "ETH",
  PK: "PAK",
  AR: "ARG",
  CN: "CHN",
  TW: "TWN",
  IL: "ISR",
  IR: "IRN",
  UA: "UKR",
  RU: "RUS",
  VE: "VEN",
  KP: "PRK",
  MM: "MMR",
  SD: "SDN",
  YE: "YEM",
};

function clamp(n: number) {
  return Math.min(100, Math.max(0, n));
}

function blend(curated: number, live: number) {
  return Math.round((curated * 0.6 + live * 0.4) * 10) / 10;
}

export async function fetchWorldBankIndicator(code: string): Promise<Map<string, number>> {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=400&mrv=1`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${code} ${res.status}`);
  const json = (await res.json()) as [unknown, WbRow[]];
  const rows = json[1] ?? [];
  const map = new Map<string, number>();
  for (const row of rows) {
    if (row.value == null) continue;
    const iso3 = row.countryiso3code || "";
    if (iso3) map.set(iso3, row.value);
  }
  return map;
}

function mapOrEmpty(r: PromiseSettledResult<Map<string, number>>) {
  return r.status === "fulfilled" ? r.value : new Map<string, number>();
}

/** PV.EST is roughly -2.5..2.5 (higher = more stable). Convert to institutional entropy. */
function stabilityToEntropy(v: number) {
  return Math.round(clamp(50 - v * 25) * 10) / 10;
}

/** Energy imports % of use. Exporters (negative) sit near 0 entropy on this channel. */
function importsToEntropy(v: number) {
  return Math.round(clamp(v) * 10) / 10;
}

/** PM2.5 µg/m³. 80 µg maps to ceiling. */
function pm25ToEntropy(v: number) {
  return Math.round(clamp((v / 80) * 100) * 10) / 10;
}

export async function refreshLive(): Promise<{
  countries: CountryRecord[];
  connections: ConnectionStatus[];
}> {
  const baseline = baselineCatalog();
  const connections: ConnectionStatus[] = [
    { source: "World Bank", status: "baseline", detail: "Not fetched" },
    { source: "Freedom House / ITU", status: "baseline", detail: "Curated information-flow scores" },
    { source: "UCDP/PRIO", status: "baseline", detail: "Curated conflict intensity" },
    { source: "WID / Polity / EI / NASA-IPCC", status: "baseline", detail: "Framework defaults" },
  ];

  try {
    const results = await Promise.allSettled([
      fetchWorldBankIndicator("SI.POV.GINI"),
      fetchWorldBankIndicator("PV.EST"),
      fetchWorldBankIndicator("EG.IMP.CONS.ZS"),
      fetchWorldBankIndicator("EN.ATM.PM25.MC.M3"),
    ]);
    const gini = mapOrEmpty(results[0]);
    const stab = mapOrEmpty(results[1]);
    const energy = mapOrEmpty(results[2]);
    const pm = mapOrEmpty(results[3]);

    const liveBits = [
      gini.size ? `Gini ${gini.size}` : null,
      stab.size ? `PV.EST ${stab.size}` : null,
      energy.size ? `energy imports ${energy.size}` : null,
      pm.size ? `PM2.5 ${pm.size}` : null,
    ].filter(Boolean);

    connections[0] = {
      source: "World Bank",
      status: liveBits.length ? "live" : "error",
      detail: liveBits.length
        ? `Live overlay: ${liveBits.join(" · ")}. Conflict and information stay curated.`
        : "Empty payload — using baseline",
    };

    const countries = baseline.map((c) => {
      const iso3 = ISO2_TO_ISO3[c.code];
      const scores: DimScores = { ...c.scores };
      const liveFlags: Partial<Record<DimId, boolean>> = {};
      if (iso3 && gini.has(iso3)) {
        scores.inequality = blend(c.scores.inequality, clamp(gini.get(iso3)!));
        liveFlags.inequality = true;
      }
      if (iso3 && stab.has(iso3)) {
        scores.institutions = blend(c.scores.institutions, stabilityToEntropy(stab.get(iso3)!));
        liveFlags.institutions = true;
      }
      if (iso3 && energy.has(iso3)) {
        scores.energy = blend(c.scores.energy, importsToEntropy(energy.get(iso3)!));
        liveFlags.energy = true;
      }
      if (iso3 && pm.has(iso3)) {
        scores.environment = blend(c.scores.environment, pm25ToEntropy(pm.get(iso3)!));
        liveFlags.environment = true;
      }
      const pei = computePei(scores);
      const last = c.history[c.history.length - 1];
      const history = c.history.map((h) => (h.year === last.year ? { ...h, pei, dimensions: scores } : h));
      return { ...c, scores, pei, phase: phaseFor(pei), history, liveFlags };
    });

    countries.sort((a, b) => b.pei - a.pei);
    return { countries, connections };
  } catch (err) {
    connections[0] = {
      source: "World Bank",
      status: "error",
      detail: err instanceof Error ? err.message : "Fetch failed — using baseline",
    };
    return { countries: baseline, connections };
  }
}

export function baselineCatalog(): CountryRecord[] {
  return COUNTRY_SEEDS.map(materialize).sort((a, b) => b.pei - a.pei);
}
