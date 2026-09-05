#!/usr/bin/env python3
"""Extract the manuscript into public/book/ for the PEI toolkit reader."""
from __future__ import annotations

import json
import re
from pathlib import Path

SRC = Path("/tmp/pei/pei/the-thermodynamics-of-political-entropy (5).md")
OUT = Path("/workspace/public/book")
OUT.mkdir(parents=True, exist_ok=True)

EMOJI = re.compile(
    r"[\U0001F300-\U0001FAFF\U00002700-\U000027BF\U00002600-\U000026FF"
    r"\U0001F1E0-\U0001F1FF\u2705\U0001F4CB\U0001F4D6\U0001F4DD\U0001F4DA\U0001F30D\U0001F9F1\U0001F52C\U0001F4CA\U0001F50D\U0001F6E0\U0001F52E\U0001F3AF\U0001F4CC\U0001F4A1\U0001F3A8\U0001F4C1\U0001F527\U0001F4E6\U0001F680\U0001F389]+"
)


def clean(md: str) -> str:
    md = re.sub(r"<div[^>]*>\s*</div>", "", md)
    md = re.sub(r'<div style="page-break-after: always;"></div>', "", md)
    md = re.sub(r"\n\*Continue to [^*]+\*\n", "\n", md)
    md = re.sub(r"\[([^\]]+)\]\(/canvases/[^)]+\)", r"\1", md)
    md = re.sub(r"^#+\s*$", "", md, flags=re.M)
    md = EMOJI.sub("", md)
    md = re.sub(r"[ \t]+\n", "\n", md)
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()


def headings(md: str) -> list[str]:
    out = []
    for m in re.finditer(r"^(#{2,4})\s+(.+)$", md, re.M):
        title = re.sub(r"\*+", "", m.group(2)).strip()
        title = re.sub(r"^Chapter \d+:\s*", "", title)
        if title and title not in out and not title.startswith("Part "):
            out.append(title)
    return out[:40]


def excerpt(md: str, n: int = 320) -> str:
    text = re.sub(r"^#.+$", "", md, flags=re.M)
    text = re.sub(r"[>*`|_\[\]]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return (text[: n - 1] + "\u2026") if len(text) > n else text


raw = SRC.read_text(encoding="utf-8")
start = raw.find("# Introduction: Why Political Systems Obey Thermodynamics")
if start < 0:
    raise SystemExit("introduction not found")
body = raw[start:]

# Front matter lives before the introduction.
front = raw[:start]
# Keep dedication through acknowledgments, drop the duplicated TOC.
front_keep = []
capture = False
for line in front.splitlines():
    if line.startswith("## ") and any(
        k in line for k in ("Publication Information", "Dedication", "Epigraph", "Foreword", "Preface")
    ):
        capture = True
    if capture:
        if line.startswith("## ") and "Table of Contents" in line:
            break
        front_keep.append(line)
front_md = clean("\n".join(front_keep))

parts = re.split(r"\n(?=## (?:\u2705 )?Chapter \d+:)", body)
intro = clean(parts[0])
chapters: list[dict] = []

chapters.append(
    {
        "id": "front",
        "n": 0,
        "title": "Front matter & introduction",
        "part": "Front matter",
        "status": "complete",
        "markdown": (front_md + "\n\n---\n\n" + intro).strip(),
    }
)

for part in parts[1:]:
    first = part.split("\n", 1)[0]
    m = re.match(r"## (?:\u2705 )?Chapter (\d+):\s*(.+)$", first)
    if not m:
        continue
    n = int(m.group(1))
    title = EMOJI.sub("", m.group(2)).strip()
    md = part
    if n == 16:
        cut = re.search(r"\n### Appendix|\n## \U0001F4DA Bibliography|\n## Bibliography", md)
        if cut:
            md = md[: cut.start()]
    md = clean(md)
    # Drop trailing empty "Key Takeaways / Discussion / Further Reading" husks if no body under them
    md = re.sub(
        r"\n### (?:Key Takeaways|Discussion Questions|Further Reading)\s*(?=\n### |\n## |\Z)",
        "",
        md,
    )
    chapters.append(
        {
            "id": f"ch-{n:02d}",
            "n": n,
            "title": title,
            "part": (
                "I \u00b7 Foundations"
                if n <= 3
                else "II \u00b7 Framework"
                if n <= 10
                else "III \u00b7 History"
                if n <= 15
                else "IV \u00b7 Cases"
                if n <= 19
                else "V \u00b7 Toolkit"
                if n <= 23
                else "Conclusion"
            ),
            "status": "complete" if len(md) > 4000 else "outline",
            "markdown": md,
        }
    )

# Search index
index = []
search = []
for ch in chapters:
    hs = headings(ch["markdown"])
    index.append(
        {
            "id": ch["id"],
            "n": ch["n"],
            "title": ch["title"],
            "part": ch["part"],
            "status": ch["status"],
            "headings": hs,
            "excerpt": excerpt(ch["markdown"]),
            "chars": len(ch["markdown"]),
        }
    )
    # Section-level snippets
    sections = re.split(r"\n(?=### )", ch["markdown"])
    for sec in sections:
        hm = re.match(r"### (.+)", sec)
        heading = hm.group(1).strip() if hm else ch["title"]
        snip = excerpt(sec, 220)
        if len(snip) < 40:
            continue
        search.append({"n": ch["n"], "title": ch["title"], "heading": heading, "snippet": snip})

for ch in chapters:
    (OUT / f"{ch['id']}.json").write_text(json.dumps(ch, ensure_ascii=False), encoding="utf-8")
(OUT / "index.json").write_text(json.dumps({"index": index}, ensure_ascii=False), encoding="utf-8")
(OUT / "search.json").write_text(json.dumps({"entries": search}, ensure_ascii=False), encoding="utf-8")

# Readable combined markdown for download (intro + 1–16)
combined = ["# The Thermodynamics of Political Entropy\n"]
for ch in chapters:
    combined.append(ch["markdown"])
    combined.append("\n\n---\n")
(OUT / "manuscript.md").write_text("\n".join(combined), encoding="utf-8")

print("chapters", [(c["n"], c["status"], len(c["markdown"])) for c in chapters])
print("index", len(index), "search", len(search))
print("md kb", (OUT / "manuscript.md").stat().st_size // 1024)
print("files", sorted(p.name for p in OUT.iterdir()))
