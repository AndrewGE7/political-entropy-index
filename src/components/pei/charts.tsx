import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { DIMENSIONS } from "@/lib/pei/dimensions";
import { peiBar } from "@/lib/pei/format";
import { ERAS, type EpochPoint } from "@/lib/pei/history";
import type { CountryRecord, ForecastPoint } from "@/lib/pei/types";

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

const TOOLTIP_STYLE = {
  background: "var(--color-elevated)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-fg)",
  fontSize: 12,
};

export function RadarDims({ country }: { country: CountryRecord }) {
  const mounted = useMounted();
  const data = DIMENSIONS.map((d) => ({
    dim: d.short,
    value: country.scores[d.id],
    full: 100,
  }));
  if (!mounted) return <Skeleton className="h-64 w-full" />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="dim" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          dataKey="value"
          stroke={peiBar(country.pei)}
          fill={peiBar(country.pei)}
          fillOpacity={0.28}
          strokeWidth={1.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function TrendArea({
  series,
  height = 280,
}: {
  series: ForecastPoint[];
  height?: number;
}) {
  const mounted = useMounted();
  const hist = series.filter((p) => !p.projected);
  const lastHist = hist[hist.length - 1];
  const data = series.map((p) => ({
    year: p.year,
    actual: p.projected ? undefined : p.pei,
    forecast: p.projected || p.year === lastHist?.year ? p.pei : undefined,
  }));
  if (!mounted) return <Skeleton className="h-72 w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <ReferenceLine y={40} stroke="var(--color-ordered)" strokeDasharray="3 3" />
        <ReferenceLine y={60} stroke="var(--color-stressed)" strokeDasharray="3 3" />
        <ReferenceLine y={75} stroke="var(--color-unstable)" strokeDasharray="3 3" />
        <ReferenceLine y={90} stroke="var(--color-critical)" strokeDasharray="3 3" />
        <Area type="monotone" dataKey="actual" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.12} strokeWidth={2} connectNulls />
        <Area type="monotone" dataKey="forecast" stroke="var(--color-critical)" fill="transparent" strokeDasharray="5 4" strokeWidth={1.6} connectNulls />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CompareLines({ countries }: { countries: CountryRecord[] }) {
  const mounted = useMounted();
  const years = countries[0]?.history.map((h) => h.year) ?? [];
  const data = years.map((year) => {
    const row: Record<string, number> = { year };
    for (const c of countries) {
      const hit = c.history.find((h) => h.year === year);
      if (hit) row[c.code] = hit.pei;
    }
    return row;
  });
  const palette = [
    "var(--color-accent)",
    "var(--color-critical)",
    "var(--color-stressed)",
    "var(--color-ordered)",
  ];
  if (!mounted) return <Skeleton className="h-72 w-full" />;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        {countries.map((c, i) => (
          <Area
            key={c.code}
            type="monotone"
            dataKey={c.code}
            stroke={palette[i % palette.length]}
            fill={palette[i % palette.length]}
            fillOpacity={0.06}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function EpochLine({
  series,
  height = 320,
  markerYear,
  seriesLabel = "PEI",
}: {
  series: EpochPoint[];
  height?: number;
  markerYear?: number;
  seriesLabel?: string;
}) {
  const mounted = useMounted();
  const fills = [
    "var(--color-ordered)",
    "var(--color-critical)",
    "var(--color-stressed)",
    "var(--color-accent)",
    "var(--color-unstable)",
  ];
  if (!mounted) return <Skeleton className="h-80 w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={series} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        {ERAS.map((era, i) => (
          <ReferenceArea
            key={era.id}
            x1={era.start}
            x2={era.end}
            fill={fills[i % fills.length]}
            fillOpacity={0.06}
          />
        ))}
        <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(value) => [value, seriesLabel]}
          labelFormatter={(label) => {
            const hit = series.find((p) => p.year === Number(label));
            return hit?.event ? `${label} — ${hit.event}` : String(label);
          }}
        />
        <ReferenceLine y={40} stroke="var(--color-ordered)" strokeDasharray="3 3" />
        <ReferenceLine y={60} stroke="var(--color-stressed)" strokeDasharray="3 3" />
        <ReferenceLine y={75} stroke="var(--color-unstable)" strokeDasharray="3 3" />
        <ReferenceLine y={90} stroke="var(--color-critical)" strokeDasharray="3 3" />
        {markerYear ? <ReferenceLine x={markerYear} stroke="var(--color-accent)" /> : null}
        <Line type="monotone" dataKey="pei" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ScenarioLine({
  series,
  height = 280,
}: {
  series: { year: number; pei: number }[];
  height?: number;
}) {
  const mounted = useMounted();
  if (!mounted) return <Skeleton className="h-72 w-full" />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <ReferenceLine y={40} stroke="var(--color-ordered)" strokeDasharray="3 3" />
        <ReferenceLine y={60} stroke="var(--color-stressed)" strokeDasharray="3 3" />
        <ReferenceLine y={75} stroke="var(--color-unstable)" strokeDasharray="3 3" />
        <ReferenceLine y={90} stroke="var(--color-critical)" strokeDasharray="3 3" />
        <Line type="monotone" dataKey="pei" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
