import type { DimId, DimScores } from "./types";
import { clampScore, computePei } from "./calculator";
import { phaseFor } from "./dimensions";

export type ScenarioEvent = {
  yearOffset: number;
  dim: DimId;
  delta: number;
  description: string;
};

export type ScenarioTemplate = {
  id: string;
  name: string;
  chapter: string;
  duration: number;
  startYear: number;
  description: string;
  events: ScenarioEvent[];
};

export const BASELINES: { id: string; label: string; scores: DimScores }[] = [
  {
    id: "global",
    label: "Global mean (2026)",
    scores: { inequality: 82, institutions: 48, conflict: 72, energy: 48, information: 46, environment: 58 },
  },
  {
    id: "us",
    label: "United States",
    scores: { inequality: 62, institutions: 48, conflict: 32, energy: 26, information: 44, environment: 40 },
  },
  {
    id: "cn",
    label: "China",
    scores: { inequality: 54, institutions: 34, conflict: 22, energy: 42, information: 82, environment: 62 },
  },
  {
    id: "eu",
    label: "European core",
    scores: { inequality: 40, institutions: 28, conflict: 18, energy: 42, information: 26, environment: 34 },
  },
  {
    id: "fragile",
    label: "High-entropy system",
    scores: { inequality: 70, institutions: 82, conflict: 88, energy: 72, information: 78, environment: 68 },
  },
];

export const SCENARIOS: ScenarioTemplate[] = [
  {
    id: "cooperation",
    name: "Low-entropy future",
    chapter: "Ch. 17 · Scenario analysis",
    duration: 24,
    startYear: 2026,
    description: "Global cooperation, green energy, and institutional redundancy — the book's low-entropy path.",
    events: [
      { yearOffset: 2, dim: "conflict", delta: -12, description: "Peace agreements in major conflict zones" },
      { yearOffset: 4, dim: "energy", delta: -14, description: "Coordinated green-energy build-out" },
      { yearOffset: 6, dim: "environment", delta: -16, description: "Reforestation and carbon drawdown" },
      { yearOffset: 8, dim: "inequality", delta: -10, description: "Redistributive bargains hold" },
      { yearOffset: 10, dim: "institutions", delta: -12, description: "International institutions thicken" },
      { yearOffset: 14, dim: "information", delta: -8, description: "Transparency standards reduce epistemic entropy" },
      { yearOffset: 20, dim: "conflict", delta: -10, description: "Proxy wars recede" },
    ],
  },
  {
    id: "climate",
    name: "Climate entropy bomb",
    chapter: "Ch. 18 · Trend 3",
    duration: 20,
    startYear: 2026,
    description: "Warming as an entropy accelerator: crop failure, migration, resource wars.",
    events: [
      { yearOffset: 1, dim: "environment", delta: 18, description: "Compound droughts and crop failures" },
      { yearOffset: 3, dim: "energy", delta: 14, description: "Fossil peak and price spikes" },
      { yearOffset: 5, dim: "conflict", delta: 16, description: "Water and land contests" },
      { yearOffset: 8, dim: "institutions", delta: 14, description: "Governments fail the climate load" },
      { yearOffset: 10, dim: "inequality", delta: 12, description: "Climate refugees strain social contracts" },
      { yearOffset: 15, dim: "information", delta: 8, description: "Survival politics crowds out shared facts" },
      { yearOffset: 20, dim: "conflict", delta: 18, description: "Resource wars go systemic" },
    ],
  },
  {
    id: "ai",
    name: "Digital thermodynamics",
    chapter: "Ch. 18 · Trend 2",
    duration: 15,
    startYear: 2026,
    description: "AI as a new energy source — and a new entropy generator.",
    events: [
      { yearOffset: 2, dim: "energy", delta: -8, description: "Grid optimization from AI dispatch" },
      { yearOffset: 3, dim: "inequality", delta: 12, description: "Job displacement concentrates rents" },
      { yearOffset: 5, dim: "information", delta: 16, description: "Synthetic media floods the public sphere" },
      { yearOffset: 7, dim: "institutions", delta: 10, description: "Regulation lags capability" },
      { yearOffset: 10, dim: "conflict", delta: 12, description: "AI arms race among majors" },
      { yearOffset: 12, dim: "inequality", delta: 8, description: "Model owners capture surplus" },
      { yearOffset: 15, dim: "institutions", delta: 14, description: "Legitimacy crisis over automated power" },
    ],
  },
  {
    id: "coldwar2",
    name: "US–China entropy race",
    chapter: "Ch. 12 · Superpower transitions",
    duration: 20,
    startYear: 2026,
    description: "Bloc politics, supply-chain rupture, and proxy dissipation.",
    events: [
      { yearOffset: 1, dim: "conflict", delta: 8, description: "Trade war hardens into blocs" },
      { yearOffset: 3, dim: "energy", delta: 10, description: "Supply-chain weaponization" },
      { yearOffset: 5, dim: "information", delta: 12, description: "Propaganda and platform splits" },
      { yearOffset: 7, dim: "institutions", delta: 10, description: "Alliances fray" },
      { yearOffset: 10, dim: "inequality", delta: 8, description: "Military outlays crowd social spend" },
      { yearOffset: 15, dim: "conflict", delta: 14, description: "Proxy wars in Asia and Africa" },
      { yearOffset: 18, dim: "institutions", delta: 12, description: "Domestic unrest in both cores" },
    ],
  },
  {
    id: "pandemic",
    name: "Synchronized shock",
    chapter: "Ch. 10 · COVID as entropy sync",
    duration: 10,
    startYear: 2026,
    description: "A second pandemic as global entropy synchronization.",
    events: [
      { yearOffset: 0, dim: "institutions", delta: 16, description: "Outbreak panic and emergency rule" },
      { yearOffset: 1, dim: "conflict", delta: 10, description: "Borders slam shut" },
      { yearOffset: 2, dim: "energy", delta: 14, description: "Logistics collapse" },
      { yearOffset: 3, dim: "inequality", delta: 12, description: "Care and income gaps widen" },
      { yearOffset: 4, dim: "information", delta: 10, description: "Rumor cascades" },
      { yearOffset: 8, dim: "conflict", delta: 12, description: "Vaccine nationalism" },
      { yearOffset: 10, dim: "institutions", delta: -8, description: "Public-health rebuild" },
    ],
  },
  {
    id: "green",
    name: "Great energy transition",
    chapter: "Ch. 18 · Trend 1",
    duration: 24,
    startYear: 2026,
    description: "Oil → renewables → fusion? Order rebuilt on a new energy substrate.",
    events: [
      { yearOffset: 2, dim: "energy", delta: -10, description: "Solar and wind costs collapse" },
      { yearOffset: 5, dim: "environment", delta: -14, description: "Emissions peak and fall" },
      { yearOffset: 8, dim: "inequality", delta: -6, description: "Green jobs absorb some displacement" },
      { yearOffset: 10, dim: "energy", delta: -12, description: "Import dependence falls in industrial cores" },
      { yearOffset: 15, dim: "conflict", delta: 8, description: "Petro-states destabilize" },
      { yearOffset: 20, dim: "energy", delta: -10, description: "Fusion demonstration scale" },
      { yearOffset: 24, dim: "institutions", delta: -8, description: "Post-scarcity governance experiments" },
    ],
  },
];

export type ScenarioPoint = {
  year: number;
  pei: number;
  dimensions: DimScores;
  note?: string;
  phase: ReturnType<typeof phaseFor>;
};

export function projectScenario(scores: DimScores, template: ScenarioTemplate): ScenarioPoint[] {
  const current = { ...scores };
  const out: ScenarioPoint[] = [];
  const byYear = new Map<number, ScenarioEvent[]>();
  for (const ev of template.events) {
    const list = byYear.get(ev.yearOffset) ?? [];
    list.push(ev);
    byYear.set(ev.yearOffset, list);
  }
  for (let i = 0; i <= template.duration; i++) {
    const notes: string[] = [];
    for (const ev of byYear.get(i) ?? []) {
      current[ev.dim] = clampScore(current[ev.dim] + ev.delta);
      notes.push(ev.description);
    }
    const pei = computePei(current);
    out.push({
      year: template.startYear + i,
      pei,
      dimensions: { ...current },
      note: notes.length ? notes.join(" · ") : undefined,
      phase: phaseFor(pei),
    });
  }
  return out;
}
