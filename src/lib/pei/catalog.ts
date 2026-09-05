import { buildAlerts } from "./alerts";
import { computePei, interpolateHistory } from "./calculator";
import { COUNTRY_SEEDS } from "./countries";
import { phaseFor } from "./dimensions";
import type { CountryRecord, CountrySeed } from "./types";

export function materialize(seed: CountrySeed): CountryRecord {
  const scores = { ...seed.scores };
  const history = interpolateHistory(seed.scores2021, scores);
  const pei = history[history.length - 1]?.pei ?? computePei(scores);
  return {
    code: seed.code,
    name: seed.name,
    region: seed.region,
    scores,
    pei,
    phase: phaseFor(pei),
    history,
    events: seed.events,
    liveFlags: {},
  };
}

export function buildCatalog(seeds = COUNTRY_SEEDS): CountryRecord[] {
  return seeds.map(materialize).sort((a, b) => b.pei - a.pei);
}

export function catalogWithAlerts(seeds = COUNTRY_SEEDS) {
  const countries = buildCatalog(seeds);
  return { countries, alerts: buildAlerts(countries) };
}
