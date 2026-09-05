import type { AppView } from "./store";

export type BookChapter = {
  n: number;
  title: string;
  part: string;
  status: "complete" | "outline";
  lede: string;
  takeaways: string[];
  tool?: { view: AppView; label: string };
};

export const BOOK_META = {
  title: "The Thermodynamics of Political Entropy",
  subtitle: "A System for Assessing Geo-Economic and Geo-Political Movements Over the Last 150 Years",
  author: "Andrew Eppler",
  version: "17.0",
  updated: "September 2026",
  dedication: "To those who seek to understand the patterns of history, not just its events.",
  license: "Age Old Research License 1.0 · CC BY-NC-ND 4.0",
};

export const EPIGRAPHS = [
  { quote: "The energy of the world is constant. The entropy of the world tends to a maximum.", source: "Rudolf Clausius, 1865" },
  { quote: "Those who cannot remember the past are condemned to repeat it.", source: "George Santayana, 1905" },
  {
    quote: "The universe tends toward entropy. Our job is to build local pockets of order—wise, just, and temporary.",
    source: "The Entropy Imperative",
  },
];

export const PREFACE = [
  "Political systems — like all complex systems — obey the fundamental laws of thermodynamics. Order requires energy. Disorder is the default. Phase transitions occur at critical thresholds. Those three sentences are the whole argument; the rest of the book is measurement, history, and practice.",
  "The Political Entropy Index is the instrument. Six weighted dimensions, locked priors, auditable sources. This toolkit is not a marketing site for the manuscript. It is the manuscript running: calculator, epoch, scenarios, audit, and live board are the chapters you can operate.",
];

export const SIGNALS = [
  { n: 1, name: "Fracturing narratives", detail: "Media polarization and the loss of shared myths. Epistemic entropy rises before institutions officially fail." },
  { n: 2, name: "Energy starvation", detail: "Resource wars, fiscal stagnation, and the drying-up of usable power." },
  { n: 3, name: "Institutional sclerosis", detail: "Bureaucratic gridlock, capture, and corruption — heat sinks that no longer dump heat." },
  { n: 4, name: "Thermal runaways", detail: "Hyperinflation, revolutions, coups: positive feedback once a threshold is crossed." },
  { n: 5, name: "Dissipative failures", detail: "Collapse of alliances and trade networks. Order can no longer be exported." },
];

export const IMPERATIVES = [
  {
    n: 1,
    name: "Order requires energy",
    analog: "A refrigerator needs constant current. Unplug it and the cold is gone.",
    statement: "All political systems require continuous energy input — economic surplus, legitimacy, information, social capital — to hold coordination.",
  },
  {
    n: 2,
    name: "Disorder is the default",
    analog: "A room left untended accumulates dust. Order is the exception.",
    statement: "Without that input, inequality, decay, conflict, suppression, energy risk, and environmental load all rise. Stability is rented, never owned.",
  },
  {
    n: 3,
    name: "Phase transitions are inevitable",
    analog: "Water at 0°C does not gradually thicken. It jumps.",
    statement: "When entropy exceeds a system's capacity for order, change is sudden: reform, revolution, collapse, or transformation.",
  },
];

export const LAWS = [
  { n: 1, name: "Energy conservation", statement: "Power is redistributed, not created. Superpower transitions are energy transfers." },
  { n: 2, name: "Entropy increase", statement: "In the absence of input, political entropy always rises. No order is permanent." },
  { n: 3, name: "Phase transitions", statement: "Critical thresholds (PEI 75 / 90) make small triggers sufficient." },
  { n: 4, name: "Negative feedback", statement: "Checks, term limits, press, and law detect drift before it runs away." },
  { n: 5, name: "Energy efficiency", statement: "Good governance maintains order with less energy. Waste is destabilizing." },
  { n: 6, name: "Adaptive capacity", statement: "Flexibility, learning, and redundancy decide who survives the shock." },
];

export const PATHWAYS = [
  {
    id: "reform",
    name: "Reform",
    signature: "PEI 60–80 → slow decline",
    detail: "Gradual, elite-managed, peaceful. Britain 1832–1928; Chile after 1990; South Africa 1990–94.",
  },
  {
    id: "revolution",
    name: "Revolution",
    signature: "PEI 80–95 → spike",
    detail: "Sudden, mass-driven, often violent. France 1789; Russia 1917; Iran 1979.",
  },
  {
    id: "collapse",
    name: "Collapse",
    signature: "PEI 90–100 → failure",
    detail: "Authority evaporates. USSR 1991; Yugoslavia; Somalia.",
  },
  {
    id: "transform",
    name: "Transformation",
    signature: "PEI 70–90, oscillating",
    detail: "Deep systemic change without a single rupture. Industrial Revolution; EU integration; U.S. civil rights.",
  },
];

export const PARADOXES = [
  { name: "Stability–instability", statement: "The more rigid the order, the more brittle the collapse. Soviet surface calm hid a 1991 jump." },
  { name: "Order–disorder", statement: "Too much order breeds resistance; too much disorder summons strongmen." },
  { name: "Energy-efficiency", statement: "Lean systems have no buffers. Singapore is efficient and import-exposed; just-in-time broke in 2020." },
  { name: "Strength–weakness", statement: "The trait that built the system can finish it. Naval dominance, then overstretch." },
  { name: "Short-term vs long-term", statement: "Repression, debt, and extraction buy quiet now and a larger bill later." },
];

export const LESSONS = [
  "Entropy is universal. No regime type is exempt.",
  "Energy is the foundation of order — economy, education, institutions.",
  "Institutions are heat sinks. Strengthen them first.",
  "Phase transitions are patterned and therefore watchable.",
  "Stability is a balance, not a state.",
  "Adaptability, not strength, predicts longevity.",
];

export const PRINCIPLES = [
  { n: 1, name: "Monitor continuously", detail: "Annual PEI for majors, quarterly above 70, monthly above 85, alerts on jumps. This dashboard is that instrument." },
  { n: 2, name: "Invest in energy sources", detail: "Growth with less inequality, anti-corruption, trust, press freedom." },
  { n: 3, name: "Strengthen heat sinks", detail: "Courts, legislatures, constrained executives, press, civil society." },
  { n: 4, name: "Cut entropy at the source", detail: "The six dimensions are the six workstreams — not a report, a punch list." },
  { n: 5, name: "Build adaptive capacity", detail: "Redundancy, learning, experiments, backup plans." },
  { n: 6, name: "Manage transitions", detail: "Prevent, prepare, mitigate, navigate. Transitions are not optional." },
  { n: 7, name: "Balance competing demands", detail: "Order/freedom, efficiency/buffers, now/later — continuous adjustment." },
];

export const ACTORS = [
  {
    who: "Citizens",
    role: "Demand accountability; hold a shared picture of risk.",
    steps: ["Learn the six dimensions", "Track your country's PEI", "Argue from the numbers", "Support entropy-reducing policy"],
    view: "calculator" as AppView,
  },
  {
    who: "Leaders",
    role: "Govern with entropy awareness.",
    steps: ["Institutionalize PEI monitoring", "Run entropy audits", "Test policy in the scenario lab", "Prepare transition plans"],
    view: "scenarios" as AppView,
  },
  {
    who: "Organizations",
    role: "Research, warn, train, invent.",
    steps: ["Publish PEI assessments", "Train officials and journalists", "Watch the alert feed", "Prototype interventions"],
    view: "alerts" as AppView,
  },
  {
    who: "International system",
    role: "Coordinate the global entropy budget.",
    steps: ["Maintain a shared PEI series", "Early-warning diplomacy", "Capacity support", "Crisis response keyed to thresholds"],
    view: "monitor" as AppView,
  },
];

export const CHAPTERS: BookChapter[] = [
  {
    n: 0,
    title: "Why Political Systems Obey Thermodynamics",
    part: "Introduction",
    status: "complete",
    lede: "Politics has been rich in stories and poor in instruments. The Second Law is not a metaphor pasted onto history; it is why order is rented. Energy, entropy, and phase transitions survive a change of regime type. PEI is how those properties become a number you can argue with — and this toolkit is the number running.",
    takeaways: [
      "Order requires energy; disorder is the default; phase transitions are jumps.",
      "Failed prediction was a framework problem, not a data shortage.",
      "Six locked dimensions, then 150 years of application, then a machine you can operate.",
    ],
    tool: { view: "calculator", label: "Open the formula" },
  },
  {
    n: 1,
    title: "The Laws of Political Thermodynamics",
    part: "I · Foundations",
    status: "outline",
    lede: "Four physical laws, four political translations. Zeroth: systems in contact equalize — the Arab Spring as contagion of political temperature. First: energy is conserved, only moved — the Marshall Plan as an entropy export that rebuilt Europe. Second: isolated order decays — the Soviet Union as a closed engine that ran out of usable power. Third: absolute zero is unreachable — North Korea as the attempt at perfect order, and its cost.",
    takeaways: ["Equilibrium is contagious.", "Power is transferred, not minted.", "Closed systems rot.", "Perfect order is a fantasy with a body count."],
    tool: { view: "book", label: "Laws in Ch. 24" },
  },
  {
    n: 2,
    title: "Political Systems as Thermodynamic Engines",
    part: "I · Foundations",
    status: "outline",
    lede: "States are open systems. They import energy (trade, migration, ideas, fuel) and export entropy (pollution, displaced conflict, cheap disorder at the periphery). Empires last while the export works. The British coal–steam–trade engine is the type specimen: order at home financed by dissipation abroad, until the return current arrived in 1914.",
    takeaways: ["Openness is a stability technology.", "Institutions are heat sinks.", "Dissipative structures fail when the sink clogs."],
    tool: { view: "history", label: "1876–1914 epoch" },
  },
  {
    n: 3,
    title: "Measuring Political Entropy",
    part: "I · Foundations",
    status: "outline",
    lede: "Politics resisted quantification because it is complex, multidimensional, and poorly instrumented before 1900. Democracy indices, governance scores, and conflict catalogs each catch one face. PEI is a composite with locked weights: not a fitted oracle, a decision-support prior you can audit.",
    takeaways: ["Six dimensions because fewer hide trade-offs.", "Weights are priors, not regressions.", "Uncertainty is shown, not smoothed."],
    tool: { view: "calculator", label: "PEI calculator" },
  },
  {
    n: 4,
    title: "The Political Entropy Index",
    part: "II · Framework",
    status: "complete",
    lede: "PEI = 0.25·inequality + 0.20·institutional instability + 0.20·conflict + 0.15·energy insecurity + 0.10·information entropy + 0.10·environmental stress. Every term is 0–100, higher = more disorder. Phase bands at 40 / 60 / 75 / 90 are design parameters used by the alerts, the charts, and the forecast.",
    takeaways: ["Inequality is the largest single weight because it is the slowest to reverse.", "Institutions, energy, information, and environment are scored as entropy, not as 'goods' to invert at display time.", "A jump of ΔPEI ≥ 15 is a rapid-change alert."],
    tool: { view: "calculator", label: "Work the formula" },
  },
  {
    n: 5,
    title: "Economic Inequality",
    part: "II · Framework",
    status: "complete",
    lede: "Inequality is thermodynamic friction. High concentration reduces shock absorption and funds political capture. The U.S. 1950–2026 path is the working example: postwar compression, then a four-decade climb that loads every other dimension.",
    takeaways: ["Gini is the live overlay.", "Inequality is 25% of PEI because it is both cause and amplifier."],
    tool: { view: "monitor", label: "Live inequality overlay" },
  },
  {
    n: 6,
    title: "Institutional Stability",
    part: "II · Framework",
    status: "complete",
    lede: "Institutions dump heat. When they stop — succession fights, captured courts, hollow legislatures — entropy has nowhere to go but the street. Polity/V-Dem and World Bank PV.EST instrument this dimension; the dashboard scores instability, not a 'stability trophy.'",
    takeaways: ["Heat-sink failure precedes most revolutions.", "Negative feedback (checks, terms, press) is Law 4 in hardware."],
  },
  {
    n: 7,
    title: "Conflict Intensity",
    part: "II · Framework",
    status: "complete",
    lede: "Organized violence is the fastest entropy path. UCDP/PRIO remain curated in this build: live conflict APIs are not yet in the overlay, so the board never blanks. War both produces entropy and is produced by it.",
    takeaways: ["Conflict is 20% because it is the override switch.", "A local spike can globalize — 1914."],
    tool: { view: "history", label: "1914 and 1939" },
  },
  {
    n: 8,
    title: "Energy Security",
    part: "II · Framework",
    status: "complete",
    lede: "Energy is the physical substrate of political order. The 1973 oil shock is the type: an energy entropy pulse that reordered alliances, prices, and domestic coalitions. Import dependence is the live World Bank overlay (EG.IMP.CONS.ZS).",
    takeaways: ["Exporters can still be entropic if rents rot institutions.", "Transition is a new entropy budget, not a free lunch."],
    tool: { view: "scenarios", label: "Energy-transition scenario" },
  },
  {
    n: 9,
    title: "Information Flow",
    part: "II · Framework",
    status: "complete",
    lede: "Information is negative entropy when it is shared and true, and a generator when it is captured or synthesized. Press freedom and fragmentation are scored as entropy. Freedom House remains curated; the live overlay does not pretend otherwise.",
    takeaways: ["Closed information raises PEI even when GDP looks fine.", "Deepfakes are an entropy technology."],
  },
  {
    n: 10,
    title: "Environmental Stress",
    part: "II · Framework",
    status: "complete",
    lede: "Climate is the slow bomb and the fast shock. Dust Bowl to New Deal is the historical proof that environmental load can force institutional invention — or failure. PM2.5 is the live environmental overlay; the rest of the climate stack is still a prior.",
    takeaways: ["Environment is 10% of PEI and more than 10% of the future.", "The climate scenario is the high-entropy default if policy sleeps."],
    tool: { view: "scenarios", label: "Climate entropy bomb" },
  },
  {
    n: 11,
    title: "The Long 19th Century (1876–1914)",
    part: "III · History",
    status: "complete",
    lede: "Pax Britannica, gold standard, industrial takeoff — high energy, apparently low entropy, and a colonial export of disorder. The Scramble for Africa is entropy export as statecraft. The July crisis is what happens when a local spike meets a tightly coupled system.",
    takeaways: ["Stable order can be unsustainable.", "Exported entropy returns."],
    tool: { view: "history", label: "Open the epoch" },
  },
  {
    n: 12,
    title: "The Age of Cataclysm (1914–1945)",
    part: "III · History",
    status: "complete",
    lede: "Two world wars and a depression: global PEI climbs through the 80s and touches 95 in 1945. Versailles is a thermodynamic miscalculation — a peace that stored rather than dissipated heat. Bretton Woods and the UN are the reboot: new heat sinks, new energy rules.",
    takeaways: ["Catabolic collapse can reset the board.", "Punitive settlements store entropy."],
    tool: { view: "history", label: "1914–1945" },
  },
  {
    n: 13,
    title: "The Cold War Era (1945–1989)",
    part: "III · History",
    status: "complete",
    lede: "Two heat engines, nuclear deterrence as entropy suppression, proxy wars as export. Decolonization redistributes entropy into new states. The welfare state absorbs domestic heat in the West. 1989 is not the end of history; it is a phase change.",
    takeaways: ["Bipolarity was a temporary equilibrium.", "The periphery paid the entropy bill."],
    tool: { view: "history", label: "Cold War epoch" },
  },
  {
    n: 14,
    title: "The Unipolar Moment (1989–2008)",
    part: "III · History",
    status: "complete",
    lede: "A peace dividend and a digital explosion. 9/11 is a non-linear shock; Iraq is failed entropy export. 2008 is financial contagion — entropy in a form the PEI had to learn to see. Fukuyama's mistake was assuming entropy stops when one engine wins.",
    takeaways: ["Unipolarity was an energy surplus, not a law.", "Finance can carry political entropy."],
    tool: { view: "history", label: "1989–2008" },
  },
  {
    n: 15,
    title: "The Age of Disorder (2008–2026)",
    part: "III · History",
    status: "complete",
    lede: "Multipolarity, Arab Spring, climate, COVID as global synchronization, Ukraine, information war. Global PEI in this series is back above 85. The toolkit exists because this is the operating environment, not the afterword.",
    takeaways: ["Shocks now couple.", "The live board is Chapter 20 running."],
    tool: { view: "monitor", label: "Live 2026 board" },
  },
  {
    n: 16,
    title: "The Rise and Fall of Empires",
    part: "IV · Cases",
    status: "complete",
    lede: "Akkad, Rome, the Mongols, Britain, the USSR: the same thermodynamic lifecycle. Energy surplus, institutional thickening, overstretch, heat-sink failure, shock. The U.S. question is not 'are we an empire' as branding. It is whether the entropy budget still closes.",
    takeaways: ["Lifecycle is patterned.", "Renewal is possible and rare.", "Military power is a two-edged sink."],
    tool: { view: "compare", label: "Compare majors" },
  },
  {
    n: 17,
    title: "Superpower Transitions",
    part: "IV · Cases",
    status: "outline",
    lede: "Britain to America was a relatively smooth energy transfer because of shared institutions. America to multipolarity is not. The law of conservation says the energy goes somewhere; the question is the friction of the handoff.",
    takeaways: ["Smooth transitions share institutions.", "Friction is PEI."],
    tool: { view: "scenarios", label: "US–China scenario" },
  },
  {
    n: 18,
    title: "Revolutionary Phase Transitions",
    part: "IV · Cases",
    status: "outline",
    lede: "When PEI crosses ~90, small events suffice. Bouazizi is the type. The four pathways — reform, revolution, collapse, transformation — are the menu, not a prophecy of which door opens.",
    takeaways: ["Thresholds are watchable.", "Pathway choice is still political."],
    tool: { view: "book", label: "Four pathways" },
  },
  {
    n: 19,
    title: "Stability in the Face of Entropy",
    part: "IV · Cases",
    status: "outline",
    lede: "Singapore, Switzerland, the U.S. Constitution's negative feedback: different recipes for the same problem. Efficiency without buffers is a paradox, not a virtue.",
    takeaways: ["Redundancy is underrated.", "Adaptive capacity beats peak strength."],
  },
  {
    n: 20,
    title: "Real-Time PEI Assessment",
    part: "V · Toolkit",
    status: "complete",
    lede: "This view. Auto-refresh, live World Bank overlays on inequality, institutions, energy, and environment; curated conflict and information; alerts at 70 / 80 / 90 and on ΔPEI > 15.",
    takeaways: ["Never blank the board.", "Lineage is part of the number."],
    tool: { view: "monitor", label: "Open the board" },
  },
  {
    n: 21,
    title: "Scenario Modeling and Forecasting",
    part: "V · Toolkit",
    status: "complete",
    lede: "Ten-, twenty-, fifty-year paths under cooperation, climate, AI, bloc conflict, pandemic, and energy transition. Linear country forecasts on the Trends tab; structured shocks here.",
    takeaways: ["Scenarios are not predictions.", "They are entropy budgets you can argue with."],
    tool: { view: "scenarios", label: "Scenario lab" },
  },
  {
    n: 22,
    title: "Policy Interventions",
    part: "V · Toolkit",
    status: "outline",
    lede: "Each dimension is a workstream: tax and welfare; courts and elections; peacebuilding; energy diversity; press and literacy; climate and pollution. Approximate PEI reductions in Chapter 25 are planning ranges, not promises.",
    takeaways: ["Prevention is cheaper than transition.", "Pick the dimension that is actually moving."],
    tool: { view: "audit", label: "Run an audit" },
  },
  {
    n: 23,
    title: "Using the PEI Framework",
    part: "V · Toolkit",
    status: "outline",
    lede: "Citizens, leaders, organizations, international system — four playbooks, one index. The worksheet is the offline form of this sentence.",
    takeaways: ["Same instrument, different operators."],
    tool: { view: "audit", label: "Entropy worksheet" },
  },
  {
    n: 24,
    title: "The Entropy Imperative",
    part: "Conclusion",
    status: "complete",
    lede: "Three imperatives, six laws, four pathways, five paradoxes, six lessons, seven principles. This is the book's compressed operating system. Ignore entropy and risk collapse; manage it and hold a pocket of order; harness it and invent.",
    takeaways: ["Order is rented.", "Transitions can be managed.", "PEI is how you watch the rent come due."],
    tool: { view: "book", label: "Read the operating system" },
  },
  {
    n: 25,
    title: "A Call to Action",
    part: "Conclusion",
    status: "complete",
    lede: "The window for prevention is the point of the instrument. Inaction has a body count; action has a method. Use the calculator, the epoch, the scenarios, the audit, and the live board. The manuscript ends where the toolkit begins.",
    takeaways: ["Urgency without a tool is panic.", "The tools are this application.", "The time to act is a PEI number, not a mood."],
    tool: { view: "monitor", label: "Start with the board" },
  },
];

export const PHYSICS_LAWS = [
  {
    n: 0,
    name: "Zeroth law — equilibrium",
    physics: "If A and B are each in equilibrium with C, they are in equilibrium with each other.",
    politics: "Political temperature equalizes across systems in contact. Contagion is measurement, not metaphor.",
    case: "Arab Spring: Tunisia's heat became Egypt's, then Libya's and Syria's.",
  },
  {
    n: 1,
    name: "First law — conservation",
    physics: "Energy is neither created nor destroyed; it is transferred.",
    politics: "Power is redistributed. Surplus in one place is a deficit somewhere else — or an export of order.",
    case: "Marshall Plan: an entropy export that rebuilt Europe. Britain → America, 1870–1945: a relatively smooth energy handoff.",
  },
  {
    n: 2,
    name: "Second law — entropy increase",
    physics: "Isolated systems tend toward disorder. Order is rented.",
    politics: "Closed polities rot. Maintenance is the whole job of government.",
    case: "Soviet Union, 1922–1991: a closed engine that ran out of usable power.",
  },
  {
    n: 3,
    name: "Third law — no absolute zero",
    physics: "Entropy approaches a minimum as temperature approaches absolute zero; it never quite gets there.",
    politics: "Perfect order is unreachable, and the attempt is expensive.",
    case: "North Korea: the body count of pretending at absolute zero.",
  },
];

export const ENGINE_NOTES = [
  {
    name: "Open systems",
    detail:
      "States import energy — trade, migration, ideas, fuel — and export entropy: pollution, displaced conflict, cheap disorder at the periphery. Openness is a stability technology.",
  },
  {
    name: "Heat sinks",
    detail:
      "Institutions dump heat: courts, legislatures, press, parties, unions, churches. When they clog, entropy has nowhere to go but the street.",
  },
  {
    name: "Dissipative structures",
    detail:
      "Empires hold local order by exporting chaos. The British coal–steam–trade engine is the type specimen: order at home financed by dissipation abroad.",
  },
  {
    name: "Return current",
    detail:
      "Exported entropy comes home. 1914 is what happens when a tightly coupled system meets a local spike.",
  },
];

export const GLOSSARY = [
  { term: "Energy", meaning: "Usable political power: resources, labor, capital, legitimacy, information." },
  { term: "Entropy", meaning: "Disorder: inequality, decay, conflict, suppression, energy risk, environmental load." },
  { term: "Enthalpy", meaning: "Political heat — passion, nationalism, revolutionary temperature." },
  { term: "Free energy", meaning: "Power that can still do work: institutions, alliances, fiscal surplus." },
  { term: "Heat sink", meaning: "An institution that absorbs social tension so it does not become violence." },
  { term: "Phase transition", meaning: "A discontinuous jump: reform, revolution, collapse, or transformation. Watched at PEI 75 / 90." },
  { term: "Dissipative structure", meaning: "Order maintained by a continuous throughput of energy and an export of entropy." },
  { term: "PEI", meaning: "Weighted composite of six entropy dimensions. Higher = more disorder. Locked weights 25 / 20 / 20 / 15 / 10 / 10." },
  { term: "Negative feedback", meaning: "Checks, terms, press, law — mechanisms that correct drift before it runs away." },
  { term: "Adaptive capacity", meaning: "Flexibility, learning, redundancy. Predicts longevity better than peak strength." },
];

export const COMPANION: { n: number; view: AppView; label: string; runs: string }[] = [
  { n: 4, view: "calculator", label: "Calculator", runs: "Locked formula, six sliders" },
  { n: 11, view: "history", label: "Epoch", runs: "1876–1914 series" },
  { n: 12, view: "history", label: "Epoch", runs: "1914–1945 series" },
  { n: 13, view: "history", label: "Epoch", runs: "Cold War series" },
  { n: 14, view: "history", label: "Epoch", runs: "Unipolar series" },
  { n: 15, view: "history", label: "Epoch", runs: "2008–2026 series" },
  { n: 16, view: "compare", label: "Compare", runs: "Majors side by side" },
  { n: 17, view: "scenarios", label: "Scenarios", runs: "US–China / multipolar paths" },
  { n: 20, view: "monitor", label: "Monitor", runs: "Live board and alerts" },
  { n: 21, view: "scenarios", label: "Scenarios", runs: "Climate, AI, cooperation, war" },
  { n: 22, view: "audit", label: "Audit", runs: "Six workstreams" },
  { n: 23, view: "audit", label: "Audit", runs: "Chapter 23 worksheet" },
  { n: 24, view: "academy", label: "Academy", runs: "Instructor-led curriculum" },
  { n: 25, view: "monitor", label: "Monitor", runs: "Call to action, running" },
  { n: 20, view: "research", label: "Research", runs: "Adapter lab, license" },
  { n: 25, view: "pitch", label: "Pitch", runs: "Deck and investor proposal" },
];
