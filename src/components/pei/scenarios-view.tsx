import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIMENSIONS, phaseLabel } from "@/lib/pei/dimensions";
import { peiColor, phaseTone } from "@/lib/pei/format";
import { BASELINES, SCENARIOS, projectScenario } from "@/lib/pei/scenarios";
import { ScenarioLine } from "./charts";
import { FromChapter } from "./from-chapter";

export function ScenariosView() {
  const [templateId, setTemplateId] = useState(SCENARIOS[0].id);
  const [baseId, setBaseId] = useState(BASELINES[0].id);
  const template = SCENARIOS.find((s) => s.id === templateId) ?? SCENARIOS[0];
  const base = BASELINES.find((b) => b.id === baseId) ?? BASELINES[0];
  const series = useMemo(() => projectScenario(base.scores, template), [base, template]);
  const start = series[0];
  const end = series[series.length - 1];
  const delta = end && start ? Math.round((end.pei - start.pei) * 10) / 10 : 0;
  const events = series.filter((p) => p.note);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl">Scenario lab</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Chapter 17 and Chapter 21. Structured shocks from the book — climate, AI, cooperation,
          bloc conflict, pandemic, energy transition — applied to a starting PEI budget.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FromChapter n={21} />
          <FromChapter n={17} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setTemplateId(s.id)}
            className={`h-10 rounded-full border px-4 text-xs ${
              templateId === s.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {BASELINES.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBaseId(b.id)}
            className={`h-9 rounded-full border px-3 text-xs ${
              baseId === b.id ? "border-accent text-fg" : "border-border text-muted hover:text-fg"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
        <Card className="p-4">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-subtle">{template.chapter}</p>
              <p className="font-medium">{template.name}</p>
              <p className="mt-1 text-sm text-muted">{template.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-subtle">Start → end</p>
              <p className="tabular-nums">
                <span className={peiColor(start?.pei ?? 0)}>{start?.pei.toFixed(1)}</span>
                <span className="mx-2 text-subtle">→</span>
                <span className={peiColor(end?.pei ?? 0)}>{end?.pei.toFixed(1)}</span>
                <span className="ml-2 text-xs text-muted">
                  {delta > 0 ? "+" : ""}
                  {delta}
                </span>
              </p>
            </div>
          </div>
          <ScenarioLine series={series} />
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Terminal state</p>
          {end ? (
            <>
              <p className={`mt-1 font-display text-4xl tabular-nums ${peiColor(end.pei)}`}>
                {end.pei.toFixed(1)}
              </p>
              <span className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-xs ${phaseTone(end.phase)}`}>
                {phaseLabel(end.phase)}
              </span>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {DIMENSIONS.map((d) => (
                  <li key={d.id} className="flex justify-between text-muted">
                    <span>{d.short}</span>
                    <span className="tabular-nums text-fg">{end.dimensions[d.id].toFixed(0)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Card>
      </div>
      <ol className="grid gap-2 sm:grid-cols-2">
        {events.map((p) => (
          <li key={`${p.year}-${p.note}`} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="tabular-nums text-xs text-subtle">{p.year}</span>
              <Badge className="tabular-nums">{p.pei.toFixed(1)}</Badge>
            </div>
            <p className="mt-1 text-sm">{p.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
