import { type ReactNode, useEffect, useMemo, useState } from "react";

type Block =
  | { type: "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };


function inline(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) nodes.push(text.slice(last, idx));
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(
        <strong key={i++} className="font-medium text-fg">
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (tok.startsWith("*")) {
      nodes.push(
        <em key={i++} className="italic">
          {tok.slice(1, -1)}
        </em>,
      );
    } else if (tok.startsWith("`")) {
      nodes.push(
        <code key={i++} className="rounded-xs bg-elevated px-1 text-xs">
          {tok.slice(1, -1)}
        </code>,
      );
    } else {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (lm) {
        nodes.push(
          <a
            key={i++}
            href={lm[2]}
            className="underline decoration-border underline-offset-2 hover:text-fg"
            target={lm[2].startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {lm[1]}
          </a>,
        );
      }
    }
    last = idx + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const flushPara = (buf: string[]) => {
    const t = buf.join(" ").trim();
    if (t) blocks.push({ type: "p", text: t.length > 1600 ? `${t.slice(0, 1600)}…` : t });
    buf.length = 0;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }
    const hm = line.match(/^(#{2,4})\s+(.+)$/);
    if (hm) {
      const level = hm[1].length;
      const title = hm[2].replace(/\*+/g, "").trim();
      if (level === 2) blocks.push({ type: "h2", text: title });
      else if (level === 3) blocks.push({ type: "h3", text: title });
      else blocks.push({ type: "h4", text: title });
      i += 1;
      continue;
    }
    if (line.trim().startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", text: buf.join(" ").replace(/\s+/g, " ").trim() });
      continue;
    }
    if (line.trim().startsWith("|")) {
      const rows: string[][] = [];
      let skipped = 0;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) {
          if (rows.length < 13) rows.push(cells);
          else skipped += 1;
        }
        i += 1;
      }
      if (rows.length) {
        const headers = rows[0];
        const body = rows.slice(1);
        if (skipped) body.push(headers.map((_, n) => (n === 0 ? `… ${skipped} more rows in the download` : "")));
        blocks.push({ type: "table", headers, rows: body });
      }
      continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/.test(lines[i]) : /^\s*[-*]\s+/.test(lines[i]))) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
        i += 1;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      buf.push(lines[i].trim());
      i += 1;
    }
    flushPara(buf);
  }
  return blocks;
}

function BlockView({ b }: { b: Block }) {
  if (b.type === "h2") {
    return (
      <h3 className="mt-10 font-display text-2xl leading-tight">
        {inline(b.text)}
      </h3>
    );
  }
  if (b.type === "h3") {
    return (
      <h4 className="mt-8 font-display text-xl leading-tight">
        {inline(b.text)}
      </h4>
    );
  }
  if (b.type === "h4") {
    return (
      <p className="mt-6 text-sm font-medium uppercase tracking-wider text-subtle">
        {inline(b.text)}
      </p>
    );
  }
  if (b.type === "quote") {
    return (
      <blockquote className="my-6 border-l border-accent/40 pl-4">
        <p className="font-display text-lg leading-snug italic">{inline(b.text)}</p>
      </blockquote>
    );
  }
  if (b.type === "ul" || b.type === "ol") {
    const Tag = b.type;
    return (
      <Tag className={`my-4 flex flex-col gap-2 ${b.type === "ol" ? "list-decimal" : "list-disc"} pl-5`}>
        {b.items.map((item, j) => (
          <li key={j} className="text-muted">
            {inline(item)}
          </li>
        ))}
      </Tag>
    );
  }
  if (b.type === "table") {
    const extra = b.rows.length > 12 ? b.rows.length - 12 : 0;
    const rows = extra ? b.rows.slice(0, 12) : b.rows;
    return (
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-subtle">
            <tr>
              {b.headers.map((h) => (
                <th key={h} className="border-b border-border py-2 pr-3 font-medium">
                  {inline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-border/60">
                {row.map((c, k) => (
                  <td key={k} className="py-2 pr-3 text-muted">
                    {inline(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {extra ? <p className="mt-2 text-xs text-subtle">{extra} more rows in the manuscript download.</p> : null}
      </div>
    );
  }
  if (b.type === "hr") {
    return <hr className="my-8 border-border" />;
  }
  if (b.type === "p") {
    return <p className="mt-4 text-pretty text-muted">{inline(b.text)}</p>;
  }
  return null;
}

export function ManuscriptBody({ markdown }: { markdown: string }) {
  const passages = useMemo(() => {
    const parts = markdown.split(/(?=^#{2,3} )/m).filter((p) => p.trim().length > 30);
    const out: string[] = [];
    for (const part of parts) {
      if (part.length <= 12000) {
        out.push(part);
        continue;
      }
      const sub = part.split(/(?=^#{4} )/m).filter((p) => p.trim());
      if (sub.length > 1) {
        out.push(...sub.map((s) => (s.length > 12000 ? s.slice(0, 12000) : s)));
      } else {
        for (let i = 0; i < part.length; i += 8000) out.push(part.slice(i, i + 8000));
      }
    }
    return out.length ? out : [markdown.slice(0, 8000)];
  }, [markdown]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [markdown]);

  const safe = Math.min(idx, passages.length - 1);
  const blocks = useMemo(() => parseBlocks(passages[safe] ?? ""), [passages, safe]);
  const title = (passages[safe] ?? "").split("\n", 1)[0].replace(/^#+\s+/, "").replace(/\*+/g, "").trim();

  return (
    <div className="mt-8 max-w-2xl text-base leading-relaxed text-fg">
      {passages.length > 1 ? (
        <div className="mb-6 rounded-lg border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wider text-subtle">
            Passage {safe + 1} of {passages.length}
            {title ? ` · ${title}` : ""}
          </p>
          <div className="mt-3 flex justify-between gap-2">
            <button
              type="button"
              disabled={safe <= 0}
              onClick={() => setIdx((n) => Math.max(0, n - 1))}
              className="h-10 rounded-sm px-3 text-xs text-muted hover:text-fg disabled:opacity-40"
            >
              Previous passage
            </button>
            <button
              type="button"
              disabled={safe >= passages.length - 1}
              onClick={() => setIdx((n) => Math.min(passages.length - 1, n + 1))}
              className="h-10 rounded-sm px-3 text-xs text-muted hover:text-fg disabled:opacity-40"
            >
              Next passage
            </button>
          </div>
        </div>
      ) : null}
      {blocks.map((b, i) => (
        <BlockView key={`${safe}-${i}-${b.type}`} b={b} />
      ))}
    </div>
  );
}
