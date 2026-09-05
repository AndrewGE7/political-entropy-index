import type { DimId } from "./types";

export type ScoreBand = { range: string; entropy: string; examples: string };

export const WORKSHEET_GUIDES: Record<
  DimId,
  { definition: string; note?: string; bands: ScoreBand[]; indicators: string[] }
> = {
  inequality: {
    definition: "Dispersion of income and wealth. Higher score = more entropy.",
    bands: [
      { range: "0–20", entropy: "Very low", examples: "Nordic compression; postwar U.S. 1950s" },
      { range: "21–40", entropy: "Low", examples: "Most developed democracies" },
      { range: "41–60", entropy: "Moderate", examples: "Mixed and emerging economies" },
      { range: "61–80", entropy: "High", examples: "Late-empire skew, many developing systems" },
      { range: "81–100", entropy: "Extreme", examples: "Failed-state or feudal distributions" },
    ],
    indicators: ["Gini", "Wealth shares", "Income quintile ratios", "Historical economic records"],
  },
  institutions: {
    definition: "Scored as instability (entropy), not as a stability trophy. The paper worksheet inverts Polity-style scores; this toolkit already stores entropy.",
    note: "Paper form: high stability → invert. Here: 0 is durable constraint, 100 is succession crisis.",
    bands: [
      { range: "0–20", entropy: "Durable order", examples: "Long constrained democracies" },
      { range: "21–40", entropy: "Mostly stable", examples: "Stable democracies and some autocracies" },
      { range: "41–60", entropy: "Mixed", examples: "Developing democracies, brittle autocracies" },
      { range: "61–80", entropy: "Weak", examples: "Captured courts, succession fights" },
      { range: "81–100", entropy: "Failure", examples: "Failed states, revolutionary periods" },
    ],
    indicators: ["Tenure without rupture", "Trust", "Rule of law", "Bureaucracy", "Peaceful succession", "Corruption"],
  },
  conflict: {
    definition: "Organized violence, militarized disputes, internal unrest. Higher = more entropy.",
    bands: [
      { range: "0–20", entropy: "Quiet", examples: "Switzerland, Iceland, postwar Western Europe" },
      { range: "21–40", entropy: "Low", examples: "Most developed states" },
      { range: "41–60", entropy: "Disputes", examples: "Unrest or border friction" },
      { range: "61–80", entropy: "High", examples: "Active internal conflict" },
      { range: "81–100", entropy: "War", examples: "Civil or major interstate war" },
    ],
    indicators: ["Armed conflicts", "Political fatalities", "Terror", "Military burden", "Displacement", "Borders"],
  },
  energy: {
    definition: "Scored as insecurity. Exporters with buffers sit low; import shocks and grid fragility sit high.",
    note: "Paper form scores energy security then inverts. Here you score insecurity directly.",
    bands: [
      { range: "0–20", entropy: "Secure", examples: "Diverse, buffered, often producer states" },
      { range: "21–40", entropy: "Mostly secure", examples: "Some diversity, manageable imports" },
      { range: "41–60", entropy: "Exposed", examples: "Dependence without adequate buffers" },
      { range: "61–80", entropy: "Fragile", examples: "Heavy import dependence" },
      { range: "81–100", entropy: "Starved", examples: "Chronic shortage or single-source trap" },
    ],
    indicators: ["Import share", "Source diversity", "Renewables", "Grid resilience", "Disruption risk", "Price stability"],
  },
  information: {
    definition: "Scored as entropy: censorship, capture, fragmentation. Open shared facts sit low.",
    note: "Paper form scores press freedom then inverts.",
    bands: [
      { range: "0–20", entropy: "Open", examples: "Free press and open internet" },
      { range: "21–40", entropy: "Mostly open", examples: "Democracies with some friction" },
      { range: "41–60", entropy: "Mixed", examples: "Significant restrictions" },
      { range: "61–80", entropy: "Captured", examples: "Heavy censorship" },
      { range: "81–100", entropy: "Closed", examples: "Near-total information control" },
    ],
    indicators: ["Press freedom", "Internet openness", "Academic freedom", "Transparency", "Censorship", "Misinfo load"],
  },
  environment: {
    definition: "Unbudgeted biophysical load. Higher = more entropy.",
    note: "Paper form sometimes scores environmental quality then inverts. Here you score stress.",
    bands: [
      { range: "0–20", entropy: "Light load", examples: "Strong protections, low acute stress" },
      { range: "21–40", entropy: "Managed", examples: "Developed systems with remaining debt" },
      { range: "41–60", entropy: "Growing", examples: "Industrializing stress" },
      { range: "61–80", entropy: "Severe", examples: "Degraded air, water, land" },
      { range: "81–100", entropy: "Collapse load", examples: "Environmental crisis as politics" },
    ],
    indicators: ["Air and water", "Forests", "Biodiversity", "Emissions", "Resource depletion", "Climate vulnerability"],
  },
};

export const PHASE_RISK = [
  { range: "ΔPEI > +15", label: "High risk", detail: "Rapid deterioration. Treat as a phase-risk alert, not noise." },
  { range: "ΔPEI +8 to +14", label: "Watch", detail: "Entropy rising. Look for the dimension that is actually moving." },
  { range: "ΔPEI −7 to +7", label: "Stable", detail: "Near equilibrium on this window." },
  { range: "ΔPEI < −7", label: "Improving", detail: "Order is being recapitalized." },
];
