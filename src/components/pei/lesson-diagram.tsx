import type { LessonDiagram } from "@/lib/pei/curriculum";

export function LessonDiagramView({ kind }: { kind: LessonDiagram }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <svg viewBox="0 0 560 220" className="h-auto w-full text-fg" role="img">
        {kind === "laws" ? <Laws /> : null}
        {kind === "engine" ? <Engine /> : null}
        {kind === "weights" ? <Weights /> : null}
        {kind === "signals" ? <Signals /> : null}
        {kind === "epoch" ? <Epoch /> : null}
        {kind === "pathways" ? <Pathways /> : null}
        {kind === "paradox" ? <Pathways /> : null}
        {kind === "monitor" ? <Monitor /> : null}
        {kind === "scenario" ? <Scenario /> : null}
        {kind === "audit" ? <Weights /> : null}
        {kind === "imperative" ? <Imperative /> : null}
        {kind === "action" ? <Imperative /> : null}
      </svg>
    </div>
  );
}

function Laws() {
  const items = [
    ["0", "Equilibrium"],
    ["1", "Conservation"],
    ["2", "Entropy rises"],
    ["3", "No absolute zero"],
  ];
  return (
    <g>
      <text x="20" y="28" className="fill-current" fontSize="14" fontFamily="serif">
        Four laws
      </text>
      {items.map((it, i) => (
        <g key={it[0]} transform={`translate(${20 + i * 135}, 60)`}>
          <rect width="120" height="120" rx="10" fill="none" stroke="currentColor" opacity="0.35" />
          <text x="16" y="36" fontSize="22" fontFamily="serif" className="fill-current">
            {it[0]}
          </text>
          <text x="16" y="68" fontSize="12" className="fill-current" opacity="0.75">
            {it[1]}
          </text>
        </g>
      ))}
    </g>
  );
}

function Engine() {
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Open engine
      </text>
      <rect x="180" y="70" width="200" height="90" rx="12" fill="none" stroke="currentColor" />
      <text x="210" y="122" fontSize="13" className="fill-current">
        Institutions (sink)
      </text>
      <path d="M40 115 H175" stroke="currentColor" fill="none" markerEnd="url(#a)" />
      <text x="40" y="100" fontSize="11" className="fill-current" opacity="0.7">
        Energy in
      </text>
      <path d="M385 115 H520" stroke="currentColor" fill="none" />
      <text x="400" y="100" fontSize="11" className="fill-current" opacity="0.7">
        Entropy out
      </text>
      <path d="M500 130 C 430 210, 130 210, 70 130" stroke="currentColor" fill="none" opacity="0.5" />
      <text x="210" y="200" fontSize="11" className="fill-current" opacity="0.7">
        Return current
      </text>
    </g>
  );
}

function Weights() {
  const w = [
    ["Ineq", 25],
    ["Inst", 20],
    ["Conf", 20],
    ["Enrg", 15],
    ["Info", 10],
    ["Env", 10],
  ] as const;
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Locked weights
      </text>
      {w.map((d, i) => {
        const h = d[1] * 3.2;
        const x = 40 + i * 85;
        return (
          <g key={d[0]}>
            <rect x={x} y={190 - h} width="54" height={h} rx="4" fill="currentColor" opacity="0.35" />
            <text x={x} y="208" fontSize="11" className="fill-current">
              {d[0]}
            </text>
            <text x={x + 8} y={180 - h} fontSize="11" className="fill-current">
              {d[1]}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Signals() {
  const s = ["Narratives", "Energy", "Sclerosis", "Runaway", "Dissipation"];
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Five signals
      </text>
      {s.map((name, i) => (
        <g key={name} transform={`translate(20, ${55 + i * 30})`}>
          <circle cx="8" cy="0" r="4" fill="currentColor" />
          <text x="24" y="4" fontSize="13" className="fill-current">
            {i + 1}. {name}
          </text>
        </g>
      ))}
    </g>
  );
}

function Epoch() {
  const pts = [
    [40, 120],
    [120, 90],
    [180, 40],
    [250, 70],
    [330, 85],
    [410, 100],
    [500, 48],
  ];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        1876 — 2026
      </text>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="36" y="200" fontSize="11" className="fill-current" opacity="0.7">
        1914
      </text>
      <text x="168" y="28" fontSize="11" className="fill-current" opacity="0.7">
        1945
      </text>
      <text x="470" y="36" fontSize="11" className="fill-current" opacity="0.7">
        now
      </text>
    </g>
  );
}

function Pathways() {
  const p = [
    ["Reform", "60–80"],
    ["Revolution", "80–95"],
    ["Collapse", "90–100"],
    ["Transform", "70–90"],
  ];
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Four pathways
      </text>
      {p.map((it, i) => (
        <g key={it[0]} transform={`translate(${20 + (i % 2) * 270}, ${55 + Math.floor(i / 2) * 75})`}>
          <rect width="250" height="60" rx="10" fill="none" stroke="currentColor" opacity="0.35" />
          <text x="16" y="28" fontSize="14" fontFamily="serif" className="fill-current">
            {it[0]}
          </text>
          <text x="16" y="46" fontSize="11" className="fill-current" opacity="0.7">
            PEI {it[1]}
          </text>
        </g>
      ))}
    </g>
  );
}

function Monitor() {
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Operate, do not fork
      </text>
      {["Board", "Alerts", "Scenarios", "Audit", "Adapters"].map((n, i) => (
        <g key={n} transform={`translate(${20 + i * 108}, 80)`}>
          <rect width="96" height="72" rx="10" fill="none" stroke="currentColor" opacity="0.4" />
          <text x="12" y="42" fontSize="12" className="fill-current">
            {n}
          </text>
        </g>
      ))}
    </g>
  );
}

function Scenario() {
  return (
    <g>
      <text x="20" y="28" fontSize="14" fontFamily="serif" className="fill-current">
        Energy transfer
      </text>
      <circle cx="150" cy="120" r="46" fill="none" stroke="currentColor" />
      <circle cx="410" cy="120" r="46" fill="none" stroke="currentColor" />
      <path d="M200 120 H360" stroke="currentColor" />
      <text x="128" y="126" fontSize="12" className="fill-current">
        Core
      </text>
      <text x="378" y="126" fontSize="12" className="fill-current">
        Rising
      </text>
      <text x="230" y="108" fontSize="11" className="fill-current" opacity="0.7">
        friction = PEI
      </text>
    </g>
  );
}

function Imperative() {
  const t = ["Order needs energy", "Disorder is default", "Transitions jump"];
  return (
    <g>
      {t.map((s, i) => (
        <g key={s} transform={`translate(20, ${40 + i * 55})`}>
          <text x="0" y="0" fontSize="22" fontFamily="serif" className="fill-current">
            {s}
          </text>
        </g>
      ))}
    </g>
  );
}
