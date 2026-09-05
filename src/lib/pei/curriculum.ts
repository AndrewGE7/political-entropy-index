import type { AppView } from "./store";

export type LessonDiagram =
  | "laws"
  | "engine"
  | "weights"
  | "signals"
  | "epoch"
  | "pathways"
  | "paradox"
  | "monitor"
  | "scenario"
  | "audit"
  | "imperative"
  | "action";

export type Lesson = {
  id: string;
  n: number;
  module: string;
  title: string;
  chapter: number;
  minutes: number;
  objectives: string[];
  lecture: string[];
  seminar: string[];
  checks: { q: string; a: string }[];
  diagram: LessonDiagram;
  lab: { view: AppView; label: string };
};

export const MODULES = [
  { id: "foundations", title: "I · Foundations", lessons: ["l01", "l02", "l03", "l04"] },
  { id: "index", title: "II · The Index", lessons: ["l05", "l06"] },
  { id: "history", title: "III · History", lessons: ["l07", "l08"] },
  { id: "cases", title: "IV · Cases", lessons: ["l09", "l10"] },
  { id: "practice", title: "V · Practice", lessons: ["l11"] },
  { id: "imperative", title: "VI · Imperative", lessons: ["l12"] },
];

export const LESSONS: Lesson[] = [
  {
    id: "l01",
    n: 1,
    module: "I · Foundations",
    title: "Why political systems obey thermodynamics",
    chapter: 0,
    minutes: 35,
    objectives: [
      "State the three sentences of the argument: order requires energy; disorder is the default; phase transitions are jumps.",
      "Distinguish PEI as an instrument from a metaphor pasted onto history.",
      "Name the six later parts of the book as the course map.",
    ],
    lecture: [
      "Politics has been rich in stories and poor in instruments. The Second Law is not decoration. Order is rented: it takes continuous surplus — fiscal, institutional, informational — to hold coordination. Unplug the refrigerator and the cold is gone. Unplug a state and the silence is not peace; it is heat with nowhere to go.",
      "Failed prediction in the twentieth century was a framework problem. Democracy scores, GDP, and coup catalogs each catch one face. PEI is how energy, entropy, and phase become a number you can argue with. This academy is the book running as a class; the dashboard is the same book running as a lab.",
      "The course follows the manuscript: foundations, the six-dimension index, 150 years of application, cases, the toolkit, the imperative. You will not be asked to believe. You will be asked to compute, overlay, and audit.",
    ],
    seminar: [
      "Where have you seen 'stability' treated as a property a regime owns rather than rents?",
      "What would count as a failed PEI — a number that looked calm while a system jumped?",
      "Why might a metaphor be worse than a locked prior, even if both are imperfect?",
    ],
    checks: [
      { q: "What are the three sentences of the argument?", a: "Order requires energy; disorder is the default; phase transitions are jumps." },
      { q: "Is PEI a fitted oracle?", a: "No. It is a locked decision-support prior you can audit." },
    ],
    diagram: "imperative",
    lab: { view: "book", label: "Open the introduction" },
  },
  {
    id: "l02",
    n: 2,
    module: "I · Foundations",
    title: "Four laws, four political translations",
    chapter: 1,
    minutes: 40,
    objectives: [
      "Translate zeroth through third laws into political terms.",
      "Map Arab Spring, Marshall Plan, USSR, and North Korea as type specimens.",
      "Refuse the fantasy of absolute political zero.",
    ],
    lecture: [
      "Zeroth: systems in contact equalize. Political temperature is contagious. Tunisia’s heat became Egypt’s, then Libya’s and Syria’s — not as poetry, as contact.",
      "First: energy is conserved, only moved. The Marshall Plan exported order. Britain to America was a relatively smooth handoff because institutions were shared. Power is not minted out of rhetoric.",
      "Second: isolated order decays. The Soviet engine closed and ran out of usable power. Third: absolute zero is unreachable. North Korea is the cost of pretending otherwise. The six later laws of stability live in Chapter 24; they do not repeal these four.",
    ],
    seminar: [
      "Is contagion measurement or metaphor in a tightly coupled media system?",
      "When is an 'entropy export' a legitimate reconstruction, and when is it predation?",
      "What would a 'closed' digital public sphere do to the Second Law translation?",
    ],
    checks: [
      { q: "Which law forbids perfect order?", a: "The third — entropy never quite reaches zero; the attempt is expensive." },
      { q: "What is the political reading of conservation?", a: "Power is redistributed, not created." },
    ],
    diagram: "laws",
    lab: { view: "calculator", label: "Open the formula" },
  },
  {
    id: "l03",
    n: 3,
    module: "I · Foundations",
    title: "Engines, heat sinks, return currents",
    chapter: 2,
    minutes: 40,
    objectives: [
      "Describe a state as an open thermodynamic engine.",
      "Identify institutions as heat sinks.",
      "Explain 1914 as a return current.",
    ],
    lecture: [
      "States import energy — trade, migration, ideas, fuel — and export entropy: pollution, displaced conflict, cheap disorder at the periphery. Openness is a stability technology. Empires last while the export works.",
      "Institutions dump heat: courts, legislatures, press, parties, unions, churches. When they clog, entropy has nowhere to go but the street. That is Chapter 6 in hardware.",
      "The British coal–steam–trade engine is the type specimen: order at home financed by dissipation abroad, until the return current arrived in 1914. Dissipative structures fail when the sink clogs.",
    ],
    seminar: [
      "Name a contemporary entropy export and its likely return path.",
      "Which of your country’s heat sinks is actually dumping heat, and which is ornamental?",
      "Can an energy-rich closed system still rot? Give a case.",
    ],
    checks: [
      { q: "What is a political heat sink?", a: "An institution that absorbs social tension so it does not become violence." },
      { q: "What is a return current?", a: "Exported entropy coming home through a tightly coupled system — 1914." },
    ],
    diagram: "engine",
    lab: { view: "history", label: "Open 1876–1914" },
  },
  {
    id: "l04",
    n: 4,
    module: "I · Foundations",
    title: "Measuring political entropy",
    chapter: 3,
    minutes: 35,
    objectives: [
      "Explain why politics resisted a number.",
      "Defend six dimensions against a single score of 'goodness'.",
      "Treat uncertainty as shown, not smoothed.",
    ],
    lecture: [
      "Quantification failed when it hid trade-offs. Democracy indices, governance scores, and conflict catalogs each catch one face. A composite with locked weights is a prior you can audit, not a regression that pretends history ran an experiment for you.",
      "Six dimensions because fewer hide the bill. Inequality can look like growth. Institutions can look like calm. Conflict can be exported. Energy can be rented. Information can be captured. Environment can be delayed. PEI refuses to let one channel speak for the system.",
      "Five signals of rising entropy — fracturing narratives, energy starvation, institutional sclerosis, thermal runaways, dissipative failures — are qualitative watches that sit beside the number. You will use both.",
    ],
    seminar: [
      "What is lost if you collapse PEI into a binary 'stable / not'?",
      "Why lock weights instead of fitting them to 20th-century outcomes?",
      "Which signal would you add, and what would it duplicate?",
    ],
    checks: [
      { q: "Why six dimensions?", a: "Fewer hide trade-offs; each channel can move while the others look fine." },
      { q: "What are weights in PEI?", a: "Locked priors, not regressions." },
    ],
    diagram: "signals",
    lab: { view: "calculator", label: "Work the six sliders" },
  },
  {
    id: "l05",
    n: 5,
    module: "II · The Index",
    title: "The locked formula",
    chapter: 4,
    minutes: 45,
    objectives: [
      "Write PEI from memory with weights.",
      "Score every term as entropy (higher = more disorder).",
      "Use phase bands 40 / 60 / 75 / 90 and the ΔPEI ≥ 15 alert.",
    ],
    lecture: [
      "PEI = 0.25·inequality + 0.20·institutional instability + 0.20·conflict + 0.15·energy insecurity + 0.10·information entropy + 0.10·environmental stress. Every term is 0–100, higher = more disorder. Do not invert twice.",
      "Inequality is the largest weight because it is the slowest to reverse. Conflict is the override switch. Institutions and energy are the heat-sink and the fuel. Information and environment are smaller weights and larger futures.",
      "Bands at 40 / 60 / 75 / 90 are design parameters used by alerts, charts, and scenarios. A jump of ΔPEI ≥ 15 is a rapid-change alert even inside a 'calm' band. The calculator is this lesson running.",
    ],
    seminar: [
      "If you had to move five points of weight, from where to where, and what would you break?",
      "When would a PEI of 38 still be a crisis?",
      "Why score instability rather than a stability trophy?",
    ],
    checks: [
      { q: "Write the six weights.", a: "25 / 20 / 20 / 15 / 10 / 10." },
      { q: "What is the rapid-change alert?", a: "Year-over-year ΔPEI ≥ 15." },
    ],
    diagram: "weights",
    lab: { view: "calculator", label: "Compute a country" },
  },
  {
    id: "l06",
    n: 6,
    module: "II · The Index",
    title: "Six dimensions as workstreams",
    chapter: 5,
    minutes: 50,
    objectives: [
      "Give each dimension a source, a live overlay if any, and a policy handle.",
      "State which two channels stay curated in this build, and why.",
      "Treat environment as 10% of PEI and more than 10% of the future.",
    ],
    lecture: [
      "Inequality (WID / Gini overlay) is thermodynamic friction. Institutions (Polity, V-Dem, PV.EST) dump heat until they don’t. Conflict (UCDP/PRIO, curated) is the fastest path. Energy (import dependence overlay) is the physical substrate. Information (Freedom House / ITU, curated) is negative entropy when shared and true. Environment (PM2.5 overlay, climate prior) is the slow bomb and the fast shock.",
      "The live board never blanks: conflict and information stay on curated baselines until those APIs are certified. That is a data ethic, not a delay tactic. Research adapters may overlay other series locally; they do not become official PEI.",
      "Each dimension is a workstream in Chapter 22. Approximate PEI reductions in Chapter 25 are planning ranges, not promises. Pick the dimension that is actually moving.",
    ],
    seminar: [
      "What would a live conflict overlay have to guarantee before it replaces UCDP on the board?",
      "When is energy wealth still high energy-entropy?",
      "How can information entropy rise while GDP looks fine?",
    ],
    checks: [
      { q: "Which live overlays exist today?", a: "Gini, PV.EST, energy imports, PM2.5. Conflict and information stay curated." },
      { q: "May an adapter change official PEI?", a: "No. It is a local overlay, labeled as such." },
    ],
    diagram: "weights",
    lab: { view: "research", label: "Open the adapter lab" },
  },
  {
    id: "l07",
    n: 7,
    module: "III · History",
    title: "1876–1945: export, spike, reboot",
    chapter: 11,
    minutes: 45,
    objectives: [
      "Read Pax Britannica as high energy with exported disorder.",
      "Treat 1914 and 1945 as phase events, not moral tales.",
      "See Versailles as stored heat.",
    ],
    lecture: [
      "The long 19th century looks ordered because the entropy bill was sent abroad. Gold standard, industrial takeoff, Scramble for Africa. The July crisis is what happens when a local spike meets a tightly coupled system.",
      "1914–1945 climbs through the 80s and touches 95. Two wars and a depression are catabolic. Versailles stored rather than dissipated heat. Bretton Woods and the UN are the reboot: new heat sinks, new energy rules.",
      "Lock a year on the Epoch tab. Read the matching chapter. The series is Part III of the manuscript as a line.",
    ],
    seminar: [
      "Was 1914 a failure of intelligence or of coupling?",
      "Name a postwar institution that actually dumped heat, and one that stored it.",
      "Where is a contemporary 'Versailles' — a settlement that banks entropy?",
    ],
    checks: [
      { q: "What was the Scramble for Africa in PEI terms?", a: "Entropy export as statecraft." },
      { q: "Why is Versailles a thermodynamic miscalculation?", a: "It stored heat instead of dissipating it." },
    ],
    diagram: "epoch",
    lab: { view: "history", label: "Lock 1914" },
  },
  {
    id: "l08",
    n: 8,
    module: "III · History",
    title: "1945–2026: bipolar, unipolar, disorder",
    chapter: 13,
    minutes: 45,
    objectives: [
      "Read the Cold War as two engines and a nuclear suppressor.",
      "Reject Fukuyama as a claim that entropy stops.",
      "Place 2026 on the live board as Chapter 20, not an afterword.",
    ],
    lecture: [
      "Bipolarity was a temporary equilibrium. Proxy wars exported entropy to the periphery. The welfare state absorbed domestic heat in the West. 1989 is a phase change, not the end of history.",
      "The unipolar moment was an energy surplus: digital explosion, peace dividend, then 9/11, Iraq as failed export, 2008 as financial contagion PEI had to learn to see. Finance can carry political entropy.",
      "2008–2026 couples shocks: Arab Spring, climate, COVID as global synchronization, Ukraine, information war. Global PEI in this series is back above 85. The toolkit exists because this is the operating environment.",
    ],
    seminar: [
      "Which 2020s shock is a coupling event rather than a local one?",
      "Is unipolarity recoverable, or was it a surplus?",
      "What should PEI have seen in 2007 that a GDP series missed?",
    ],
    checks: [
      { q: "What was Fukuyama’s thermodynamic mistake?", a: "Assuming entropy stops when one engine wins." },
      { q: "What is Chapter 20?", a: "Real-time PEI assessment — this dashboard." },
    ],
    diagram: "epoch",
    lab: { view: "monitor", label: "Open the 2026 board" },
  },
  {
    id: "l09",
    n: 9,
    module: "IV · Cases",
    title: "Empires and superpower handoffs",
    chapter: 16,
    minutes: 40,
    objectives: [
      "Sketch the lifecycle: surplus, thickening, overstretch, sink failure, shock.",
      "Contrast Britain→America with America→multipolarity.",
      "Ask whether the U.S. entropy budget still closes.",
    ],
    lecture: [
      "Akkad, Rome, the Mongols, Britain, the USSR: energy surplus, institutional thickening, overstretch, heat-sink failure, shock. Military power is a two-edged sink. Renewal is possible and rare.",
      "Law 1 of Chapter 24: power is redistributed, not minted. Britain to America was relatively smooth because of shared institutions. America to multipolarity is not. Friction is PEI.",
      "Compare majors on the Compare tab. Run the US–China path in Scenarios. The question is not branding. It is whether the budget closes.",
    ],
    seminar: [
      "Which trait that built a current power is most likely to finish it?",
      "What shared institutions would make a US–China handoff less frictional?",
      "Is 'the U.S. is not an empire' a thermodynamic claim or a moral one?",
    ],
    checks: [
      { q: "What makes a handoff smooth?", a: "Shared institutions — a lower-friction energy transfer." },
      { q: "What is overstretch in PEI language?", a: "Energy export that the sinks can no longer dump." },
    ],
    diagram: "scenario",
    lab: { view: "compare", label: "Compare majors" },
  },
  {
    id: "l10",
    n: 10,
    module: "IV · Cases",
    title: "Pathways, paradoxes, residual order",
    chapter: 18,
    minutes: 40,
    objectives: [
      "List the four pathways with PEI signatures.",
      "State the five stability paradoxes.",
      "Treat Bouazizi as type, not destiny.",
    ],
    lecture: [
      "When PEI crosses ~90, small events suffice. Reform (60–80, slow decline), revolution (80–95, spike), collapse (90–100, failure), transformation (70–90, oscillating). Menu, not prophecy.",
      "Paradoxes: rigidity is brittle; too much order breeds resistance; lean systems have no buffers; the founding trait can finish the system; short-term quiet stores a larger bill. Singapore, Switzerland, and U.S. negative feedback are different recipes for the same problem.",
      "Adaptive capacity beats peak strength. Efficiency without buffers is not a virtue. Chapter 19 is the seminar you run on the audit worksheet.",
    ],
    seminar: [
      "Which pathway is your country rehearsing, and what evidence would falsify that?",
      "Where is a stability–instability paradox visible this decade?",
      "What buffer did a 'lean' system drop that it now misses?",
    ],
    checks: [
      { q: "Name the four pathways.", a: "Reform, revolution, collapse, transformation." },
      { q: "What predicts longevity better than peak strength?", a: "Adaptive capacity — flexibility, learning, redundancy." },
    ],
    diagram: "pathways",
    lab: { view: "scenarios", label: "Open the scenario lab" },
  },
  {
    id: "l11",
    n: 11,
    module: "V · Practice",
    title: "Operate the instrument",
    chapter: 20,
    minutes: 50,
    objectives: [
      "Run the live board, alerts, scenarios, and entropy audit.",
      "Attach a research adapter without claiming official PEI.",
      "Export an audit as a replicable worksheet.",
    ],
    lecture: [
      "Chapter 20 is the application: auto-refresh, live World Bank overlays, curated conflict and information, alerts at 70 / 80 / 90 and on ΔPEI ≥ 15. Never blank the board.",
      "Chapter 21 is the scenario lab — entropy budgets you can argue with, not predictions. Chapter 23 is the worksheet: score entropy directly. Seed a country, write the notes, export JSON.",
      "The Research lab is how institutions grow the tool. Overlay a series. Label it local. The Canonical Work does not move. That is the license made into software.",
    ],
    seminar: [
      "What would you refuse to overlay, and why?",
      "How should an alert be briefed to a non-specialist without becoming a prophecy?",
      "When is an audit unethical (too thin a series, too strong a claim)?",
    ],
    checks: [
      { q: "What are the alert thresholds?", a: "PEI 70 / 80 / 90, and ΔPEI ≥ 15." },
      { q: "What is the only supported way to add data?", a: "An Adapter Manifest overlaid locally — not a fork of the app." },
    ],
    diagram: "monitor",
    lab: { view: "audit", label: "Run an audit" },
  },
  {
    id: "l12",
    n: 12,
    module: "VI · Imperative",
    title: "The entropy imperative and the call",
    chapter: 24,
    minutes: 40,
    objectives: [
      "Recite three imperatives, six laws, seven principles.",
      "Place the next entropy age (tech, climate, coupling, demography) on the board.",
      "Leave with a method, not a mood.",
    ],
    lecture: [
      "Order requires energy. Disorder is the default. Phase transitions are jumps. Ignore entropy and risk collapse; manage it and hold a pocket of order; harness it and invent. The six laws, four pathways, five paradoxes, six lessons, and seven principles are the operating system of the book.",
      "The next age is already loading the six dimensions: accelerating technology, climate, tight global coupling, demographic shift. Inaction has a body count; action has a method. Prevention is cheaper than transition.",
      "Citizens, leaders, organizations, the international system — four playbooks, one index. Use the calculator, the epoch, the scenarios, the audit, and the live board. The manuscript ends where the toolkit begins. Age Old Research exists so that ending stays public without becoming a fork.",
    ],
    seminar: [
      "Which principle is your institution violating most expensively?",
      "What is a pocket of order you can actually fund this year?",
      "How will you cite PEI without pretending it is an oracle?",
    ],
    checks: [
      { q: "What are the three imperatives?", a: "Order requires energy; disorder is the default; phase transitions are jumps." },
      { q: "What is Age Old Research’s job?", a: "Keep PEI public for research without surrendering the Canonical Work." },
    ],
    diagram: "action",
    lab: { view: "pitch", label: "Read the research charter" },
  },
];

export function lessonById(id: string) {
  return LESSONS.find((l) => l.id === id) ?? LESSONS[0];
}
