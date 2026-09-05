import { DIMENSIONS } from "@/lib/pei/dimensions";
import type { DimId, DimScores } from "@/lib/pei/types";

export function ScoreSlider({
  id,
  value,
  onChange,
}: {
  id: DimId;
  value: number;
  onChange: (id: DimId, n: number) => void;
}) {
  const dim = DIMENSIONS.find((d) => d.id === id);
  if (!dim) return null;
  return (
    <label className="block">
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span>
          {dim.label}
          <span className="ml-2 text-xs text-subtle">{Math.round(dim.weight * 100)}%</span>
        </span>
        <span className="tabular-nums text-muted">{value.toFixed(0)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(id, Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-elevated accent-[var(--color-accent)]"
      />
    </label>
  );
}

export function ScoreSliders({
  scores,
  onChange,
}: {
  scores: DimScores;
  onChange: (id: DimId, n: number) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {DIMENSIONS.map((d) => (
        <ScoreSlider key={d.id} id={d.id} value={scores[d.id]} onChange={onChange} />
      ))}
    </div>
  );
}
