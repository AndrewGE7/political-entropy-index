import { computePei } from "./calculator";
import { phaseFor } from "./dimensions";
import { ISO2_TO_ISO3 } from "./live";
import type { ConnectionStatus, CountryRecord, DimId } from "./types";

export type AdapterKind = "worldbank" | "json" | "csv";

export type ResearchAdapter = {
  id: string;
  name: string;
  kind: AdapterKind;
  dimension: DimId;
  enabled: boolean;
  invert: boolean;
  blend: number;
  indicator?: string;
  url?: string;
  csv?: string;
  rows?: { code: string; value: number }[];
  scaleMin?: number;
  scaleMax?: number;
  note?: string;
};

export const ADAPTER_PRESETS: Omit<ResearchAdapter, "id" | "enabled">[] = [
  {
    name: "World Bank Gini",
    kind: "worldbank",
    dimension: "inequality",
    invert: false,
    blend: 0.4,
    indicator: "SI.POV.GINI",
    scaleMin: 0,
    scaleMax: 100,
    note: "Already in the canonical live overlay. Enable only to re-blend.",
  },
  {
    name: "World Bank political stability",
    kind: "worldbank",
    dimension: "institutions",
    invert: true,
    blend: 0.4,
    indicator: "PV.EST",
    scaleMin: -2.5,
    scaleMax: 2.5,
    note: "WGI estimate. High stability inverts to low institutional entropy.",
  },
  {
    name: "World Bank energy imports",
    kind: "worldbank",
    dimension: "energy",
    invert: false,
    blend: 0.4,
    indicator: "EG.IMP.CONS.ZS",
    scaleMin: 0,
    scaleMax: 100,
    note: "Import share of energy use.",
  },
  {
    name: "World Bank PM2.5",
    kind: "worldbank",
    dimension: "environment",
    invert: false,
    blend: 0.4,
    indicator: "EN.ATM.PM25.MC.M3",
    scaleMin: 0,
    scaleMax: 80,
    note: "Mean annual exposure. 80 µg/m³ maps to ceiling entropy.",
  },
  {
    name: "World Bank internet users",
    kind: "worldbank",
    dimension: "information",
    invert: true,
    blend: 0.35,
    indicator: "IT.NET.USER.ZS",
    scaleMin: 0,
    scaleMax: 100,
    note: "Access is not truth. Treat as a thin information overlay, not Freedom House.",
  },
  {
    name: "World Bank central-gov debt / GDP",
    kind: "worldbank",
    dimension: "inequality",
    invert: false,
    blend: 0.25,
    indicator: "GC.DOD.TOTL.GD.ZS",
    scaleMin: 0,
    scaleMax: 150,
    note: "Fiscal load as a secondary inequality/friction channel. Research overlay only.",
  },
];

const ISO3_TO_ISO2: Record<string, string> = Object.fromEntries(
  Object.entries(ISO2_TO_ISO3).map(([a, b]) => [b, a]),
);

function clamp(n: number) {
  return Math.min(100, Math.max(0, n));
}

export function toEntropy(
  value: number,
  invert: boolean,
  scaleMin = 0,
  scaleMax = 100,
): number {
  const span = scaleMax - scaleMin || 1;
  const t = clamp(((value - scaleMin) / span) * 100);
  return invert ? Math.round((100 - t) * 10) / 10 : Math.round(t * 10) / 10;
}

export function parseCsv(text: string): { code: string; value: number }[] {
  const rows: { code: string; value: number }[] = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.toLowerCase().startsWith("code")) continue;
    const [codeRaw, valueRaw] = t.split(/[,;\t]/);
    const code = (codeRaw || "").trim().toUpperCase();
    const value = Number(valueRaw);
    if (!code || !Number.isFinite(value)) continue;
    rows.push({ code, value });
  }
  return rows;
}

export function resolveCode(code: string): string | null {
  const c = code.trim().toUpperCase();
  if (c.length === 2 && ISO2_TO_ISO3[c]) return c;
  if (c.length === 3 && ISO3_TO_ISO2[c]) return c.length === 3 ? ISO3_TO_ISO2[c] : c;
  return null;
}

function mix(cur: number, incoming: number, w: number) {
  const b = Math.min(1, Math.max(0, w));
  return Math.round((cur * (1 - b) + incoming * b) * 10) / 10;
}

export function applyAdapters(
  countries: CountryRecord[],
  adapters: ResearchAdapter[],
  maps: Record<string, Map<string, number>>,
): { countries: CountryRecord[]; connections: ConnectionStatus[] } {
  const active = adapters.filter((a) => a.enabled);
  if (!active.length) return { countries, connections: [] };

  const next = countries.map((c) => {
    const scores = { ...c.scores };
    const liveFlags = { ...c.liveFlags };
    for (const a of active) {
      const map = maps[a.id];
      if (!map) continue;
      const v = map.get(c.code);
      if (v == null) continue;
      const entropy = toEntropy(v, a.invert, a.scaleMin, a.scaleMax);
      scores[a.dimension] = mix(scores[a.dimension], entropy, a.blend);
      liveFlags[a.dimension] = true;
    }
    const pei = computePei(scores);
    const last = c.history[c.history.length - 1];
    const history = c.history.map((h) =>
      h.year === last?.year ? { ...h, pei, dimensions: scores } : h,
    );
    return { ...c, scores, pei, phase: phaseFor(pei), history, liveFlags };
  });
  next.sort((a, b) => b.pei - a.pei);

  const connections: ConnectionStatus[] = active.map((a) => {
    const map = maps[a.id];
    return {
      source: `Adapter · ${a.name}`,
      status: map && map.size ? "mixed" : "error",
      detail: map && map.size
        ? `${map.size} rows on ${a.dimension} (local overlay, not canonical PEI)`
        : "No rows matched the board",
    };
  });

  return { countries: next, connections };
}

export function iso3MapToIso2(src: Map<string, number>): Map<string, number> {
  const out = new Map<string, number>();
  for (const [k, v] of src) {
    const iso2 = k.length === 2 ? resolveCode(k) : ISO3_TO_ISO2[k];
    if (iso2) out.set(iso2, v);
  }
  return out;
}

export function rowsToMap(rows: { code: string; value: number }[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows) {
    const code = resolveCode(row.code);
    if (code) map.set(code, row.value);
  }
  return map;
}
