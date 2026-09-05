import { DIM_IDS, type DimScores, type ForecastPoint, type TrendAnalysis, type YearSnapshot } from "./types";
import { FORECAST_YEARS, HISTORY_END, HISTORY_START, WEIGHTS, phaseFor } from "./dimensions";

export function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export function computePei(scores: DimScores): number {
  let total = 0;
  for (const id of DIM_IDS) {
    total += clampScore(scores[id]) * WEIGHTS[id];
  }
  return Math.round(total * 10) / 10;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function interpolateHistory(start: DimScores, end: DimScores): YearSnapshot[] {
  const years = HISTORY_END - HISTORY_START;
  const out: YearSnapshot[] = [];
  for (let y = HISTORY_START; y <= HISTORY_END; y++) {
    const t = years === 0 ? 1 : (y - HISTORY_START) / years;
    const dims = {} as DimScores;
    for (const id of DIM_IDS) {
      dims[id] = clampScore(lerp(start[id], end[id], t));
    }
    out.push({ year: y, pei: computePei(dims), dimensions: dims });
  }
  return out;
}

export function analyzeTrend(history: YearSnapshot[]): TrendAnalysis {
  if (history.length < 2) {
    const pei = history[0]?.pei ?? 0;
    return { direction: "stable", change: 0, ratePerYear: 0, average: pei, min: pei, max: pei };
  }
  const first = history[0].pei;
  const last = history[history.length - 1].pei;
  const change = Math.round((last - first) * 10) / 10;
  const span = history[history.length - 1].year - history[0].year || 1;
  const ratePerYear = Math.round((change / span) * 10) / 10;
  const values = history.map((h) => h.pei);
  const average = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  let direction: TrendAnalysis["direction"] = "stable";
  if (ratePerYear >= 1.2) direction = "increasing";
  else if (ratePerYear <= -1.2) direction = "decreasing";
  return {
    direction,
    change,
    ratePerYear,
    average,
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

export function forecast(history: YearSnapshot[]): ForecastPoint[] {
  const points: ForecastPoint[] = history.map((h) => ({
    year: h.year,
    pei: h.pei,
    projected: false,
  }));
  if (history.length < 2) return points;
  const n = history.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  history.forEach((h, i) => {
    sumX += i;
    sumY += h.pei;
    sumXY += i * h.pei;
    sumX2 += i * i;
  });
  const denom = n * sumX2 - sumX * sumX || 1;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const last = history[history.length - 1];
  for (let i = 1; i <= FORECAST_YEARS; i++) {
    const idx = n - 1 + i;
    points.push({
      year: last.year + i,
      pei: Math.round(clampScore(intercept + slope * idx) * 10) / 10,
      projected: true,
    });
  }
  return points;
}

export { phaseFor };
