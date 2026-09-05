import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LESSONS, MODULES, lessonById } from "@/lib/pei/curriculum";
import { askInstructor, type ChatTurn } from "@/lib/pei/instructor";
import { INSTRUCTOR_LIMIT, usePeiStore } from "@/lib/pei/store";
import { FromChapter, OpenInstrument } from "./from-chapter";
import { LessonDiagramView } from "./lesson-diagram";

export function AcademyView() {
  const { academyLesson, setAcademyLesson, lessonDone, markLesson, setView, openChapter, bumpInstructor, instructorCalls } =
    usePeiStore();
  const lesson = lessonById(academyLesson);
  const idx = LESSONS.findIndex((l) => l.id === lesson.id);
  const [reveal, setReveal] = useState(false);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const remaining = Math.max(0, INSTRUCTOR_LIMIT - instructorCalls);

  useEffect(() => {
    setReveal(false);
    setChat([]);
    setQuestion("");
    setErr(null);
  }, [lesson.id]);

  async function send(text?: string) {
    const q = (text ?? question).trim();
    if (q.length < 4 || busy) return;
    if (!bumpInstructor()) {
      setErr("Instructor cap reached on this device.");
      return;
    }
    setBusy(true);
    setErr(null);
    const next = [...chat, { role: "user" as const, content: q }];
    setChat(next);
    setQuestion("");
    const res = await askInstructor({ data: { lessonId: lesson.id, question: q, history: next } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setChat([...next, { role: "assistant", content: res.text }]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_minmax(260px,320px)]">
      <aside className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">Academy</p>
        <h2 className="mt-1 font-display text-2xl">PEI curriculum</h2>
        <p className="mt-2 text-xs text-muted">
          Twelve lessons. The book is the text. The tabs are the labs. {lessonDone.length}/{LESSONS.length} complete.
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-elevated">
          <div className="h-full bg-accent" style={{ width: `${(lessonDone.length / LESSONS.length) * 100}%` }} />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {MODULES.map((m) => (
            <div key={m.id}>
              <p className="px-2 text-[11px] uppercase tracking-wider text-subtle">{m.title}</p>
              <ol className="mt-1 flex flex-col gap-0.5">
                {m.lessons.map((id) => {
                  const l = lessonById(id);
                  const on = l.id === lesson.id;
                  const done = lessonDone.includes(l.id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => setAcademyLesson(l.id)}
                        className={`flex w-full items-baseline gap-2 rounded-sm px-2 py-1.5 text-left text-xs ${
                          on ? "bg-elevated text-fg" : "text-muted hover:text-fg"
                        }`}
                      >
                        <span className="w-5 tabular-nums text-subtle">{l.n}</span>
                        <span className="flex-1 leading-snug">{l.title}</span>
                        {done ? <span className="text-ordered">Done</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </aside>

      <article className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          {lesson.module} · {lesson.minutes} min · Ch. {lesson.chapter}
        </p>
        <h2 className="mt-2 font-display text-3xl leading-tight">{lesson.title}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <FromChapter n={lesson.chapter} />
          <OpenInstrument view={lesson.lab.view} label={lesson.lab.label} />
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-subtle">Objectives</p>
          <ul className="mt-2 flex flex-col gap-2">
            {lesson.objectives.map((o) => (
              <li key={o} className="border-l border-border pl-3 text-sm">
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <LessonDiagramView kind={lesson.diagram} />
        </div>
        <div className="mt-6 flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted">
          {lesson.lecture.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="font-display text-2xl">Seminar</h3>
          <ol className="mt-3 flex flex-col gap-2">
            {lesson.seminar.map((q) => (
              <li key={q} className="text-sm">
                <button
                  type="button"
                  className="text-left text-muted hover:text-fg"
                  onClick={() => void send(q)}
                >
                  {q}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-2xl">Checks</h3>
            <Button variant="ghost" size="sm" onClick={() => setReveal((v) => !v)}>
              {reveal ? "Hide" : "Reveal"}
            </Button>
          </div>
          <ul className="mt-3 flex flex-col gap-3">
            {lesson.checks.map((c) => (
              <li key={c.q} className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm">{c.q}</p>
                {reveal ? <p className="mt-2 text-sm text-muted">{c.a}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex justify-between gap-3">
          <Button
            variant="ghost"
            disabled={idx <= 0}
            onClick={() => setAcademyLesson(LESSONS[idx - 1].id)}
          >
            Previous
          </Button>
          <Button variant="secondary" onClick={() => markLesson(lesson.id)}>
            Mark complete
          </Button>
          <Button
            variant="secondary"
            disabled={idx >= LESSONS.length - 1}
            onClick={() => {
              markLesson(lesson.id);
              setAcademyLesson(LESSONS[idx + 1].id);
            }}
          >
            Next lesson
          </Button>
        </div>
      </article>

      <aside className="flex flex-col gap-4">
        <Card className="flex min-h-80 flex-col p-4">
          <p className="text-xs uppercase tracking-wider text-subtle">Instructor</p>
          <p className="mt-1 text-sm text-muted">
            Bound to this lesson. Will not change the formula. {remaining} questions left on this device.
          </p>
          <div className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto">
            {chat.length === 0 ? (
              <p className="text-xs text-subtle">Ask a question, or tap a seminar prompt.</p>
            ) : (
              chat.map((m, i) => (
                <p key={`${m.role}-${i}`} className={`text-sm ${m.role === "user" ? "text-muted" : "text-fg"}`}>
                  <span className="text-[11px] uppercase tracking-wider text-subtle">
                    {m.role === "user" ? "You" : "Instructor"}
                  </span>
                  <span className="mt-1 block whitespace-pre-wrap">{m.content}</span>
                </p>
              ))
            )}
            {busy ? <p className="text-xs text-subtle">Thinking…</p> : null}
            {err ? <p className="text-xs text-critical">{err}</p> : null}
          </div>
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              maxLength={800}
              placeholder="Ask about this lesson"
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <Button type="submit" disabled={busy || remaining <= 0}>
              Ask
            </Button>
          </form>
        </Card>
        <button type="button" className="text-left text-xs text-muted hover:text-fg" onClick={() => setView("pitch")}>
          Age Old Research charter →
        </button>
        <button type="button" className="text-left text-xs text-muted hover:text-fg" onClick={() => openChapter(lesson.chapter)}>
          Read the chapter in the book →
        </button>
      </aside>
    </div>
  );
}
