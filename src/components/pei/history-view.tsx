import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIMENSIONS, phaseLabel } from "@/lib/pei/dimensions";
import { peiColor, phaseTone } from "@/lib/pei/format";
import { EPOCH_EVENTS, ERAS, GLOBAL_EPOCH, eraFor } from "@/lib/pei/history";
import { DECADE_AVERAGES, PHASE_TRANSITIONS, REGIONAL_EPOCHS } from "@/lib/pei/regions";
import { usePeiStore } from "@/lib/pei/store";
import { phaseFor } from "@/lib/pei/dimensions";
import { EpochLine } from "./charts";
import { FromChapter } from "./from-chapter";

export function HistoryView() {
  const { historyYear, setHistoryYear } = usePeiStore();
  const [seriesId, setSeriesId] = useState("global");
  const regional = REGIONAL_EPOCHS.find((s) => s.id === seriesId);
  const series = regional ? regional.points : GLOBAL_EPOCH;
  const point =
    series.find((p) => p.year === historyYear) ??
    series.reduce((best, p) => (Math.abs(p.year - historyYear) < Math.abs(best.year - historyYear) ? p : best), series[0]);
  const era = eraFor(point.year);
  const phase = phaseFor(point.pei);
  const events = useMemo(() => series.filter((p) => p.event), [series]);

  const minY = series[0]?.year ?? 1876;
  const maxY = series[series.length - 1]?.year ?? 2026;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl">150 years</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Global PEI from 1876 to 2026 — Part III of the manuscript, as a series — plus the
            regional reconstructions from the historical data companion (US, Russia, China, EU).
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-subtle">{era.span}</p>
          <p className="font-display text-2xl">{era.title}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSeriesId("global");
            setHistoryYear(1876);
          }}
          className={`rounded-full border px-3 py-1.5 text-xs ${
            seriesId === "global" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"
          }`}
        >
          Global
        </button>
        {REGIONAL_EPOCHS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSeriesId(s.id);
              setHistoryYear(s.points[0].year);
            }}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              seriesId === s.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {ERAS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setHistoryYear(Math.min(maxY, Math.max(minY, e.start)))}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              era.id === e.id ? "border-accent text-fg" : "border-border text-muted hover:text-fg"
            }`}
          >
            Ch. {e.chapter} · {e.span}
          </button>
        ))}
      </div>
      <Card className="p-4">
        <EpochLine series={series} markerYear={point.year} seriesLabel={regional ? regional.label : "Global PEI"} />
        <input
          type="range"
          min={minY}
          max={maxY}
          value={Math.min(maxY, Math.max(minY, point.year))}
          onChange={(e) => setHistoryYear(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-elevated accent-[var(--color-accent)]"
        />
        {regional ? <p className="mt-2 text-xs text-subtle">{regional.note}</p> : null}
      </Card>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,340px)]">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Locked year</p>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <p className="font-display text-4xl tabular-nums">{point.year}</p>
            <p className={`font-display text-4xl tabular-nums ${peiColor(point.pei)}`}>{point.pei.toFixed(1)}</p>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs ${phaseTone(phase)}`}>
              {phaseLabel(phase)}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{era.theme}</p>
          {point.event ? <p className="mt-2 text-sm">{point.event}</p> : null}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {DIMENSIONS.map((d) => (
              <li key={d.id} className="rounded-md border border-border px-3 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">{d.short}</span>
                  <span className="tabular-nums">{point.dimensions[d.id].toFixed(0)}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-bg">
                  <div className="h-full bg-accent/80" style={{ width: `${point.dimensions[d.id]}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <FromChapter n={era.chapter} />
          </div>
        </Card>
        <Card className="max-h-[28rem] overflow-y-auto p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Event spine</p>
          <ol className="mt-3 flex flex-col gap-3 border-l border-border pl-4">
            {(seriesId === "global" ? EPOCH_EVENTS : events).map((p) => (
              <li key={`${p.year}-${p.event}`}>
                <button type="button" className="text-left" onClick={() => setHistoryYear(p.year)}>
                  <p className="text-sm">
                    <span className="tabular-nums text-muted">{p.year}</span>
                    <span className="mx-2 text-subtle">/</span>
                    {p.event}
                  </p>
                  <Badge className="mt-1 tabular-nums">{p.pei}</Badge>
                </button>
              </li>
            ))}
          </ol>
        </Card>
      </div>
      <div>
        <h3 className="font-display text-xl">Identified phase transitions</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-subtle">
              <tr>
                <th className="py-2 font-medium">Year</th>
                <th className="py-2 font-medium">System</th>
                <th className="py-2 font-medium">Type</th>
                <th className="py-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {PHASE_TRANSITIONS.map((t) => (
                <tr key={`${t.year}-${t.system}`} className="border-t border-border">
                  <td className="py-2 tabular-nums">
                    <button type="button" className="text-left hover:text-fg" onClick={() => { setSeriesId("global"); setHistoryYear(t.year); }}>
                      {t.year}
                    </button>
                  </td>
                  <td className="py-2">{t.system}</td>
                  <td className="py-2 text-muted">{t.type}</td>
                  <td className="py-2 text-muted">{t.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl">Global decade means</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {DECADE_AVERAGES.map((d) => (
            <button
              key={d.decade}
              type="button"
              onClick={() => {
                setSeriesId("global");
                setHistoryYear(Number(d.decade.slice(0, 4)));
              }}
              className="rounded-lg border border-border bg-surface p-3 text-left"
            >
              <p className="text-xs text-subtle">{d.decade}</p>
              <p className={`font-display text-xl tabular-nums ${peiColor(d.pei)}`}>{d.pei}</p>
              <p className="mt-1 text-[11px] text-muted">{d.themes}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
