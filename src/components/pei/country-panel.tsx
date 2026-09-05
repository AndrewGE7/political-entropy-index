import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DIMENSIONS, phaseHint, phaseLabel } from "@/lib/pei/dimensions";
import { peiColor, phaseTone } from "@/lib/pei/format";
import { analyzeTrend, forecast } from "@/lib/pei/calculator";
import { usePeiStore } from "@/lib/pei/store";
import type { CountryRecord } from "@/lib/pei/types";
import { RadarDims, TrendArea } from "./charts";

export function CountryPanel({ country }: { country: CountryRecord }) {
  const { toggleWatch, watchlist, toggleCompare, compare, select } = usePeiStore();
  const trend = analyzeTrend(country.history);
  const series = forecast(country.history);
  const watched = watchlist.includes(country.code);
  const compared = compare.includes(country.code);

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">{country.region}</p>
          <h2 className="mt-1 font-display text-3xl text-fg">{country.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`font-display text-4xl tabular-nums ${peiColor(country.pei)}`}>
              {country.pei.toFixed(1)}
            </span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs ${phaseTone(country.phase)}`}>
              {phaseLabel(country.phase)}
            </span>
            <span className="text-xs text-muted">{phaseHint(country.phase)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={watched ? "default" : "secondary"} size="sm" onClick={() => toggleWatch(country.code)}>
            <Star className="size-3.5" />
            {watched ? "Watching" : "Watch"}
          </Button>
          <Button variant={compared ? "default" : "secondary"} size="sm" onClick={() => toggleCompare(country.code)}>
            {compared ? "In compare" : "Compare"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => select(null)}>
            Close
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-elevated p-4">
          <p className="text-xs uppercase tracking-wider text-subtle">Six-dimension radar</p>
          <RadarDims country={country} />
        </div>
        <div className="rounded-lg bg-elevated p-4">
          <p className="text-xs uppercase tracking-wider text-subtle">History and 3-year forecast</p>
          <TrendArea series={series} height={240} />
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <Meta label="Trend" value={trend.direction} />
            <Meta label="5y change" value={`${trend.change > 0 ? "+" : ""}${trend.change.toFixed(1)}`} />
            <Meta label="Rate / yr" value={`${trend.ratePerYear > 0 ? "+" : ""}${trend.ratePerYear.toFixed(1)}`} />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-subtle">Weighted dimensions</p>
        <ul className="flex flex-col gap-3">
          {DIMENSIONS.map((d) => {
            const v = country.scores[d.id];
            const live = country.liveFlags[d.id];
            return (
              <li key={d.id}>
                <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-fg">
                    {d.label}
                    <span className="ml-2 text-xs text-subtle">{Math.round(d.weight * 100)}%</span>
                    {live ? (
                      <Badge className="ml-2 border-ordered/40 text-ordered">Live</Badge>
                    ) : null}
                  </span>
                  <span className="tabular-nums text-muted">{v.toFixed(1)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-bg">
                  <div
                    className="h-full rounded-full bg-accent/80"
                    style={{ width: `${Math.min(100, v)}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-subtle">{d.source}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {country.events.length > 0 ? (
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-subtle">Historical events</p>
          <ol className="flex flex-col gap-3 border-l border-border pl-4">
            {country.events.map((e) => (
              <li key={`${e.year}-${e.title}`}>
                <p className="text-sm text-fg">
                  <span className="tabular-nums text-muted">{e.year}</span>
                  <span className="mx-2 text-subtle">/</span>
                  {e.title}
                </p>
                <p className="text-xs text-muted">{e.note}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-subtle">{label}</p>
      <p className="capitalize text-fg">{value}</p>
    </div>
  );
}
