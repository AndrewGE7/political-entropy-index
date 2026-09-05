import type { AlertSeverity, EntropyPhase } from "./types";

export function peiColor(pei: number): string {
  if (pei < 40) return "text-ordered";
  if (pei < 60) return "text-stressed";
  if (pei < 75) return "text-unstable";
  if (pei < 90) return "text-critical";
  return "text-collapse";
}

export function peiFill(pei: number): string {
  if (pei < 40) return "bg-ordered";
  if (pei < 60) return "bg-stressed";
  if (pei < 75) return "bg-unstable";
  if (pei < 90) return "bg-critical";
  return "bg-collapse";
}

export function peiBar(pei: number): string {
  if (pei < 40) return "var(--color-ordered)";
  if (pei < 60) return "var(--color-stressed)";
  if (pei < 75) return "var(--color-unstable)";
  if (pei < 90) return "var(--color-critical)";
  return "var(--color-collapse)";
}

export function phaseTone(phase: EntropyPhase): string {
  const map: Record<EntropyPhase, string> = {
    ordered: "text-ordered border-ordered/30 bg-ordered/10",
    stressed: "text-stressed border-stressed/30 bg-stressed/10",
    unstable: "text-unstable border-unstable/30 bg-unstable/10",
    critical: "text-critical border-critical/30 bg-critical/10",
    collapse: "text-collapse border-collapse/30 bg-collapse/10",
  };
  return map[phase];
}

export function severityTone(s: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    low: "text-muted border-border bg-elevated",
    medium: "text-stressed border-stressed/30 bg-stressed/10",
    high: "text-unstable border-unstable/30 bg-unstable/10",
    critical: "text-critical border-critical/30 bg-critical/10",
  };
  return map[s];
}

export function formatTime(iso: string | null): string {
  if (!iso) return "Not yet refreshed";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
