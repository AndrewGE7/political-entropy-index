import { createServerFn } from "@tanstack/react-start";

const MAX_BYTES = 512_000;

function allowedUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = u.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host.endsWith(".local")) {
    return null;
  }
  if (/^(10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) return null;
  return u.toString();
}

export const fetchAdapterPayload = createServerFn({ method: "POST" })
  .validator((input: { url: string }) => input)
  .handler(async ({ data }) => {
    const url = allowedUrl(data.url.trim());
    if (!url) return { ok: false as const, error: "URL is not allowed" };
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) return { ok: false as const, error: `Fetch ${res.status}` };
      const buf = await res.arrayBuffer();
      if (buf.byteLength > MAX_BYTES) return { ok: false as const, error: "Payload too large" };
      const text = new TextDecoder().decode(buf);
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Fetch failed" };
    }
  });
