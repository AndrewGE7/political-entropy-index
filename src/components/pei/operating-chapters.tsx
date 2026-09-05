import {
  ACTORS,
  COMPANION,
  ENGINE_NOTES,
  GLOSSARY,
  IMPERATIVES,
  LAWS,
  PARADOXES,
  PATHWAYS,
  PHYSICS_LAWS,
  SIGNALS,
} from "@/lib/pei/book";
import { INTERVENTIONS } from "@/lib/pei/action";
import { DIMENSIONS } from "@/lib/pei/dimensions";
import { SCENARIOS } from "@/lib/pei/scenarios";
import { usePeiStore } from "@/lib/pei/store";
import { FromChapter, OpenInstrument } from "./from-chapter";

export function CompanionMap() {
  const { setView, openChapter } = usePeiStore();
  return (
    <section className="mt-10 max-w-2xl">
      <h3 className="font-display text-2xl">The book is the argument. The tabs are the chapters that run.</h3>
      <p className="mt-2 text-sm text-muted">
        Every instrument in this toolkit is a manuscript chapter with a handle. Open the chapter to
        read; open the tab to operate.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {COMPANION.map((c) => (
          <li
            key={`${c.n}-${c.view}-${c.runs}`}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2"
          >
            <button type="button" onClick={() => openChapter(c.n)} className="text-left text-sm">
              <span className="tabular-nums text-subtle">Ch. {c.n}</span>
              <span className="ml-2 text-fg">{c.runs}</span>
            </button>
            <button
              type="button"
              onClick={() => setView(c.view)}
              className="text-xs text-muted hover:text-fg"
            >
              {c.label} →
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OperatingChapter({ n }: { n: number }) {
  if (n === 1) return <ChapterOne />;
  if (n === 2) return <ChapterTwo />;
  if (n === 3) return <ChapterThree />;
  if (n === 17) return <ChapterSeventeen />;
  if (n === 18) return <ChapterEighteen />;
  if (n === 19) return <ChapterNineteen />;
  if (n === 20) return <ChapterTwenty />;
  if (n === 21) return <ChapterTwentyOne />;
  if (n === 22) return <ChapterTwentyTwo />;
  if (n === 23) return <ChapterTwentyThree />;
  return null;
}

function ChapterOne() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-8">
      <p className="text-sm text-muted">
        Four physical laws, four political translations. The manuscript extract still holds Part I as
        a skeleton; this is the operating version. The six later laws of stability live in Chapter
        24.
      </p>
      <ul className="flex flex-col gap-4">
        {PHYSICS_LAWS.map((l) => (
          <li key={l.n} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">Law {l.n}</p>
            <p className="font-medium">{l.name}</p>
            <p className="mt-2 text-sm text-muted">{l.physics}</p>
            <p className="mt-2 text-sm">{l.politics}</p>
            <p className="mt-2 text-xs text-subtle">{l.case}</p>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="font-display text-xl">Terms</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {GLOSSARY.slice(0, 6).map((g) => (
            <li key={g.term}>
              <p className="text-sm font-medium">{g.term}</p>
              <p className="text-xs text-muted">{g.meaning}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        <FromChapter n={24} />
        <OpenInstrument view="calculator" label="Open the formula" />
      </div>
    </div>
  );
}

function ChapterTwo() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-8">
      <ul className="flex flex-col gap-3">
        {ENGINE_NOTES.map((item) => (
          <li key={item.name} className="border-l border-border pl-3">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        Three later imperatives compress the same engine: order requires energy; disorder is the
        default; phase transitions are jumps.
      </p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {IMPERATIVES.map((i) => (
          <li key={i.n} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">{i.n}</p>
            <p className="font-medium">{i.name}</p>
            <p className="mt-1 text-xs text-subtle">{i.analog}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <OpenInstrument view="history" label="Open 1876–1914" />
        <FromChapter n={11} />
      </div>
    </div>
  );
}

function ChapterThree() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-8">
      <p className="text-sm text-muted">
        Politics resisted a number because it is complex, multidimensional, and poorly instrumented
        before 1900. PEI is a composite with locked weights — a decision-support prior you can
        audit, not a fitted oracle.
      </p>
      <ul className="flex flex-col gap-3">
        {DIMENSIONS.map((d) => (
          <li
            key={d.id}
            className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
          >
            <span className="text-sm">{d.label}</span>
            <span className="tabular-nums text-xs text-subtle">{Math.round(d.weight * 100)}%</span>
          </li>
        ))}
      </ul>
      <h3 className="font-display text-xl">Five signals of rising entropy</h3>
      <ol className="grid gap-3 sm:grid-cols-2">
        {SIGNALS.map((s) => (
          <li key={s.n} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">Signal {s.n}</p>
            <p className="font-medium">{s.name}</p>
            <p className="mt-1 text-sm text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>
      <OpenInstrument view="calculator" label="Work the formula" />
    </div>
  );
}

function ChapterSeventeen() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        Law 1 of Chapter 24: power is redistributed, not minted. Britain to America was a relatively
        smooth energy transfer because of shared institutions. America to multipolarity is not. Run
        the handoff as a scenario.
      </p>
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wider text-subtle">Six later laws, compressed</p>
        <ol className="mt-3 flex flex-col gap-2 text-sm">
          {LAWS.map((l) => (
            <li key={l.n}>
              <span className="tabular-nums text-subtle">{l.n}.</span> {l.name} — {l.statement}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-wrap gap-2">
        <OpenInstrument view="scenarios" label="Open the scenario lab" />
        <OpenInstrument view="compare" label="Compare majors" />
      </div>
    </div>
  );
}

function ChapterEighteen() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        When PEI crosses ~90, small events suffice. Bouazizi is the type. The four pathways are a
        menu, not a prophecy of which door opens.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {PATHWAYS.map((p) => (
          <li key={p.id} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium">{p.name}</p>
            <p className="text-xs tabular-nums text-subtle">{p.signature}</p>
            <p className="mt-2 text-sm text-muted">{p.detail}</p>
          </li>
        ))}
      </ul>
      <FromChapter n={24} />
    </div>
  );
}

function ChapterNineteen() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        Singapore, Switzerland, the U.S. Constitution's negative feedback: different recipes for
        the same problem. Efficiency without buffers is a paradox, not a virtue.
      </p>
      <ul className="flex flex-col gap-3">
        {PARADOXES.map((p) => (
          <li key={p.name} className="border-l border-border pl-3">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-muted">{p.statement}</p>
          </li>
        ))}
      </ul>
      <OpenInstrument view="audit" label="Run a stability audit" />
    </div>
  );
}

function ChapterTwenty() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        This application is Chapter 20. Auto-refresh, live World Bank overlays on inequality,
        institutions, energy, and environment; curated conflict and information; alerts at 70 / 80 /
        90 and on ΔPEI ≥ 15. Never blank the board.
      </p>
      <div className="flex flex-wrap gap-2">
        <OpenInstrument view="monitor" label="Open the board" />
        <OpenInstrument view="alerts" label="Open the alert feed" />
        <OpenInstrument view="trends" label="Open trends" />
      </div>
    </div>
  );
}

function ChapterTwentyOne() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        Ten-, twenty-, fifty-year paths under cooperation, climate, AI, bloc conflict, pandemic, and
        energy transition. Scenarios are entropy budgets you can argue with, not predictions.
      </p>
      <ul className="flex flex-col gap-2">
        {SCENARIOS.map((s) => (
          <li
            key={s.id}
            className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
          >
            <span className="text-sm">{s.name}</span>
            <span className="text-xs text-subtle">{s.chapter}</span>
          </li>
        ))}
      </ul>
      <OpenInstrument view="scenarios" label="Open the scenario lab" />
    </div>
  );
}

function ChapterTwentyTwo() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        Each dimension is a workstream. Approximate PEI reductions in Chapter 25 are planning ranges,
        not promises. Pick the dimension that is actually moving.
      </p>
      <ul className="flex flex-col gap-3">
        {INTERVENTIONS.map((d) => (
          <li key={d.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium">{DIMENSIONS.find((x) => x.id === d.id)?.label}</p>
              <p className="text-xs tabular-nums text-subtle">{d.impact}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{d.goal}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <OpenInstrument view="audit" label="Run an audit" />
        <FromChapter n={25} />
      </div>
    </div>
  );
}

function ChapterTwentyThree() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-6">
      <p className="text-sm text-muted">
        Citizens, leaders, organizations, international system — four playbooks, one index. The
        worksheet is the offline form of this sentence. Score entropy directly; do not invert twice.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ACTORS.map((a) => (
          <li key={a.who} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium">{a.who}</p>
            <p className="mt-1 text-sm text-muted">{a.role}</p>
            <div className="mt-3">
              <OpenInstrument view={a.view} label={`Open ${a.view}`} />
            </div>
          </li>
        ))}
      </ul>
      <OpenInstrument view="audit" label="Open the worksheet" />
    </div>
  );
}
