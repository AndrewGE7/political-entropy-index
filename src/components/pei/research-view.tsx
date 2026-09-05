import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ADAPTER_PRESETS, parseCsv, type ResearchAdapter } from "@/lib/pei/adapters";
import { fetchAdapterPayload } from "@/lib/pei/fetch-adapter";
import { DIMENSIONS } from "@/lib/pei/dimensions";
import { LICENSE_PILLARS, ORG } from "@/lib/pei/legal";
import { usePeiStore } from "@/lib/pei/store";
import type { DimId } from "@/lib/pei/types";
import { FromChapter } from "./from-chapter";

export function ResearchView() {
  const { adapters, addAdapter, removeAdapter, toggleAdapter, canonicalOnly, setCanonicalOnly, refresh, loading } =
    usePeiStore();
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState<DimId>("conflict");
  const [kind, setKind] = useState<ResearchAdapter["kind"]>("csv");
  const [invert, setInvert] = useState(false);
  const [blend, setBlend] = useState(0.4);
  const [indicator, setIndicator] = useState("");
  const [url, setUrl] = useState("");
  const [csv, setCsv] = useState("code,value\nUS,40\nCN,45\n");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function uid() {
    return `ad-${Date.now().toString(36)}`;
  }

  async function onAdd() {
    setErr(null);
    const base: ResearchAdapter = {
      id: uid(),
      name: name.trim() || "Untitled adapter",
      kind,
      dimension,
      enabled: true,
      invert,
      blend,
      indicator: indicator.trim() || undefined,
      url: url.trim() || undefined,
      csv: kind === "csv" ? csv : undefined,
    };
    if (kind === "json") {
      if (!url.trim()) {
        setErr("JSON adapters need a URL.");
        return;
      }
      setBusy(true);
      const res = await fetchAdapterPayload({ data: { url: url.trim() } });
      setBusy(false);
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      try {
        const parsed = JSON.parse(res.text) as { rows?: { code: string; value: number }[] } | { code: string; value: number }[];
        const rows = Array.isArray(parsed) ? parsed : parsed.rows;
        if (!rows?.length) {
          setErr("JSON must be { rows: [{ code, value }] } or an array of those.");
          return;
        }
        base.rows = rows.slice(0, 400);
      } catch {
        setErr("Payload was not JSON.");
        return;
      }
    }
    if (kind === "csv") {
      const rows = parseCsv(csv);
      if (!rows.length) {
        setErr("CSV needs code,value rows.");
        return;
      }
      base.rows = rows;
    }
    if (kind === "worldbank" && !indicator.trim()) {
      setErr("World Bank adapters need an indicator code.");
      return;
    }
    addAdapter(base);
    setName("");
    void refresh(false);
  }

  function addPreset(p: (typeof ADAPTER_PRESETS)[number]) {
    addAdapter({
      id: uid(),
      enabled: true,
      ...p,
    });
    void refresh(true);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{ORG.division}</p>
        <h2 className="mt-2 font-display text-3xl">Research lab</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Connect live or static series without editing PEI. Adapters overlay locally. Weights, phase
          bands, the manuscript, and this UI stay Canonical Work of {ORG.company}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FromChapter n={20} />
          <FromChapter n={4} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {LICENSE_PILLARS.map((p) => (
          <Card key={p.title} className="p-4">
            <p className="font-medium">{p.title}</p>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={canonicalOnly}
            onChange={(e) => setCanonicalOnly(e.target.checked)}
          />
          Canonical only — ignore local adapters
        </label>
        <Button variant="secondary" size="sm" disabled={loading} onClick={() => void refresh(true)}>
          Recompute overlays
        </Button>
        <a href="/adapters/schema.json" className="text-xs text-muted hover:text-fg" download>
          Download schema
        </a>
        <a href="/legal/LICENSE.txt" className="text-xs text-muted hover:text-fg" download>
          License
        </a>
      </div>

      <section>
        <h3 className="font-display text-2xl">Presets</h3>
        <p className="mt-1 text-sm text-muted">
          World Bank indicators the desk can attach. Gini, stability, energy, and PM2.5 already sit
          in the canonical live overlay.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ADAPTER_PRESETS.map((p) => (
            <li key={p.name} className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface p-3">
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-subtle">
                  {p.dimension}
                  {p.indicator ? ` · ${p.indicator}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted">{p.note}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => addPreset(p)}>
                Add
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl">Active adapters</h3>
        {adapters.length === 0 ? (
          <p className="mt-2 text-sm text-muted">None. Canonical live overlay only.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {adapters.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                <div>
                  <p className="text-sm">
                    {a.name}{" "}
                    <Badge className="ml-1">{a.enabled ? "on" : "off"}</Badge>
                  </p>
                  <p className="text-xs text-subtle">
                    {a.kind} · {a.dimension}
                    {a.invert ? " · invert" : ""} · blend {Math.round(a.blend * 100)}%
                    {a.rows ? ` · ${a.rows.length} rows` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toggleAdapter(a.id);
                      void refresh(false);
                    }}
                  >
                    {a.enabled ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      removeAdapter(a.id);
                      void refresh(false);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-display text-2xl">New adapter</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Dimension</span>
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value as DimId)}
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            >
              {DIMENSIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Kind</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as ResearchAdapter["kind"])}
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            >
              <option value="csv">CSV paste</option>
              <option value="json">JSON URL</option>
              <option value="worldbank">World Bank indicator</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Blend into dimension</span>
            <input
              type="number"
              min={0.1}
              max={0.8}
              step={0.05}
              value={blend}
              onChange={(e) => setBlend(Number(e.target.value))}
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
          Invert (high source value = low entropy)
        </label>
        {kind === "worldbank" ? (
          <label className="mt-3 block text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">Indicator</span>
            <input
              value={indicator}
              onChange={(e) => setIndicator(e.target.value)}
              placeholder="SI.POV.GINI"
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
        ) : null}
        {kind === "json" ? (
          <label className="mt-3 block text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">HTTPS JSON URL</span>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
              className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
        ) : null}
        {kind === "csv" ? (
          <label className="mt-3 block text-sm">
            <span className="text-xs uppercase tracking-wider text-subtle">CSV</span>
            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs"
            />
          </label>
        ) : null}
        {err ? <p className="mt-2 text-sm text-critical">{err}</p> : null}
        <Button className="mt-4" disabled={busy} onClick={() => void onAdd()}>
          {busy ? "Fetching…" : "Add overlay"}
        </Button>
      </section>
    </div>
  );
}
