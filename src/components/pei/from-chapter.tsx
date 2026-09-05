import { CHAPTERS } from "@/lib/pei/book";
import { usePeiStore, type AppView } from "@/lib/pei/store";

export function FromChapter({ n, className = "" }: { n: number; className?: string }) {
  const openChapter = usePeiStore((s) => s.openChapter);
  const ch = CHAPTERS.find((c) => c.n === n);
  if (!ch) return null;
  return (
    <button
      type="button"
      onClick={() => openChapter(n)}
      className={`inline-flex h-10 items-center rounded-full border border-border px-3 text-xs text-muted hover:border-accent/40 hover:text-fg ${className}`}
    >
      Read Ch. {n} · {ch.title}
    </button>
  );
}

export function OpenInstrument({
  view,
  label,
}: {
  view: AppView;
  label: string;
}) {
  const setView = usePeiStore((s) => s.setView);
  return (
    <button
      type="button"
      onClick={() => setView(view)}
      className="inline-flex h-10 items-center rounded-full border border-border bg-elevated px-3 text-xs text-fg hover:border-accent/40"
    >
      {label}
    </button>
  );
}
