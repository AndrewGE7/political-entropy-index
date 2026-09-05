import type { DimScores } from "./types";
import type { EpochPoint } from "./history";

/** Source tables score stability/quality high. Convert to entropy like GLOBAL_EPOCH. */
function ent(
  year: number,
  pei: number,
  ineq: number,
  instStab: number,
  conflict: number,
  energySec: number,
  infoFlow: number,
  envQuality: number,
  event?: string,
): EpochPoint {
  const dimensions: DimScores = {
    inequality: ineq,
    institutions: 100 - instStab,
    conflict,
    energy: 100 - energySec,
    information: 100 - infoFlow,
    environment: 100 - envQuality,
  };
  return event ? { year, pei, dimensions, event } : { year, pei, dimensions };
}

export type RegionalSeries = {
  id: string;
  label: string;
  note: string;
  points: EpochPoint[];
};

export const REGIONAL_EPOCHS: RegionalSeries[] = [
  {
    id: "us",
    label: "United States",
    note: "1900–2026. Progressive era through polarization. Source table converted to entropy scores.",
    points: [
      ent(1900, 48, 45, 80, 20, 90, 40, 95, "Progressive Era, industrialization"),
      ent(1910, 50, 50, 78, 25, 88, 45, 92),
      ent(1920, 52, 55, 75, 30, 85, 50, 88, "Roaring Twenties"),
      ent(1930, 75, 70, 60, 60, 60, 55, 80, "Great Depression"),
      ent(1940, 80, 75, 55, 70, 55, 60, 75, "WWII"),
      ent(1950, 55, 50, 75, 30, 85, 70, 85, "Post-war boom, Cold War"),
      ent(1960, 60, 55, 70, 40, 80, 75, 80, "Civil Rights Movement"),
      ent(1970, 68, 65, 65, 50, 70, 80, 70, "Vietnam, social unrest"),
      ent(1980, 65, 60, 70, 45, 75, 85, 65, "Reagan era, stagflation"),
      ent(1990, 62, 58, 75, 40, 80, 90, 60, "Post-Cold War, Gulf War"),
      ent(2000, 68, 65, 65, 50, 65, 95, 55, "Dot-com, 9/11"),
      ent(2010, 72, 70, 60, 60, 60, 90, 50, "Financial-crisis aftermath"),
      ent(2020, 78, 75, 55, 60, 55, 95, 45, "COVID-19, polarization"),
      ent(2026, 78, 75, 55, 60, 55, 100, 42, "Current (estimated)"),
    ],
  },
  {
    id: "ru",
    label: "Soviet Union / Russia",
    note: "1922–2026. Founding, purges, collapse, reconstitution. Entropy export then re-import.",
    points: [
      ent(1922, 85, 30, 40, 80, 50, 20, 70, "USSR founded"),
      ent(1930, 90, 25, 35, 90, 45, 15, 65, "Purges, collectivization"),
      ent(1940, 92, 28, 32, 95, 42, 18, 62, "Eastern Front"),
      ent(1950, 88, 30, 40, 90, 45, 20, 60, "Cold War begins"),
      ent(1960, 85, 35, 45, 85, 50, 25, 58, "Khrushchev era"),
      ent(1970, 82, 40, 50, 80, 55, 30, 55, "Brezhnev stagnation"),
      ent(1980, 88, 45, 40, 85, 50, 35, 50, "Afghanistan, economic decline"),
      ent(1990, 95, 50, 20, 95, 40, 40, 45, "Perestroika, system collapse"),
      ent(1991, 98, 55, 10, 100, 35, 45, 40, "USSR dissolves"),
      ent(1995, 85, 65, 30, 80, 45, 50, 35, "Post-Soviet chaos"),
      ent(2000, 75, 60, 40, 70, 60, 45, 40, "Putin rises"),
      ent(2010, 72, 58, 45, 65, 70, 40, 45),
      ent(2020, 78, 65, 40, 75, 65, 35, 50, "COVID-19, Ukraine tensions"),
      ent(2026, 82, 70, 35, 85, 60, 30, 55, "Current (estimated)"),
    ],
  },
  {
    id: "cn",
    label: "China",
    note: "1949–2026. Revolution, famine peak, reform, controlled chaos.",
    points: [
      ent(1949, 90, 40, 30, 90, 30, 10, 60, "Communist Revolution"),
      ent(1955, 88, 35, 35, 85, 35, 15, 58, "Great Leap Forward begins"),
      ent(1960, 95, 45, 25, 95, 25, 10, 50, "Great Famine — peak entropy"),
      ent(1965, 92, 40, 28, 90, 30, 12, 52, "Cultural Revolution begins"),
      ent(1970, 90, 38, 30, 88, 32, 15, 54),
      ent(1975, 85, 40, 35, 85, 35, 20, 56),
      ent(1980, 80, 45, 40, 80, 40, 25, 58, "Deng Xiaoping reforms"),
      ent(1990, 72, 55, 50, 65, 50, 30, 60, "Economic opening"),
      ent(2000, 70, 60, 55, 60, 55, 40, 62, "WTO accession"),
      ent(2010, 72, 65, 55, 60, 50, 35, 55),
      ent(2020, 75, 70, 52, 65, 48, 30, 50, "COVID-19, trade wars"),
      ent(2026, 78, 72, 50, 70, 45, 25, 48, "Current (estimated)"),
    ],
  },
  {
    id: "eu",
    label: "European Union",
    note: "1957–2026. Heat-sink experiment: pooling sovereignty to dump conflict entropy.",
    points: [
      ent(1957, 50, 45, 80, 15, 75, 70, 85, "Treaty of Rome"),
      ent(1967, 48, 42, 85, 10, 80, 75, 88),
      ent(1977, 52, 48, 82, 12, 70, 80, 82),
      ent(1987, 50, 45, 85, 10, 75, 85, 80, "Single European Act"),
      ent(1997, 48, 42, 90, 8, 80, 90, 85, "Maastricht"),
      ent(2007, 50, 45, 88, 10, 75, 92, 82, "Euro, crisis begins"),
      ent(2017, 55, 50, 85, 15, 70, 88, 78, "Brexit, migration"),
      ent(2026, 60, 55, 80, 20, 65, 85, 75, "Current (estimated)"),
    ],
  },
];

export const PHASE_TRANSITIONS = [
  { year: 1914, system: "Global", change: "PEI 67 → 78+", type: "Catabolic collapse", detail: "WWI: a local spike in a tightly coupled system." },
  { year: 1929, system: "Global", change: "+17 (68 → 85)", type: "Economic collapse", detail: "Depression as financial entropy cascade." },
  { year: 1945, system: "Global", change: "Peak 95, then reset", type: "System reboot", detail: "Bretton Woods and the UN as new heat sinks." },
  { year: 1989, system: "Eastern Bloc", change: "95 → 72", type: "Political transition", detail: "Berlin Wall: entropy released, not abolished." },
  { year: 1991, system: "Soviet Union", change: "95 → 65 world / 98 local", type: "Collapse", detail: "Authority evaporates; entropy redistributes." },
  { year: 2008, system: "Global", change: "+12 (68 → 80)", type: "Financial shock", detail: "Contagion the PEI had to learn to see." },
  { year: 2020, system: "Global", change: "+12 (76 → 88)", type: "Synchronization", detail: "COVID as a global entropy pulse." },
];

export const DECADE_AVERAGES: { decade: string; pei: number; themes: string }[] = [
  { decade: "1870s", pei: 44, themes: "Industrialization, colonialism" },
  { decade: "1880s", pei: 48, themes: "Imperial expansion" },
  { decade: "1890s", pei: 53, themes: "Rising tension" },
  { decade: "1900s", pei: 62, themes: "Pre-war coupling" },
  { decade: "1910s", pei: 80, themes: "WWI, revolutions" },
  { decade: "1920s", pei: 81, themes: "False peace, crash" },
  { decade: "1930s", pei: 87, themes: "Depression, buildup" },
  { decade: "1940s", pei: 92, themes: "WWII, reconstruction" },
  { decade: "1950s", pei: 75, themes: "Cold War, decolonization" },
  { decade: "1960s", pei: 74, themes: "Rights, Vietnam, detente" },
  { decade: "1970s", pei: 76, themes: "Oil shocks, stagflation" },
  { decade: "1980s", pei: 78, themes: "Late Cold War" },
  { decade: "1990s", pei: 72, themes: "Unipolar dividend" },
  { decade: "2000s", pei: 74, themes: "9/11, financial crisis" },
  { decade: "2010s", pei: 79, themes: "Digital polarization" },
  { decade: "2020s", pei: 88, themes: "Pandemic, climate, blocs" },
];

export const DATA_LIMITS = [
  { period: "1876–1900", confidence: "Medium", notes: "Better economic than institutional series." },
  { period: "1900–1945", confidence: "High", notes: "Multiple independent historical sources." },
  { period: "1945–1991", confidence: "Very high", notes: "Post-war statistical state." },
  { period: "1991–2026", confidence: "Very high", notes: "Standardized modern indicators; live overlays on four dimensions." },
];
