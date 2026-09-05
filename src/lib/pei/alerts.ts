import { ALERT_THRESHOLDS, RAPID_CHANGE, phaseLabel } from "./dimensions";
import type { AlertSeverity, CountryRecord, PeiAlert } from "./types";

function severityForPei(pei: number): AlertSeverity {
  if (pei >= 90) return "critical";
  if (pei >= 80) return "high";
  if (pei >= 70) return "medium";
  return "low";
}

export function buildAlerts(countries: CountryRecord[], now = new Date()): PeiAlert[] {
  const timestamp = now.toISOString();
  const alerts: PeiAlert[] = [];

  for (const c of countries) {
    for (const t of [...ALERT_THRESHOLDS].reverse()) {
      if (c.pei >= t) {
        alerts.push({
          id: `${c.code}-th-${t}`,
          code: c.code,
          name: c.name,
          severity: severityForPei(c.pei),
          kind: "threshold",
          message: `${c.name} PEI ${c.pei.toFixed(1)} crossed ${t} (${phaseLabel(c.phase)}).`,
          pei: c.pei,
          timestamp,
        });
        break;
      }
    }

    if (c.history.length >= 2) {
      const prev = c.history[c.history.length - 2].pei;
      const delta = Math.round((c.pei - prev) * 10) / 10;
      if (Math.abs(delta) >= RAPID_CHANGE) {
        alerts.push({
          id: `${c.code}-d-${c.history[c.history.length - 1].year}`,
          code: c.code,
          name: c.name,
          severity: Math.abs(delta) >= 20 ? "critical" : "high",
          kind: "change",
          message: `${c.name} ΔPEI ${delta > 0 ? "+" : ""}${delta} year-over-year (rapid ${delta > 0 ? "deterioration" : "improvement"}).`,
          pei: c.pei,
          delta,
          timestamp,
        });
      }
    }
  }

  const rank: Record<AlertSeverity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  alerts.sort((a, b) => rank[a.severity] - rank[b.severity] || b.pei - a.pei);
  return alerts;
}
