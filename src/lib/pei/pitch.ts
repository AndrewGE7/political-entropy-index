import { ORG } from "./legal";

export type Slide = {
  kicker: string;
  title: string;
  body: string[];
  note?: string;
};

export const SLIDES: Slide[] = [
  {
    kicker: "Age Old LLC · Research Division",
    title: "Political Entropy Index",
    body: [
      "A canonical instrument for measuring political disorder — and a school that teaches it.",
      "The book is the argument. The dashboard is the argument running. The academy is the argument taught. Adapters are how other datasets plug in without rewriting the index.",
    ],
    note: "Source-available Canonical Work. No unofficial derivatives.",
  },
  {
    kicker: "The problem",
    title: "Politics is under-instrumented",
    body: [
      "Forecasting failures were a framework problem, not a data shortage. GDP, democracy scores, and coup catalogs each catch one face of a system.",
      "Institutions, newsrooms, and classrooms still argue in stories while the coupling of shocks — finance, climate, information, war — has gone global.",
      "Without a locked prior, every lab invents its own 'stability' number. Comparison dies. Accountability dies with it.",
    ],
  },
  {
    kicker: "The instrument",
    title: "Six dimensions. Locked weights. 150 years.",
    body: [
      "PEI = 25% inequality + 20% institutional instability + 20% conflict + 15% energy insecurity + 10% information entropy + 10% environmental stress.",
      "Phase bands at 40 / 60 / 75 / 90. Alerts at 70 / 80 / 90 and on ΔPEI ≥ 15.",
      "Live World Bank overlays on four channels; conflict and information stay curated so the board never blanks. 1876–2026 as a series. Scenarios as entropy budgets, not prophecies.",
    ],
  },
  {
    kicker: "The book",
    title: "The Thermodynamics of Political Entropy",
    body: [
      "Andrew Eppler, 2026. Twenty-five chapters from the four laws through the entropy imperative.",
      "CC BY-NC-ND 4.0 on the prose: read it, cite it, do not rewrite it. The formula is Canonical Work even when it appears in the manuscript.",
      "The dashboard is not marketing for the book. It is the book with handles.",
    ],
  },
  {
    kicker: "The school",
    title: "Instructor-led curriculum",
    body: [
      "Twelve lessons, six modules, mapped to the manuscript: foundations, index, history, cases, practice, imperative.",
      "Each lesson: lecture, diagram, seminar, comprehension checks, a lab in the live instrument, and an AI instructor that refuses to change the formula.",
      "Universities and agencies can run the course without forking PEI. That is the product.",
    ],
  },
  {
    kicker: "The network",
    title: "Research adapters, not forks",
    body: [
      "Institutions attach live or static series through a published JSON/CSV schema. Overlays are local and labeled.",
      "The Canonical Work does not move. Weights, bands, manuscript, and UI stay with Age Old LLC.",
      "This is how PEI grows as a research tool without becoming a contested Wikipedia of geopolitics.",
    ],
  },
  {
    kicker: "Intellectual property",
    title: "The moat is editorial control",
    body: [
      "Copyright: book, software, curriculum. Age Old Research License 1.0 — source-available, no derivatives of the Canonical Work, adapter exception for data.",
      "Trademark: PEI, Political Entropy Index, Age Old, Age Old Research (™ now; USPTO filings are the next legal step).",
      "GitHub: public for inspection; only the copyright holder commits to main. A fork is not PEI.",
    ],
  },
  {
    kicker: "Market",
    title: "Who pays for an honest instrument",
    body: [
      "Universities (IR, political science, complexity, public policy) — course licenses and labs.",
      "Think tanks, IOs, national risk units, journalists, corporate political-risk desks — research access plus certified adapters.",
      "The user is not a consumer scrolling a feed. The user is a desk that has to brief somebody.",
    ],
  },
  {
    kicker: "Model",
    title: "Public instrument, licensed house",
    body: [
      "Free: run, cite, overlay, take the course as published.",
      "Institutional: curriculum site licenses, adapter certification, dataset partnerships, training, commissioned audits.",
      "No white-label PEI. No 'community edition' with different weights. The name is the quality control.",
    ],
  },
  {
    kicker: "The ask",
    title: "Stand up Age Old Research",
    body: [
      "Proposed seed: $0.75–1.5M over 18 months to file marks, run five university pilots, certify two conflict/information live sources, and staff two research engineers plus curriculum production.",
      "Use of funds (proposed): 35% product & data partnerships, 25% curriculum & pilots, 15% IP/legal, 15% operations, 10% reserve.",
      "Success is not a viral dashboard. Success is PEI cited as the prior, taught as the course, and unforked as the name.",
    ],
    note: "Figures are a working proposal, not audited financials or a priced round.",
  },
];

export const PROPOSAL: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Executive summary",
    paragraphs: [
      `${ORG.company} is standing up ${ORG.division} around a single Canonical Work: the Political Entropy Index and the book ${ORG.book} (${ORG.author}, ${ORG.year}). PEI is a six-dimension, locked-weight prior for political disorder, running as a live dashboard, a 150-year historical series, a scenario lab, an audit worksheet, and an instructor-led curriculum.`,
      "The research bet is that geopolitics needs a public instrument with editorial control — inspectable, citable, extensible by data, and legally closed to unofficial derivatives. Age Old Research License 1.0 plus CC BY-NC-ND on the manuscript is that design. Capital is sought to file trademarks, pilot the academy, and certify additional live series without surrendering the name.",
    ],
  },
  {
    heading: "Problem",
    paragraphs: [
      "Existing scores fragment the object. A democracy index can look calm while energy and information entropy rise. A conflict catalog can miss institutional heat. A GDP series can miss 2008 as political entropy. Analysts then argue in incompatible units.",
      "Open-source forks would make this worse, not better: five 'PEI' formulas, none canonical, all cited as PEI. The failure mode is not secrecy. It is contested instrumentation.",
    ],
  },
  {
    heading: "Solution",
    paragraphs: [
      "A locked prior: 25 / 20 / 20 / 15 / 10 / 10, entropy-scored, phase bands at 40 / 60 / 75 / 90, rapid-change alerts at ΔPEI ≥ 15. A book that states the thermodynamics rather than decorating them. A dashboard that never blanks the board. An academy that teaches the same object the desk operates. An adapter schema so World Bank, national statistical offices, and labs can overlay series locally.",
      "The license is the product architecture. Researchers get the source. Only Age Old LLC edits the Canonical Work. Adapter Manifests are the sanctioned growth surface.",
    ],
  },
  {
    heading: "Product (now)",
    paragraphs: [
      "Live monitor with World Bank overlays (Gini, political stability, energy imports, PM2.5); curated conflict and information; alerts; trends; compare; calculator; scenarios; 1876–2026 epoch with regional reconstructions; entropy audit/export; full manuscript reader; twelve-lesson academy with diagrams, labs, and an AI instructor bound to the lesson; research lab for JSON/CSV/World Bank adapters; this pitch and proposal.",
      "Auth is off. Progress and adapters persist on-device. Official scores remain distinguishable from local overlays.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "Copyright in the book, software, and curriculum vests in Andrew Eppler / Age Old LLC. The Age Old Research License withholds modification and unofficial redistribution of the Canonical Work, grants Research Use, and carves out Adapter Manifests. The manuscript is also CC BY-NC-ND 4.0. No patent license is granted; patent rights are reserved.",
      "Trademarks claimed in commerce: Age Old, Age Old Research, Political Entropy Index, PEI, The Thermodynamics of Political Entropy. Use ™ until USPTO registration. A public GitHub repository is for inspection and citation, with main protected and a single committer. Technical forking does not grant copyright or trademark rights. This proposal is not legal advice; filings are an owner action.",
    ],
  },
  {
    heading: "Market and model",
    paragraphs: [
      "Primary: university departments and professional-military / civil-service schools that need a course and a lab. Secondary: think tanks, IOs, national risk units, investigative desks, corporate political-risk. The buyer is an institution that must brief; the reader is a student who must compute.",
      "Revenue (intended): site licenses for the academy; certified-adapter and dataset-partnership contracts; training; commissioned entropy audits. The public instrument stays free to run and cite. There is no white-label. The refusal to fork is the quality story.",
    ],
  },
  {
    heading: "Go to market",
    paragraphs: [
      "Five university pilots in year one (IR / public policy / complexity). One IO or national-lab data partnership on conflict or information so those channels can go live without blanking. Citation kit (CITATION.cff, methods note, adapter schema). Curriculum as the wedge: a department can teach next term without waiting for a journal special issue.",
    ],
  },
  {
    heading: "Team and stewardship",
    paragraphs: [
      `${ORG.author} is author of the Canonical Work and steward of ${ORG.division}. Engineering, data partnerships, and curriculum production are the first hires. Governance is explicit: only Age Old LLC merges to main. That is a feature for a measurement standard, not a cultural failure of 'openness.'`,
    ],
  },
  {
    heading: "Use of funds (proposed)",
    paragraphs: [
      "Seed range $750k–$1.5M, 18-month runway. 35% product and certified live sources; 25% curriculum production and five pilots; 15% trademark/copyright counsel and filings; 15% operations; 10% reserve. Figures are a working proposal, not an audited budget or a priced round.",
    ],
  },
  {
    heading: "Risks",
    paragraphs: [
      "License politics: some labs will refuse source-available terms. Mitigation: the adapter exception and citation path are the academic surface; OSI purity is not the customer.",
      "Data gaps: conflict and information remain curated until sources meet the no-blank rule. Mitigation: paid certification of those two channels is a use of funds, not a promise on day one.",
      "Forks: GitHub cannot prevent copies. Mitigation: trademark + ND license + official builds only. PEI means Age Old’s PEI.",
      "Model risk: locked weights can be wrong. Mitigation: they are priors, published, and not silently refit. Revision is a versioned act of the steward, not a crowd edit.",
    ],
  },
  {
    heading: "The ask",
    paragraphs: [
      "Capital and institutional partners to stand up Age Old Research as the house of PEI: file the marks, pilot the academy, certify two missing live channels, and keep the Canonical Work public-to-inspect and closed-to-alter. Contact Age Old LLC, Colorado, United States.",
    ],
  },
];

export function proposalMarkdown(): string {
  const lines = [
    `# Investor proposal — ${ORG.division}`,
    `## ${ORG.product}`,
    "",
    `*${ORG.company} · ${ORG.author} · ${ORG.year}*`,
    `*License: ${ORG.license}. Book: ${ORG.bookLicense}. Marks: PEI™, Political Entropy Index™, Age Old™.*`,
    "",
  ];
  for (const s of PROPOSAL) {
    lines.push(`## ${s.heading}`, "");
    for (const p of s.paragraphs) lines.push(p, "");
  }
  lines.push("---", "", NOTICE_LINE, "");
  return lines.join("\n");
}

export const NOTICE_LINE =
  "© 2026 Andrew Eppler and Age Old LLC. Canonical Work. Age Old Research License 1.0. Not legal advice. Figures in the ask are a working proposal.";
