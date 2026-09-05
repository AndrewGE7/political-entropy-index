import type { DimId, DimensionMeta, EntropyPhase } from "./types";

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: "inequality",
    label: "Economic Inequality",
    short: "Inequality",
    weight: 0.25,
    source: "World Inequality Database · World Bank SI.POV.GINI",
    liveIndicator: "SI.POV.GINI",
    description:
      "Dispersion of income and wealth. High concentration raises systemic friction and reduces the system's capacity to absorb shocks.",
  },
  {
    id: "institutions",
    label: "Institutional Stability",
    short: "Institutions",
    weight: 0.2,
    source: "Polity IV / V-Dem · World Bank PV.EST",
    liveIndicator: "PV.EST",
    description:
      "Erosion of rule-bound coordination: executive constraint, succession risk, legal uncertainty, and capture. Scored as instability (higher = more entropy).",
  },
  {
    id: "conflict",
    label: "Conflict Intensity",
    short: "Conflict",
    weight: 0.2,
    source: "UCDP/PRIO Armed Conflict Dataset",
    description:
      "Organized violence, militarized disputes, and internal unrest. Direct destruction of political order and the fastest path to phase transition.",
  },
  {
    id: "energy",
    label: "Energy Security",
    short: "Energy",
    weight: 0.15,
    source: "Energy Institute Statistical Review · World Bank EG.IMP.CONS.ZS",
    liveIndicator: "EG.IMP.CONS.ZS",
    description:
      "Import dependence, supply disruption risk, and grid fragility. Energy is the physical substrate of institutional order.",
  },
  {
    id: "information",
    label: "Information Flow",
    short: "Information",
    weight: 0.1,
    source: "Freedom House · ITU",
    description:
      "Press freedom, censorship, and fragmentation of the public sphere. Distorted information flow raises epistemic entropy even when institutions look stable.",
  },
  {
    id: "environment",
    label: "Environmental Stress",
    short: "Environment",
    weight: 0.1,
    source: "NASA / IPCC · World Bank EN.ATM.PM25.MC.M3",
    liveIndicator: "EN.ATM.PM25.MC.M3",
    description:
      "Climate shocks, water stress, air quality, and resource degradation that load the political system with unbudgeted entropy.",
  },
];

export const WEIGHTS: Record<DimId, number> = Object.fromEntries(
  DIMENSIONS.map((d) => [d.id, d.weight]),
) as Record<DimId, number>;

export const PHASE_THRESHOLDS = [
  { max: 40, phase: "ordered" as const, label: "Ordered", hint: "Coordination holds" },
  { max: 60, phase: "stressed" as const, label: "Stressed", hint: "Friction accumulating" },
  { max: 75, phase: "unstable" as const, label: "Unstable", hint: "Phase risk rising" },
  { max: 90, phase: "critical" as const, label: "Critical", hint: "Near transition" },
  { max: 100, phase: "collapse" as const, label: "Collapse", hint: "Order failed" },
];

export const ALERT_THRESHOLDS = [70, 80, 90];
export const RAPID_CHANGE = 15;
export const HISTORY_START = 2021;
export const HISTORY_END = 2026;
export const FORECAST_YEARS = 3;

export function phaseFor(pei: number): EntropyPhase {
  if (pei < 40) return "ordered";
  if (pei < 60) return "stressed";
  if (pei < 75) return "unstable";
  if (pei < 90) return "critical";
  return "collapse";
}

export function phaseLabel(phase: EntropyPhase): string {
  return PHASE_THRESHOLDS.find((p) => p.phase === phase)?.label ?? phase;
}

export function phaseHint(phase: EntropyPhase): string {
  return PHASE_THRESHOLDS.find((p) => p.phase === phase)?.hint ?? "";
}
