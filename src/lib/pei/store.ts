import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildAlerts } from "./alerts";
import {
  applyAdapters,
  iso3MapToIso2,
  parseCsv,
  rowsToMap,
  type ResearchAdapter,
} from "./adapters";
import { fetchWorldBankIndicator, baselineCatalog, refreshLive } from "./live";
import type { ConnectionStatus, CountryRecord, DimScores, PeiAlert } from "./types";

export type RefreshInterval = 0 | 10 | 30 | 60 | 300 | 600;
export type AppView =
  | "monitor"
  | "alerts"
  | "trends"
  | "compare"
  | "calculator"
  | "scenarios"
  | "history"
  | "audit"
  | "book"
  | "academy"
  | "research"
  | "pitch"
  | "sources";

export type AuditDraft = {
  system: string;
  analyst: string;
  notes: string;
  scores: DimScores;
};

const defaultAudit: AuditDraft = {
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

type PeiState = {
  countries: CountryRecord[];
  baseCountries: CountryRecord[];
  liveConnections: ConnectionStatus[];
  alerts: PeiAlert[];
  connections: ConnectionStatus[];
  lastUpdated: string | null;
  loading: boolean;
  selected: string | null;
  compare: string[];
  watchlist: string[];
  region: string;
  query: string;
  view: AppView;
  autoRefresh: RefreshInterval;
  bookChapter: number;
  historyYear: number;
  audit: AuditDraft;
  adapters: ResearchAdapter[];
  canonicalOnly: boolean;
  academyLesson: string;
  lessonDone: string[];
  instructorCalls: number;
  pitchSlide: number;
  select: (code: string | null) => void;
  setView: (view: AppView) => void;
  setRegion: (region: string) => void;
  setQuery: (query: string) => void;
  toggleCompare: (code: string) => void;
  toggleWatch: (code: string) => void;
  setAutoRefresh: (n: RefreshInterval) => void;
  setBookChapter: (n: number) => void;
  setHistoryYear: (y: number) => void;
  setAudit: (patch: Partial<AuditDraft> | { scores: DimScores }) => void;
  openChapter: (n: number) => void;
  setAcademyLesson: (id: string) => void;
  markLesson: (id: string) => void;
  bumpInstructor: () => boolean;
  setPitchSlide: (n: number) => void;
  setCanonicalOnly: (v: boolean) => void;
  addAdapter: (a: ResearchAdapter) => void;
  removeAdapter: (id: string) => void;
  toggleAdapter: (id: string) => void;
  refresh: (live?: boolean) => Promise<void>;
};

const initial = baselineCatalog();
const INSTRUCTOR_CAP = 20;

async function mapsFor(adapters: ResearchAdapter[]): Promise<Record<string, Map<string, number>>> {
  const maps: Record<string, Map<string, number>> = {};
  await Promise.all(
    adapters
      .filter((a) => a.enabled)
      .map(async (a) => {
        if (a.rows?.length) {
          maps[a.id] = rowsToMap(a.rows);
          return;
        }
        if (a.csv) {
          maps[a.id] = rowsToMap(parseCsv(a.csv));
          return;
        }
        if (a.kind === "worldbank" && a.indicator) {
          try {
            maps[a.id] = iso3MapToIso2(await fetchWorldBankIndicator(a.indicator));
          } catch {
            maps[a.id] = new Map();
          }
        }
      }),
  );
  return maps;
}

function overlay(
  base: CountryRecord[],
  liveConnections: ConnectionStatus[],
  adapters: ResearchAdapter[],
  canonicalOnly: boolean,
  maps: Record<string, Map<string, number>>,
) {
  if (canonicalOnly) {
    return { countries: base, connections: liveConnections };
  }
  const applied = applyAdapters(base, adapters, maps);
  return {
    countries: applied.countries,
    connections: [...liveConnections, ...applied.connections],
  };
}

export const usePeiStore = create<PeiState>()(
  persist(
    (set, get) => ({
      countries: initial,
      baseCountries: initial,
      liveConnections: [
        { source: "World Bank", status: "baseline", detail: "Smart defaults — refresh to overlay live series" },
        { source: "Freedom House / ITU", status: "baseline", detail: "Curated information-flow scores" },
        { source: "UCDP/PRIO", status: "baseline", detail: "Curated conflict intensity" },
        { source: "WID / Polity / EI / NASA-IPCC", status: "baseline", detail: "Framework weights locked" },
      ],
      alerts: buildAlerts(initial),
      connections: [
        { source: "World Bank", status: "baseline", detail: "Smart defaults — refresh to overlay live series" },
        { source: "Freedom House / ITU", status: "baseline", detail: "Curated information-flow scores" },
        { source: "UCDP/PRIO", status: "baseline", detail: "Curated conflict intensity" },
        { source: "WID / Polity / EI / NASA-IPCC", status: "baseline", detail: "Framework weights locked" },
      ],
      lastUpdated: null,
      loading: false,
      selected: null,
      compare: ["US", "CN", "RU"],
      watchlist: ["US", "UA", "RU", "CN", "SD"],
      region: "All",
      query: "",
      view: "monitor",
      autoRefresh: 0,
      bookChapter: 24,
      historyYear: 2026,
      audit: defaultAudit,
      adapters: [],
      canonicalOnly: false,
      academyLesson: "l01",
      lessonDone: [],
      instructorCalls: 0,
      pitchSlide: 0,
      select: (code) => set({ selected: code }),
      setView: (view) => set({ view }),
      setRegion: (region) => set({ region }),
      setQuery: (query) => set({ query }),
      toggleCompare: (code) => {
        const cur = get().compare;
        set({
          compare: cur.includes(code)
            ? cur.filter((c) => c !== code)
            : cur.length >= 4
              ? [...cur.slice(1), code]
              : [...cur, code],
        });
      },
      toggleWatch: (code) => {
        const cur = get().watchlist;
        set({
          watchlist: cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code],
        });
      },
      setAutoRefresh: (n) => set({ autoRefresh: n }),
      setBookChapter: (n) => set({ bookChapter: n }),
      setHistoryYear: (y) => set({ historyYear: y }),
      setAudit: (patch) => set({ audit: { ...get().audit, ...patch } }),
      openChapter: (n) => set({ view: "book", bookChapter: n }),
      setAcademyLesson: (id) => set({ academyLesson: id }),
      markLesson: (id) => {
        const cur = get().lessonDone;
        if (!cur.includes(id)) set({ lessonDone: [...cur, id] });
      },
      bumpInstructor: () => {
        const n = get().instructorCalls;
        if (n >= INSTRUCTOR_CAP) return false;
        set({ instructorCalls: n + 1 });
        return true;
      },
      setPitchSlide: (n) => set({ pitchSlide: n }),
      setCanonicalOnly: (v) => {
        set({ canonicalOnly: v });
        void get().refresh(false);
      },
      addAdapter: (a) => set({ adapters: [...get().adapters, a] }),
      removeAdapter: (id) => set({ adapters: get().adapters.filter((a) => a.id !== id) }),
      toggleAdapter: (id) => {
        set({
          adapters: get().adapters.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
        });
      },
      refresh: async (live = true) => {
        if (get().loading) return;
        set({ loading: true });
        try {
          let base = get().baseCountries;
          let liveConnections = get().liveConnections;
          if (live) {
            const result = await refreshLive();
            base = result.countries;
            liveConnections = result.connections;
          }
          const adapters = get().adapters ?? [];
          const canonicalOnly = get().canonicalOnly;
          const maps = canonicalOnly ? {} : await mapsFor(adapters);
          const overlaid = overlay(base, liveConnections, adapters, canonicalOnly, maps);
          set({
            baseCountries: base,
            liveConnections,
            countries: overlaid.countries,
            connections: overlaid.connections,
            alerts: buildAlerts(overlaid.countries),
            lastUpdated: new Date().toISOString(),
            loading: false,
          });
        } catch {
          set({ loading: false });
        }
      },
    }),
    {
      name: "pei-toolkit",
      partialize: (s) => ({
        watchlist: s.watchlist,
        compare: s.compare,
        autoRefresh: s.autoRefresh,
        region: s.region,
        bookChapter: s.bookChapter,
        historyYear: s.historyYear,
        audit: s.audit,
        adapters: s.adapters,
        canonicalOnly: s.canonicalOnly,
        academyLesson: s.academyLesson,
        lessonDone: s.lessonDone,
        instructorCalls: s.instructorCalls,
        pitchSlide: s.pitchSlide,
      }),
    },
  ),
);

export const INSTRUCTOR_LIMIT = INSTRUCTOR_CAP;
