# Political Entropy Index

**Age Old LLC · Age Old Research**

Digital companion to *The Thermodynamics of Political Entropy* by Andrew Eppler.
The book is the argument. This application is the instrument.

> Source-available Canonical Work. Researchers may run it, cite it, and
> connect datasets. Nobody except Age Old LLC may alter the book, the
> formula, or the app.

**Canonical repository:** [github.com/AndrewGE7/political-entropy-index](https://github.com/AndrewGE7/political-entropy-index)

## What this is

- **Monitor** — live six-dimension PEI board (World Bank overlays on four channels)
- **Book** — manuscript reader, Chapters 0–25
- **Academy** — instructor-led curriculum with diagrams, labs, and chat
- **Research lab** — Adapter Manifests for live or static series
- **Pitch** — deck and investor proposal for the research division

PEI = `0.25·inequality + 0.20·institutions + 0.20·conflict + 0.15·energy + 0.10·information + 0.10·environment`.
Weights and phase bands (40 / 60 / 75 / 90) are locked.

## License and marks

- Software and Canonical Work: [Age Old Research License 1.0](./LICENSE)
- Manuscript text: CC BY-NC-ND 4.0
- Trademarks: [TRADEMARKS.md](./TRADEMARKS.md)
- How the tool grows: [CONTRIBUTING.md](./CONTRIBUTING.md) and `public/adapters/schema.json`

This is **not** OSI open source. Forks are not official PEI. GitHub’s
fork button is a technical feature; it does not grant copyright permission
to modify or rebrand the Canonical Work.

## Run locally

```bash
npm install
npm run dev
```

Auth and a shared database are off. Scores and adapters persist in the
browser. Optional: set `XAI_API_KEY` for the Academy instructor.

## Citation

See `CITATION.cff`. Short form:

Eppler, A. (2026). *The Thermodynamics of Political Entropy*. Age Old LLC.
Political Entropy Index (PEI) digital companion, v17.

## Owner

Copyright © 2026 Andrew Eppler and Age Old LLC.
Sole editor of the Canonical Work: Andrew Eppler (`@AndrewGE7`).
USPTO filing of the marks in `TRADEMARKS.md` is a separate owner action.
