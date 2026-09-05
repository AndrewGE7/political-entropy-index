import { useEffect, useMemo } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Briefcase,
  Cable,
  Calculator,
  FileSpreadsheet,
  GitCompare,
  Globe2,
  GraduationCap,
  LayoutGrid,
  LineChart,
  Map,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Waypoints,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { analyzeTrend, forecast } from "@/lib/pei/calculator";
import { DIMENSIONS, phaseLabel } from "@/lib/pei/dimensions";
import { DATA_LIMITS } from "@/lib/pei/regions";
import { COMPANION, GLOSSARY } from "@/lib/pei/book";
import { REGIONS } from "@/lib/pei/countries";
import { formatTime, peiColor, phaseTone, severityTone } from "@/lib/pei/format";
import { usePeiStore, type AppView, type RefreshInterval } from "@/lib/pei/store";
import type { CountryRecord } from "@/lib/pei/types";
import { CompareLines, TrendArea } from "./charts";
import { CountryPanel } from "./country-panel";
import { CalculatorView } from "./calculator-view";
import { ScenariosView } from "./scenarios-view";
import { HistoryView } from "./history-view";
import { AuditView } from "./audit-view";
import { BookView } from "./book-view";
import { AcademyView } from "./academy-view";
import { ResearchView } from "./research-view";
import { PitchView } from "./pitch-view";
import { FromChapter } from "./from-chapter";

const NAV: { id: AppView; label: string; icon: typeof LayoutGrid }[] = [
  { id: "monitor", label: "Monitor", icon: LayoutGrid },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "trends", label: "Trends", icon: LineChart },
  { id: "compare", label: "Compare", icon: GitCompare },
  { id: "calculator", label: "Calculator", icon: Calculator },
  { id: "scenarios", label: "Scenarios", icon: Waypoints },
  { id: "history", label: "Epoch", icon: Map },
  { id: "audit", label: "Audit", icon: FileSpreadsheet },
  { id: "book", label: "Book", icon: BookOpen },
  { id: "academy", label: "Academy", icon: GraduationCap },
  { id: "research", label: "Research", icon: Cable },
  { id: "pitch", label: "Pitch", icon: Briefcase },
  { id: "sources", label: "Sources", icon: SlidersHorizontal },
];

const INTERVALS: { n: RefreshInterval; label: string }[] = [
  { n: 0, label: "Off" },
  { n: 10, label: "10s" },
  { n: 30, label: "30s" },
  { n: 60, label: "1m" },
  { n: 300, label: "5m" },
  { n: 600, label: "10m" },
];

export function PeiApp() {
  const store = usePeiStore();
  const {
    countries,
    alerts,
    connections,
    lastUpdated,
    loading,
    selected,
    view,
    region,
    query,
    autoRefresh,
    setView,
    setRegion,
    setQuery,
    refresh,
    select,
    setAutoRefresh,
  } = store;

  useEffect(() => {
    if (!lastUpdated) void refresh(true);
  }, [lastUpdated, refresh]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = window.setInterval(() => void refresh(true), autoRefresh * 1000);
    return () => window.clearInterval(id);
  }, [autoRefresh, refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      if (region !== "All" && c.region !== region) return false;
      if (q && !`${c.name} ${c.code}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [countries, region, query]);

  const globalPei =
    Math.round((countries.reduce((a, c) => a + c.pei, 0) / Math.max(1, countries.length)) * 10) / 10;
  const selectedCountry = countries.find((c) => c.code === selected) ?? null;
  const criticalCount = countries.filter((c) => c.pei >= 70).length;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-subtle">
                Age Old LLC · Research Division
              </p>
              <h1 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">
                Political Entropy Index
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted">
                Canonical instrument, academy, and research lab. The book and the formula are not a community fork.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-lg border border-border bg-surface px-3 py-2 text-right">
                <p className="text-[11px] uppercase tracking-wider text-subtle">Mean PEI</p>
                <p className={`font-display text-2xl tabular-nums ${peiColor(globalPei)}`}>
                  {globalPei.toFixed(1)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface px-3 py-2 text-right">
                <p className="text-[11px] uppercase tracking-wider text-subtle">Watch band</p>
                <p className="font-display text-2xl tabular-nums text-critical">{criticalCount}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const on = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    className={`flex h-10 shrink-0 items-center gap-2 rounded-sm px-3 text-sm ${
                      on ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated hover:text-fg"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                    {item.id === "alerts" && alerts.length > 0 ? (
                      <span className="tabular-nums text-xs">{alerts.length}</span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-subtle">Auto-refresh</span>
              <div className="flex rounded-sm border border-border bg-surface p-0.5">
                {INTERVALS.map((opt) => (
                  <button
                    key={opt.n}
                    type="button"
                    onClick={() => setAutoRefresh(opt.n)}
                    className={`h-8 rounded-xs px-2.5 text-xs ${
                      autoRefresh === opt.n ? "bg-elevated text-fg" : "text-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <Button variant="secondary" size="sm" onClick={() => void refresh(true)} disabled={loading}>
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-subtle">
            <span>Last updated {formatTime(lastUpdated)}</span>
            {connections.map((c) => (
              <span key={c.source} className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${
                    c.status === "live"
                      ? "bg-ordered"
                      : c.status === "error"
                        ? "bg-critical"
                        : "bg-muted"
                  }`}
                />
                {c.source}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {view === "monitor" ? (
          <MonitorView
            filtered={filtered}
            region={region}
            query={query}
            setRegion={setRegion}
            setQuery={setQuery}
            selected={selectedCountry}
            onSelect={select}
          />
        ) : null}
        {view === "alerts" ? <AlertsView /> : null}
        {view === "trends" ? <TrendsView /> : null}
        {view === "compare" ? <CompareView /> : null}
        {view === "calculator" ? <CalculatorView /> : null}
        {view === "scenarios" ? <ScenariosView /> : null}
        {view === "history" ? <HistoryView /> : null}
        {view === "audit" ? <AuditView /> : null}
        {view === "book" ? <BookView /> : null}
        {view === "academy" ? <AcademyView /> : null}
        {view === "research" ? <ResearchView /> : null}
        {view === "pitch" ? <PitchView /> : null}
        {view === "sources" ? <SourcesView /> : null}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-subtle sm:px-6">
          <p>© 2026 Andrew Eppler and Age Old LLC. PEI™ Canonical Work. Age Old Research License 1.0.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="hover:text-fg" onClick={() => setView("pitch")}>
              Pitch
            </button>
            <button type="button" className="hover:text-fg" onClick={() => setView("research")}>
              License
            </button>
            <button type="button" className="hover:text-fg" onClick={() => setView("academy")}>
              Academy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MonitorView({
  filtered,
  region,
  query,
  setRegion,
  setQuery,
  selected,
  onSelect,
}: {
  filtered: CountryRecord[];
  region: string;
  query: string;
  setRegion: (r: string) => void;
  setQuery: (q: string) => void;
  selected: CountryRecord | null;
  onSelect: (code: string | null) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="h-11 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <FromChapter n={20} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect(c.code)}
              className={`rounded-lg border bg-surface p-4 text-left transition-colors duration-150 hover:border-accent/40 ${
                selected?.code === c.code ? "border-accent" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-subtle">{c.code}</p>
                  <p className="font-medium text-fg">{c.name}</p>
                </div>
                <span className={`font-display text-2xl tabular-nums ${peiColor(c.pei)}`}>
                  {c.pei.toFixed(1)}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
                <div className="h-full rounded-full bg-accent/70" style={{ width: `${Math.min(100, c.pei)}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${phaseTone(c.phase)}`}>
                  {phaseLabel(c.phase)}
                </span>
                <span className="text-[11px] text-subtle">{c.region}</span>
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">No countries match that filter.</p>
        ) : null}
      </div>
      <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <Card className="p-5">
          {selected ? (
            <CountryPanel country={selected} />
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center gap-2 px-4 text-center">
              <Globe2 className="size-8 text-subtle" />
              <p className="font-display text-xl">Select a country</p>
              <p className="text-sm text-muted">Radar, trend, forecast, and source lineage open here.</p>
            </div>
          )}
        </Card>
      </aside>
    </div>
  );
}

function AlertsView() {
  const { alerts, countries, select, setView } = usePeiStore();
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl">Alert feed</h2>
        <p className="mt-1 text-sm text-muted">
          Thresholds at PEI 70 / 80 / 90. Rapid-change alerts when year-over-year ΔPEI exceeds 15.
        </p>
        <div className="mt-3">
          <FromChapter n={20} />
        </div>
      </div>
      {alerts.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted">No alerts in the current snapshot.</Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {alerts.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => {
                  select(a.code);
                  setView("monitor");
                }}
                className={`w-full rounded-lg border p-4 text-left ${severityTone(a.severity)}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-wider">{a.severity}</span>
                  <span className="tabular-nums text-xs">{a.pei.toFixed(1)}</span>
                </div>
                <p className="mt-1 text-sm text-fg">{a.message}</p>
                <p className="mt-1 text-xs opacity-70">
                  {countries.find((c) => c.code === a.code)?.region} · {a.kind}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TrendsView() {
  const { countries, watchlist, select, setView } = usePeiStore();
  const watched = countries.filter((c) => watchlist.includes(c.code));
  const list = watched.length ? watched : countries.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Historical trends</h2>
        <p className="mt-1 text-sm text-muted">
          Five-year PEI path, direction, and a linear three-year projection. Reference lines at entropy
          thresholds.
        </p>
        <div className="mt-3">
          <FromChapter n={15} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((c) => {
          const trend = analyzeTrend(c.history);
          const Icon =
            trend.direction === "increasing"
              ? ArrowUpRight
              : trend.direction === "decreasing"
                ? ArrowDownRight
                : ArrowRight;
          return (
            <Card key={c.code} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <button type="button" className="text-left" onClick={() => { select(c.code); setView("monitor"); }}>
                  <p className="text-xs uppercase tracking-wider text-subtle">{c.code}</p>
                  <p className="font-medium">{c.name}</p>
                </button>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Icon className="size-4" />
                  <span className="capitalize">{trend.direction}</span>
                  <span className={`tabular-nums ${peiColor(c.pei)}`}>{c.pei.toFixed(1)}</span>
                </div>
              </div>
              <TrendArea series={forecast(c.history)} height={220} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CompareView() {
  const { countries, compare, toggleCompare } = usePeiStore();
  const selected = countries.filter((c) => compare.includes(c.code));
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Compare</h2>
        <p className="mt-1 text-sm text-muted">Up to four countries. Click a chip to add or remove.</p>
        <div className="mt-3">
          <FromChapter n={16} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {countries.map((c) => {
          const on = compare.includes(c.code);
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => toggleCompare(c.code)}
              className={`h-9 rounded-full border px-3 text-xs ${
                on ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
      {selected.length ? (
        <Card className="p-4">
          <CompareLines countries={selected} />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-subtle">
                <tr>
                  <th className="py-2 font-medium">Country</th>
                  <th className="py-2 font-medium">PEI</th>
                  {DIMENSIONS.map((d) => (
                    <th key={d.id} className="py-2 font-medium">
                      {d.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.map((c) => (
                  <tr key={c.code} className="border-t border-border">
                    <td className="py-2">{c.name}</td>
                    <td className={`py-2 tabular-nums ${peiColor(c.pei)}`}>{c.pei.toFixed(1)}</td>
                    {DIMENSIONS.map((d) => (
                      <td key={d.id} className="py-2 tabular-nums text-muted">
                        {c.scores[d.id].toFixed(0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <p className="text-sm text-muted">Select at least one country.</p>
      )}
    </div>
  );
}

function SourcesView() {
  const { connections, countries, openChapter, setView } = usePeiStore();

  function exportCsv() {
    const header = ["code", "name", "region", "pei", "phase", ...DIMENSIONS.map((d) => d.id)].join(",");
    const rows = countries.map((c) =>
      [c.code, `"${c.name}"`, `"${c.region}"`, c.pei, c.phase, ...DIMENSIONS.map((d) => c.scores[d.id])].join(","),
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pei-snapshot.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(countries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pei-snapshot.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="font-display text-2xl">Sources and lineage</h2>
      <p className="mt-2 text-sm text-muted">
        Refresh overlays World Bank Gini, political stability, energy imports, and PM2.5 onto the
        six-dimension PEI. Conflict (UCDP) and information (Freedom House / ITU) stay on the
        curated baseline so the board never goes blank. The 1876–2026 epoch, regional reconstructions, and extracted manuscript live in Epoch and Book.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {connections.map((c) => (
          <li key={c.source} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{c.source}</p>
              <Badge className={c.status === "live" ? "border-ordered/40 text-ordered" : ""}>{c.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{c.detail}</p>
          </li>
        ))}
      </ul>
      <Separator className="my-6" />
      <h3 className="font-display text-xl">Dimension map</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-subtle">
            <tr>
              <th className="py-2 font-medium">Variable</th>
              <th className="py-2 font-medium">Weight</th>
              <th className="py-2 font-medium">Data source</th>
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="py-2">{d.label}</td>
                <td className="py-2 tabular-nums">{Math.round(d.weight * 100)}%</td>
                <td className="py-2 text-muted">{d.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={exportCsv}>
          Export CSV
        </Button>
        <Button variant="secondary" onClick={exportJson}>
          Export JSON
        </Button>
        <a
          href="/book/manuscript.md"
          download="the-thermodynamics-of-political-entropy.md"
          className="inline-flex h-10 items-center rounded-sm border border-border bg-elevated px-4 text-sm text-fg hover:bg-surface"
        >
          Download manuscript
        </a>
      </div>
      <Separator className="my-6" />
      <h3 className="font-display text-xl">Historical confidence</h3>
      <p className="mt-2 text-sm text-muted">
        Pre-1900 series are thinner. Live World Bank overlays cover four dimensions; conflict and
        information remain curated. Epoch dimension scores are converted to entropy so they match
        the board.
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-subtle">
            <tr>
              <th className="py-2 font-medium">Period</th>
              <th className="py-2 font-medium">Confidence</th>
              <th className="py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {DATA_LIMITS.map((d) => (
              <tr key={d.period} className="border-t border-border">
                <td className="py-2 tabular-nums">{d.period}</td>
                <td className="py-2">{d.confidence}</td>
                <td className="py-2 text-muted">{d.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Separator className="my-6" />
      <h3 className="font-display text-xl">Glossary</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {GLOSSARY.map((g) => (
          <li key={g.term} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-medium">{g.term}</p>
            <p className="mt-1 text-sm text-muted">{g.meaning}</p>
          </li>
        ))}
      </ul>
      <Separator className="my-6" />
      <h3 className="font-display text-xl">Chapter ↔ instrument</h3>
      <p className="mt-2 text-sm text-muted">
        The manuscript and the toolkit are one system. Each row is a chapter that has a running
        handle.
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {COMPANION.map((c) => (
          <li key={`${c.n}-${c.runs}`} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <button type="button" className="text-left hover:text-accent" onClick={() => openChapter(c.n)}>
              <span className="tabular-nums text-subtle">Ch. {c.n}</span> {c.runs}
            </button>
            <button type="button" className="text-xs text-subtle hover:text-fg" onClick={() => setView(c.view)}>
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
