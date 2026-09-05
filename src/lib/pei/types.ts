export const DIM_IDS = [
  "inequality",
  "institutions",
  "conflict",
  "energy",
  "information",
  "environment",
] as const;

export type DimId = (typeof DIM_IDS)[number];

export type DimScores = Record<DimId, number>;

export type EntropyPhase =
  | "ordered"
  | "stressed"
  | "unstable"
  | "critical"
  | "collapse";

export type SourceStatus = "live" | "baseline" | "mixed" | "error";

export type DimensionMeta = {
  id: DimId;
  label: string;
  short: string;
  weight: number;
  source: string;
  description: string;
  liveIndicator?: string;
};

export type CountryEvent = {
  year: number;
  title: string;
  note: string;
};

export type CountrySeed = {
  code: string;
  name: string;
  region: string;
  scores2021: DimScores;
  scores: DimScores;
  events: CountryEvent[];
};

export type YearSnapshot = {
  year: number;
  pei: number;
  dimensions: DimScores;
};

export type CountryRecord = {
  code: string;
  name: string;
  region: string;
  scores: DimScores;
  pei: number;
  phase: EntropyPhase;
  history: YearSnapshot[];
  events: CountryEvent[];
  liveFlags: Partial<Record<DimId, boolean>>;
};

export type TrendDirection = "increasing" | "decreasing" | "stable";

export type TrendAnalysis = {
  direction: TrendDirection;
  change: number;
  ratePerYear: number;
  average: number;
  min: number;
  max: number;
};

export type ForecastPoint = {
  year: number;
  pei: number;
  projected: boolean;
};

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export type PeiAlert = {
  id: string;
  code: string;
  name: string;
  severity: AlertSeverity;
  kind: "threshold" | "change";
  message: string;
  pei: number;
  delta?: number;
  timestamp: string;
};

export type ConnectionStatus = {
  source: string;
  status: SourceStatus;
  detail: string;
};
