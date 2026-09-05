import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { computePei } from "@/lib/pei/calculator";
import { DIMENSIONS, phaseHint, phaseLabel } from "@/lib/pei/dimensions";
import { peiColor, phaseTone } from "@/lib/pei/format";
import { SIGNALS } from "@/lib/pei/book";
import { PHASE_RISK, WORKSHEET_GUIDES } from "@/lib/pei/worksheet";
import { usePeiStore } from "@/lib/pei/store";
import type { DimId } from "@/lib/pei/types";
import { phaseFor } from "@/lib/pei/dimensions";
import { ScoreSliders } from "./score-slider";
import { FromChapter } from "./from-chapter";

export function AuditView() {
  const { audit: stored, setAudit, countries } = usePeiStore();
  const audit = stored ?? {
    system: "",
    analyst: "",
    notes: "",
    scores: {
      inequality: 50,
      institutions: 50,
      conflict: 40,
      energy: 40,
      information: 40,
      environment: 40,
    },
  };
  const pei = computePei(audit.scores);
  const phase = phaseFor(pei);

  function exportAudit() {
    const payload = {
      system: audit.system,
      analyst: audit.analyst,
      notes: audit.notes,
      scores: audit.scores,
      pei,
      phase,
      date: new Date().toISOString().slice(0, 10),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pei-audit-${audit.system || "system"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,340px)]">
      <div>
        <h2 className="font-display text-3xl">Entropy audit</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Chapter 23 worksheet, in-browser. Score the six dimensions as entropy (higher = more
          disorder). The paper form inverts stability, energy security, information flow, and
          environmental quality — this toolkit already stores entropy, so you do not invert
          twice. The draft persists on this device.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FromChapter n={23} />
          <FromChapter n={22} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">System</span>
            <input
              value={audit.system}
              onChange={(e) => setAudit({ system: e.target.value })}
              placeholder="Country, bloc, or city"
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </label>
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Analyst</span>
            <input
              value={audit.analyst}
              onChange={(e) => setAudit({ analyst: e.target.value })}
              placeholder="Name or desk"
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {countries.slice(0, 8).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setAudit({ system: c.name, scores: { ...c.scores } })}
              className="h-9 rounded-full border border-border px-3 text-xs text-muted hover:text-fg"
            >
              Seed {c.code}
            </button>
          ))}
        </div>
        <Card className="mt-6 p-5">
          <ScoreSliders
            scores={audit.scores}
            onChange={(id, n) => setAudit({ scores: { ...audit.scores, [id]: n } })}
          />
        </Card>
        <div className="mt-6 flex flex-col gap-4">
          {DIMENSIONS.map((d) => {
            const g = WORKSHEET_GUIDES[d.id as DimId];
            return (
              <div key={d.id} className="rounded-lg border border-border bg-surface p-4">
                <p className="font-medium">{d.label}</p>
                <p className="mt-1 text-sm text-muted">{g.definition}</p>
                {g.note ? <p className="mt-1 text-xs text-subtle">{g.note}</p> : null}
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[28rem] text-left text-xs">
                    <thead className="uppercase tracking-wider text-subtle">
                      <tr>
                        <th className="py-1 font-medium">Entropy</th>
                        <th className="py-1 font-medium">Band</th>
                        <th className="py-1 font-medium">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.bands.map((b) => (
                        <tr key={b.range} className="border-t border-border/60">
                          <td className="py-1 tabular-nums">{b.range}</td>
                          <td className="py-1">{b.entropy}</td>
                          <td className="py-1 text-muted">{b.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-subtle">{g.indicators.join(" · ")}</p>
              </div>
            );
          })}
        </div>
        <label className="mt-6 block text-sm">
          <span className="text-xs uppercase tracking-wider text-subtle">Notes</span>
          <textarea
            value={audit.notes}
            onChange={(e) => setAudit({ notes: e.target.value })}
            rows={6}
            placeholder="Energy inputs (growth, legitimacy, information). Outputs (corruption, conflict, suppression). Phase-transition risk."
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
      </div>
      <aside className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Audit PEI</p>
          <p className={`mt-1 font-display text-5xl tabular-nums ${peiColor(pei)}`}>{pei.toFixed(1)}</p>
          <span className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-xs ${phaseTone(phase)}`}>
            {phaseLabel(phase)}
          </span>
          <p className="mt-2 text-sm text-muted">{phaseHint(phase)}</p>
          <Button className="mt-4 w-full" variant="secondary" onClick={exportAudit}>
            Export JSON
          </Button>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">ΔPEI risk</p>
          <ul className="mt-3 flex flex-col gap-3">
            {PHASE_RISK.map((r) => (
              <li key={r.range}>
                <p className="text-sm font-medium">{r.label}</p>
                <p className="text-xs tabular-nums text-subtle">{r.range}</p>
                <p className="text-xs text-muted">{r.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-subtle">Five signals</p>
          <ol className="mt-3 flex flex-col gap-3">
            {SIGNALS.map((s) => (
              <li key={s.n}>
                <p className="text-sm font-medium">
                  {s.n}. {s.name}
                </p>
                <p className="text-xs text-muted">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Card>
      </aside>
    </div>
  );
}
