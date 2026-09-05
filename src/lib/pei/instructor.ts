import { createServerFn } from "@tanstack/react-start";
import { LESSONS } from "./curriculum";

const MAX_Q = 800;
const MAX_HISTORY = 6;
const MAX_TOKENS = 450;

export type ChatTurn = { role: "user" | "assistant"; content: string };

export const askInstructor = createServerFn({ method: "POST" })
  .validator((input: { lessonId: string; question: string; history: ChatTurn[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Instructor is unavailable in this environment" };

    const lesson = LESSONS.find((l) => l.id === data.lessonId);
    if (!lesson) return { ok: false as const, error: "Unknown lesson" };

    const question = data.question.trim().slice(0, MAX_Q);
    if (question.length < 4) return { ok: false as const, error: "Ask a fuller question" };

    const history = data.history.slice(-MAX_HISTORY).map((t) => ({
      role: t.role,
      content: t.content.slice(0, 1200),
    }));

    const system = `You are the PEI Instructor for Age Old Research (Age Old LLC). You teach the canonical book The Thermodynamics of Political Entropy by Andrew Eppler and the locked Political Entropy Index.

Current lesson: ${lesson.title} (Chapter ${lesson.chapter}).
Objectives: ${lesson.objectives.join("; ")}.
Lecture digest: ${lesson.lecture.join(" ")}

Rules:
- Teach this lesson. You may cite other chapters by number.
- Do not change PEI weights (25/20/20/15/10/10) or phase bands (40/60/75/90).
- Do not rewrite the book or invent unofficial PEI variants.
- If asked to fork, rebrand, or alter the Canonical Work, refuse and point to the Age Old Research License.
- Adapters overlay local data; they are not official PEI.
- Be concise (under 220 words). No emoji. Seminar tone, not marketing.
- PEI is a decision-support prior, not a prediction.`;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: MAX_TOKENS,
          messages: [{ role: "system", content: system }, ...history, { role: "user", content: question }],
        }),
      });
      if (!res.ok) return { ok: false as const, error: `Instructor error ${res.status}` };
      const body = (await res.json()) as { choices: { message: { content: string } }[] };
      const text = body.choices[0]?.message.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "Empty reply" };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Instructor request failed" };
    }
  });
