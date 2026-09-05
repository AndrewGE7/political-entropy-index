import type { DimId } from "./types";
import type { AppView } from "./store";

export const FUTURE_CHALLENGES = [
  {
    name: "Accelerating technology",
    impact: "Automation, AI, biotech, and quantum systems rewrite economies and legitimacy faster than institutions can metabolize.",
    entropy: ["Job displacement and inequality", "Regulatory lag", "Deepfakes and algorithm bias", "Cyber and autonomous weapons"],
    opportunity: ["Digital public goods", "E-governance", "Early-warning systems", "Transparency tools"],
  },
  {
    name: "Climate and environment",
    impact: "The slow bomb and the fast shock. Warming, seas, extremes, and biodiversity loss load every other dimension.",
    entropy: ["Food and water stress", "Climate refugees", "Resource contests", "Disaster-driven institutional failure"],
    opportunity: ["Green growth", "Shared climate governance", "Disaster diplomacy", "Restoration"],
  },
  {
    name: "Globalization and interdependence",
    impact: "Tight coupling: a local entropy spike now travels. Finance, supply chains, and information synchronize shocks.",
    entropy: ["Contagion", "Sovereignty gaps", "Digital colonialism", "Proxy and cyber conflict"],
    opportunity: ["Shared prosperity", "Multilateral law", "Knowledge commons", "Collective security"],
  },
  {
    name: "Demographic shifts",
    impact: "Aging cores, youth bulges, urbanization, and migration rewrite the social contract.",
    entropy: ["Pension and labor squeezes", "Urban–rural splits", "Nativism", "Value conflict"],
    opportunity: ["Diversity dividends", "Inclusive institutions", "Lifelong learning", "Social cohesion"],
  },
];

export const INTERVENTIONS: {
  id: DimId;
  goal: string;
  impact: string;
  actions: string[];
}[] = [
  {
    id: "inequality",
    goal: "Compress the distribution of usable energy.",
    impact: "Planning range: −5 to −10 PEI",
    actions: [
      "Progressive taxation that actually collects",
      "Universal health, education, pensions",
      "Public education and vocational ladders",
      "Anti-corruption as a distribution policy",
      "Labor rights and fair wages",
    ],
  },
  {
    id: "institutions",
    goal: "Restore heat sinks: courts, legislatures, constrained executives.",
    impact: "Planning range: −5 to −15 PEI",
    actions: [
      "Judicial independence",
      "Legislatures that can still bargain",
      "Executive term and emergency limits",
      "Free and fair elections",
      "Civil society and media protection",
    ],
  },
  {
    id: "conflict",
    goal: "Stop the fastest entropy path.",
    impact: "Planning range: −10 to −20 PEI",
    actions: [
      "Address exclusion before the first shot",
      "Peacebuilding after violence",
      "Mediation and diplomacy",
      "Peacekeeping when the sink has failed",
      "Grievance processes that are real",
    ],
  },
  {
    id: "energy",
    goal: "Keep the physical substrate of order from becoming a weapon.",
    impact: "Planning range: −3 to −8 PEI",
    actions: [
      "Diversified sources",
      "Domestic buffers",
      "Efficiency in industry and buildings",
      "Renewables as a new entropy budget, not a slogan",
      "Strategic reserves and emergency plans",
    ],
  },
  {
    id: "information",
    goal: "Shared facts are negative entropy.",
    impact: "Planning range: −2 to −5 PEI",
    actions: [
      "Press freedom",
      "Open data and FOI",
      "Digital literacy",
      "Universal access to knowledge",
      "Counter-disinformation that does not become censorship",
    ],
  },
  {
    id: "environment",
    goal: "Stop unbudgeted biophysical load.",
    impact: "Planning range: −2 to −5 PEI",
    actions: [
      "Emissions reduction",
      "Sustainable land and water",
      "Biodiversity protection",
      "Pollution control",
      "Resource management with a time horizon longer than a term",
    ],
  },
];

export const BARRIERS = [
  {
    name: "Short-term thinking",
    problem: "Election cycles buy quiet now and a larger bill later.",
    fix: "Public PEI reporting, independent commissions, electoral rules that reward horizon.",
  },
  {
    name: "Vested interests",
    problem: "Some actors profit from entropy they can export.",
    fix: "Transparency, anti-corruption, PEI costs made visible.",
  },
  {
    name: "Institutional inertia",
    problem: "Heat sinks clog and then refuse the plumber.",
    fix: "Reform windows, experiments, civil-society pressure.",
  },
  {
    name: "Lack of resources",
    problem: "The places that need heat sinks most can least afford them.",
    fix: "External capacity, public–private, PEI-ranked priorities.",
  },
  {
    name: "Complexity",
    problem: "Systems are coupled; one lever moves five others.",
    fix: "Scenario lab, stress tests, PEI as a compass not an oracle.",
  },
];

export const VISIONS = [
  {
    name: "Global PEI adoption",
    detail: "Entropy tracking as ordinary as GDP. This dashboard is the working prototype.",
    view: "monitor" as AppView,
  },
  {
    name: "Real-time management",
    detail: "Live overlays, alerts at 70 / 80 / 90, ΔPEI > 15. Already running here.",
    view: "alerts" as AppView,
  },
  {
    name: "Integrated systems",
    detail: "Combine PEI with economic, social, and climate series. Sources tab is the lineage.",
    view: "sources" as AppView,
  },
  {
    name: "Entropy-aware governance",
    detail: "Audits in the budget cycle. The worksheet is Chapter 23 in a form.",
    view: "audit" as AppView,
  },
];

export const URGENCY = {
  storm: [
    "Inequality near a century high",
    "Trust in institutions, media, and experts decaying",
    "Conflict, polarization, and authoritarian return",
    "Energy as climate and geopolitics",
    "Information corruption at industrial scale",
    "Environmental load as a background radiation",
  ],
  inaction: [
    "Human suffering: poverty, violence, displacement",
    "Economic damage and collapse risk",
    "Social fragmentation",
    "Institutional failure",
    "Civilizational backsliding",
    "Existential stacks: nuclear, pandemic, misaligned AI",
  ],
  action: [
    "Human flourishing: prosperity, justice, freedom",
    "Innovation and shared wealth",
    "Trust and cooperation",
    "Institutional resilience",
    "Global stability as a public good",
    "Environmental room to maneuver",
  ],
};
