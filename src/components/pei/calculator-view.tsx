import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { computePei } from "@/lib/pei/calculator";
import { DIMENSIONS, phaseFor, phaseLabel } from "@/lib/pei/dimensions";
import { GLOBAL_EPOCH } from "@/lib/pei/history";
import { peiColor, phaseTone } from "@/lib/pei/format";
import { usePeiStore } from "@/lib/pei/store";
import type { DimId, DimScores } from "@/lib/pei/types";
import { ScoreSliders } from "./score-slider";
import { RadarDims } from "./charts";
import { FromChapter } from "./from-chapter";

const mid: DimScores = {
  inequality: 50,
  institutions: 50,
  conflict: 40,
  energy: 40,
  information: 40,
  environment: 40,
};

export function CalculatorView() {
  const { countries, setView, select } = usePeiStore();
  const [scores, setScores] = useState<DimScores>(mid);
  const pei = useMemo(() => computePei(scores), [scores]);
  const phase = phaseFor(pei);
  const dummy = {
    code: "XX",
    name: "Custom",
    region: "Model",
    scores,
    pei,
    phase,
    history: [],
    events: [],
    liveFlags: {},
  };

  function setDim(id: DimId, n: number) {
    setScores((s) => ({ ...s, [id]: n }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)]">
      <div>
        <h2 className="font-display text-3xl">PEI calculator</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Chapter 4 of the manuscript, running. All six sliders are entropy scores (higher = more
          disorder). Weights are the locked prior: 25 / 20 / 20 / 15 / 10 / 10.
        </p>
        <div className="mt-3">
          <FromChapter n={4} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {countries.slice(0, 8).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setScores({ ...c.scores })}
              className="h-9 rounded-full border border-border px-3 text-xs text-muted hover:text-fg"
            >
              Load {c.name}
            </button>
          ))}
          <select
            className="h-9 rounded-full border border-border bg-surface px-3 text-xs text-fg"
            defaultValue=""
            onChange={(e) => {
              const y = Number(e.target.value);
              const hit = GLOBAL_EPOCH.find((p) => p.year === y);
              if (hit) setScores({ ...hit.dimensions });
            }}
          >
            <option value="">Load epoch year</option>
            {GLOBAL_EPOCH.filter((p) => p.event).map((p) => (
              <option key={p.year} value={p.year}>
                {p.year} · PEI {p.pei}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="sm" onClick={() => setScores(mid)}>
            Reset
          </Button>
        </div>
        <Card className="mt-6 p-5">
          <ScoreSliders scores={scores} onChange={setDim} />
        </Card>
      </div>
      <aside className="lg:sticky lg:top-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Computed PEI</p>
          <p className={`mt-1 font-display text-5xl tabular-nums ${peiColor(pei)}`}>{pei.toFixed(1)}</p>
          <span className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-xs ${phaseTone(phase)}`}>
            {phaseLabel(phase)}
          </span>
          <RadarDims country={dummy} />
          <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
            {DIMENSIONS.map((d) => (
              <li key={d.id} className="flex justify-between">
                <span>{d.short}</span>
                <span className="tabular-nums">
                  {(scores[d.id] * d.weight).toFixed(1)} pts
                </span>
              </li>
            ))}
          </ul>
          <Button
            className="mt-4 w-full"
            variant="secondary"
            onClick={() => {
              select(countries[0]?.code ?? null);
              setView("monitor");
            }}
          >
            Compare with live board
          </Button>
        </Card>
        <p className="mt-3 text-xs text-subtle">
          Rapid-change rule from the book: a move of 15 PEI or more is a phase-risk alert, not noise.
        </p>
      </aside>
    </div>
  );
}
