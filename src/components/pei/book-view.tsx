import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ACTORS,
  BOOK_META,
  CHAPTERS,
  EPIGRAPHS,
  GLOSSARY,
  IMPERATIVES,
  LAWS,
  LESSONS,
  PARADOXES,
  PATHWAYS,
  PREFACE,
  PRINCIPLES,
  SIGNALS,
} from "@/lib/pei/book";
import { BARRIERS, FUTURE_CHALLENGES, INTERVENTIONS, URGENCY, VISIONS } from "@/lib/pei/action";
import { DIMENSIONS } from "@/lib/pei/dimensions";
import { hasManuscript, loadChapter, loadSearch, type SearchHit } from "@/lib/pei/manuscript";
import { usePeiStore } from "@/lib/pei/store";
import { ManuscriptBody } from "./manuscript-body";
import { CompanionMap, OperatingChapter } from "./operating-chapters";

export function BookView() {
  const { bookChapter, setBookChapter, setView } = usePeiStore();
  const ch = CHAPTERS.find((c) => c.n === bookChapter) ?? CHAPTERS[0];
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loadingMd, setLoadingMd] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const heavy = ch.n >= 4 && ch.n <= 16;
  const [wantProse, setWantProse] = useState(!heavy);

  useEffect(() => {
    setWantProse(!(ch.n >= 4 && ch.n <= 16));
    setMarkdown(null);
  }, [ch.n]);

  useEffect(() => {
    if (!hasManuscript(ch.n) || !wantProse) {
      setLoadingMd(false);
      return;
    }
    let live = true;
    setLoadingMd(true);
    void loadChapter(ch.n).then((doc) => {
      if (!live) return;
      setMarkdown(doc?.markdown ?? null);
      setLoadingMd(false);
    });
    return () => {
      live = false;
    };
  }, [ch.n, wantProse]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setHits(null);
      return;
    }
    let live = true;
    void loadSearch().then((entries) => {
      if (!live) return;
      const structured: SearchHit[] = [
        ...CHAPTERS.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.lede.toLowerCase().includes(q) ||
            c.takeaways.some((t) => t.toLowerCase().includes(q)),
        ).map((c) => ({
          n: c.n,
          title: c.title,
          heading: `Chapter ${c.n}`,
          snippet: c.lede,
        })),
        ...GLOSSARY.filter(
          (g) => g.term.toLowerCase().includes(q) || g.meaning.toLowerCase().includes(q),
        ).map((g) => ({
          n: 1,
          title: "Glossary",
          heading: g.term,
          snippet: g.meaning,
        })),
        ...PATHWAYS.filter(
          (p) => p.name.toLowerCase().includes(q) || p.detail.toLowerCase().includes(q),
        ).map((p) => ({
          n: 18,
          title: "Revolutionary Phase Transitions",
          heading: p.name,
          snippet: p.detail,
        })),
      ];
      const found = [...structured, ...entries]
        .filter(
          (e) =>
            e.heading.toLowerCase().includes(q) ||
            e.snippet.toLowerCase().includes(q) ||
            e.title.toLowerCase().includes(q),
        )
        .filter((e, i, arr) => arr.findIndex((x) => x.n === e.n && x.heading === e.heading) === i)
        .slice(0, 12);
      setHits(found);
    });
    return () => {
      live = false;
    };
  }, [query]);

  const minN = CHAPTERS[0].n;
  const maxN = CHAPTERS[CHAPTERS.length - 1].n;
  const parts = useMemo(() => {
    const map = new Map<string, typeof CHAPTERS>();
    for (const c of CHAPTERS) {
      const arr = map.get(c.part) ?? [];
      arr.push(c);
      map.set(c.part, arr);
    }
    return [...map.entries()];
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">Manuscript</p>
        <p className="mt-1 font-display text-xl leading-tight">{BOOK_META.title}</p>
        <p className="mt-1 text-xs text-muted">
          {BOOK_META.author} · v{BOOK_META.version} · {BOOK_META.license}
        </p>
        <label className="relative mt-4 block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the manuscript"
            className="h-10 w-full rounded-md border border-border bg-surface pl-8 pr-3 text-xs text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </label>
        {hits ? (
          <ul className="mt-2 flex flex-col gap-1">
            {hits.length === 0 ? (
              <li className="px-2 py-2 text-xs text-muted">No matches in the book or toolkit index.</li>
            ) : (
              hits.map((h, i) => (
                <li key={`${h.n}-${h.heading}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setBookChapter(h.n);
                      setQuery("");
                    }}
                    className="w-full rounded-sm px-2 py-1.5 text-left text-xs text-muted hover:bg-elevated hover:text-fg"
                  >
                    <span className="tabular-nums text-subtle">Ch. {h.n}</span>
                    <span className="ml-2">{h.heading}</span>
                    <span className="mt-0.5 block line-clamp-2 text-subtle">{h.snippet}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {parts.map(([part, list]) => (
              <div key={part}>
                <p className="px-2 text-[11px] uppercase tracking-wider text-subtle">{part}</p>
                <ol className="mt-1 flex flex-col gap-0.5">
                  {list.map((c) => (
                    <li key={c.n}>
                      <button
                        type="button"
                        onClick={() => setBookChapter(c.n)}
                        className={`flex w-full items-baseline gap-2 rounded-sm px-2 py-1.5 text-left text-xs ${
                          c.n === ch.n ? "bg-elevated text-fg" : "text-muted hover:text-fg"
                        }`}
                      >
                        <span className="w-6 tabular-nums text-subtle">{c.n}</span>
                        <span className="flex-1 leading-snug">{c.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </aside>

      <article className="min-w-0">
        {ch.n === 0 && !markdown ? <FrontMatter /> : null}

        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{ch.part}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
          {ch.n === 0 ? ch.title : `Chapter ${ch.n}: ${ch.title}`}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>
            {ch.status === "complete"
              ? hasManuscript(ch.n) && ch.n >= 4
                ? "Full manuscript"
                : "In manuscript"
              : hasManuscript(ch.n)
                ? "Skeleton in MS · toolkit live"
                : "Outline — toolkit live"}
          </Badge>
          {ch.tool ? (
            <Button variant="secondary" size="sm" onClick={() => setView(ch.tool!.view)}>
              {ch.tool.label}
            </Button>
          ) : null}
        </div>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{ch.lede}</p>
        {ch.takeaways.length ? (
          <ul className="mt-5 max-w-2xl flex flex-col gap-2">
            {ch.takeaways.map((t) => (
              <li key={t} className="border-l border-border pl-3 text-sm">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {ch.n === 0 ? <CompanionMap /> : null}

        {ch.n === 4 ? <IndexBlock /> : null}
        <OperatingChapter n={ch.n} />
        {ch.n === 24 ? <Chapter24 /> : null}
        {ch.n === 25 ? <Chapter25 /> : null}

        {heavy && !wantProse ? (
          <div className="mt-8 max-w-2xl rounded-lg border border-border bg-surface p-5">
            <p className="font-display text-xl">Full manuscript</p>
            <p className="mt-2 text-sm text-muted">
              This chapter is long. The toolkit above is the running form; the prose loads on
              demand, one passage at a time.
            </p>
            <Button className="mt-4" variant="secondary" onClick={() => setWantProse(true)}>
              Load chapter prose
            </Button>
          </div>
        ) : null}

        {loadingMd ? <p className="mt-8 text-sm text-subtle">Loading manuscript…</p> : null}
        {markdown ? <ManuscriptBody markdown={markdown} /> : null}

        <div className="mt-10 flex justify-between gap-3">
          <Button
            variant="ghost"
            disabled={ch.n <= minN}
            onClick={() => setBookChapter(Math.max(minN, ch.n - 1))}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={ch.n >= maxN}
            onClick={() => setBookChapter(Math.min(maxN, ch.n + 1))}
          >
            Next chapter
          </Button>
        </div>
      </article>
    </div>
  );
}

function FrontMatter() {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-display text-sm italic text-muted">{BOOK_META.dedication}</p>
      <div className="mt-6 flex flex-col gap-4">
        {EPIGRAPHS.map((e) => (
          <blockquote key={e.source} className="border-l border-accent/40 pl-4">
            <p className="font-display text-lg leading-snug">“{e.quote}”</p>
            <footer className="mt-1 text-xs text-subtle">{e.source}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 text-sm text-muted">
        {PREFACE.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function IndexBlock() {
  return (
    <div className="mt-8">
      <h3 className="font-display text-2xl">Locked weights</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {DIMENSIONS.map((d) => (
          <li key={d.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium">{d.label}</p>
              <p className="tabular-nums text-sm text-muted">{Math.round(d.weight * 100)}%</p>
            </div>
            <p className="mt-1 text-sm text-muted">{d.description}</p>
            <p className="mt-2 text-xs text-subtle">{d.source}</p>
          </li>
        ))}
      </ul>
      <h3 className="mt-8 font-display text-2xl">Five signals of rising entropy</h3>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {SIGNALS.map((s) => (
          <li key={s.n} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">Signal {s.n}</p>
            <p className="font-medium">{s.name}</p>
            <p className="mt-1 text-sm text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Chapter24() {
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-10">
      <section>
        <h3 className="font-display text-2xl">Three imperatives</h3>
        <ul className="mt-4 flex flex-col gap-4">
          {IMPERATIVES.map((i) => (
            <li key={i.n}>
              <p className="font-medium">
                {i.n}. {i.name}
              </p>
              <p className="mt-1 text-sm text-muted">{i.statement}</p>
              <p className="mt-1 text-xs text-subtle">{i.analog}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Six thermodynamic laws</h3>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {LAWS.map((l) => (
            <li key={l.n} className="rounded-lg border border-border bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-subtle">Law {l.n}</p>
              <p className="font-medium">{l.name}</p>
              <p className="mt-1 text-sm text-muted">{l.statement}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="font-display text-2xl">Four phase-transition pathways</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PATHWAYS.map((p) => (
            <li key={p.id} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs tabular-nums text-subtle">{p.signature}</p>
              <p className="mt-2 text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Five stability paradoxes</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {PARADOXES.map((p) => (
            <li key={p.name} className="border-l border-border pl-3">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-muted">{p.statement}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Six lessons</h3>
        <ol className="mt-4 flex flex-col gap-2">
          {LESSONS.map((l, i) => (
            <li key={l} className="text-sm">
              <span className="tabular-nums text-subtle">{i + 1}.</span> {l}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="font-display text-2xl">Seven principles</h3>
        <ol className="mt-4 flex flex-col gap-4">
          {PRINCIPLES.map((p) => (
            <li key={p.n}>
              <p className="font-medium">
                {p.n}. {p.name}
              </p>
              <p className="text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="font-display text-2xl">The next entropy age</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {FUTURE_CHALLENGES.map((c) => (
            <li key={c.name} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.impact}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-subtle">Entropy paths</p>
              <p className="text-sm text-muted">{c.entropy.join(" · ")}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-subtle">If managed</p>
              <p className="text-sm text-muted">{c.opportunity.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Chapter25() {
  const { setView } = usePeiStore();
  return (
    <div className="mt-10 flex max-w-2xl flex-col gap-10">
      <section>
        <h3 className="font-display text-2xl">Why action is urgent</h3>
        <p className="mt-2 text-sm text-muted">
          A perfect storm of entropy drivers, a bill for inaction, and a method — not a mood.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">The storm</p>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
              {URGENCY.storm.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">Cost of inaction</p>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
              {URGENCY.inaction.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wider text-subtle">If we act</p>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
              {URGENCY.action.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
      <section>
        <h3 className="font-display text-2xl">Four operators, one index</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ACTORS.map((a) => (
            <li key={a.who} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{a.who}</p>
              <p className="mt-1 text-sm text-muted">{a.role}</p>
              <ol className="mt-3 flex flex-col gap-1 text-xs text-muted">
                {a.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <Button className="mt-4" size="sm" variant="secondary" onClick={() => setView(a.view)}>
                Open {a.view}
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Six workstreams</h3>
        <p className="mt-2 text-sm text-muted">
          Planning ranges from Chapter 25 — not promises. Pick the dimension that is actually moving.
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {INTERVENTIONS.map((d) => (
            <li key={d.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{DIMENSIONS.find((x) => x.id === d.id)?.label}</p>
                <p className="text-xs tabular-nums text-subtle">{d.impact}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{d.goal}</p>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
                {d.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Barriers</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {BARRIERS.map((b) => (
            <li key={b.name} className="border-l border-border pl-3">
              <p className="font-medium">{b.name}</p>
              <p className="text-sm text-muted">{b.problem}</p>
              <p className="text-xs text-subtle">{b.fix}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-display text-2xl">Visions</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {VISIONS.map((v) => (
            <li key={v.name} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{v.name}</p>
              <p className="mt-1 text-sm text-muted">{v.detail}</p>
              <Button className="mt-3" size="sm" variant="ghost" onClick={() => setView(v.view)}>
                Open {v.view}
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <blockquote className="border-l border-accent/40 pl-4">
        <p className="font-display text-xl leading-snug">
          Ignore entropy and risk collapse. Manage entropy and build stability. Harness entropy and
          drive progress.
        </p>
      </blockquote>
    </div>
  );
}
