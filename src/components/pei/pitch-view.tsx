import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MARKS, ORG } from "@/lib/pei/legal";
import { NOTICE_LINE, PROPOSAL, SLIDES, proposalMarkdown } from "@/lib/pei/pitch";
import { usePeiStore } from "@/lib/pei/store";

export function PitchView() {
  const { pitchSlide, setPitchSlide, setView } = usePeiStore();
  const i = Math.min(SLIDES.length - 1, Math.max(0, pitchSlide));
  const slide = SLIDES[i];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setPitchSlide(Math.min(SLIDES.length - 1, i + 1));
      if (e.key === "ArrowLeft") setPitchSlide(Math.max(0, i - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, setPitchSlide]);

  function downloadProposal() {
    const blob = new Blob([proposalMarkdown()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "age-old-research-investor-proposal.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{ORG.company} · {ORG.division}</p>
        <h2 className="mt-2 font-display text-3xl">Pitch and proposal</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Deck for partners. Long-form proposal underneath. Figures in the ask are a working
          proposal, not a priced round.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={downloadProposal}>
            Download proposal
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setView("research")}>
            Research lab
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setView("academy")}>
            Academy
          </Button>
        </div>
      </div>

      <Card className="min-h-[22rem] p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          {i + 1} / {SLIDES.length} · {slide.kicker}
        </p>
        <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{slide.title}</h3>
        <ul className="mt-6 flex max-w-2xl flex-col gap-3">
          {slide.body.map((p) => (
            <li key={p.slice(0, 40)} className="text-sm leading-relaxed text-muted sm:text-base">
              {p}
            </li>
          ))}
        </ul>
        {slide.note ? <p className="mt-6 text-xs text-subtle">{slide.note}</p> : null}
        <div className="mt-8 flex justify-between gap-3">
          <Button variant="ghost" disabled={i <= 0} onClick={() => setPitchSlide(i - 1)}>
            Previous
          </Button>
          <Button variant="secondary" disabled={i >= SLIDES.length - 1} onClick={() => setPitchSlide(i + 1)}>
            Next
          </Button>
        </div>
      </Card>

      <div className="flex flex-wrap gap-1">
        {SLIDES.map((s, n) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setPitchSlide(n)}
            className={`h-2 flex-1 rounded-full ${n === i ? "bg-accent" : "bg-elevated"}`}
            aria-label={`Slide ${n + 1}`}
          />
        ))}
      </div>

      <section>
        <h3 className="font-display text-2xl">Investor proposal</h3>
        <div className="mt-6 flex flex-col gap-8">
          {PROPOSAL.map((s) => (
            <div key={s.heading} className="max-w-2xl">
              <h4 className="font-display text-xl">{s.heading}</h4>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 50)} className="mt-3 text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl">Marks</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {MARKS.map((m) => (
            <li key={m} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-xs text-subtle">{NOTICE_LINE}</p>
      </section>
    </div>
  );
}
