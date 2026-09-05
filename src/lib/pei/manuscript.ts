export type ManuscriptChapter = {
  id: string;
  n: number;
  title: string;
  part: string;
  status: "complete" | "outline";
  markdown: string;
};

export type ManuscriptIndexItem = {
  id: string;
  n: number;
  title: string;
  part: string;
  status: "complete" | "outline";
  headings: string[];
  excerpt: string;
  chars: number;
};

export type SearchHit = {
  n: number;
  title: string;
  heading: string;
  snippet: string;
};

type ChapterFile = ManuscriptChapter & { parts?: number };

function fileFor(n: number) {
  if (n === 0) return "/book/front.json";
  return `/book/ch-${String(n).padStart(2, "0")}.json`;
}

function partPrefix(n: number) {
  if (n === 0) return "front";
  return `ch-${String(n).padStart(2, "0")}`;
}

const chapterCache = new Map<number, Promise<ManuscriptChapter | null>>();

export function loadChapter(n: number): Promise<ManuscriptChapter | null> {
  if (n < 0 || n > 16) return Promise.resolve(null);
  const hit = chapterCache.get(n);
  if (hit) return hit;
  const p = fetch(fileFor(n))
    .then(async (r) => {
      if (!r.ok) return null;
      const j = (await r.json()) as ChapterFile;
      if (j.markdown && j.markdown.length > 0) return j;
      const count = j.parts ?? 0;
      if (count <= 0) return j;
      const prefix = partPrefix(n);
      const texts = await Promise.all(
        Array.from({ length: count }, (_, i) =>
          fetch(`/book/${prefix}-p${i + 1}.md`).then((x) => (x.ok ? x.text() : "")),
        ),
      );
      return { ...j, markdown: texts.join("") };
    })
    .catch(() => null);
  chapterCache.set(n, p);
  return p;
}

let indexPromise: Promise<ManuscriptIndexItem[]> | null = null;
export function loadIndex(): Promise<ManuscriptIndexItem[]> {
  if (!indexPromise) {
    indexPromise = fetch("/book/index.json")
      .then((r) => r.json())
      .then((j: { index: ManuscriptIndexItem[] }) => j.index)
      .catch(() => []);
  }
  return indexPromise;
}

let searchPromise: Promise<SearchHit[]> | null = null;
export function loadSearch(): Promise<SearchHit[]> {
  if (!searchPromise) {
    searchPromise = fetch("/book/search.json")
      .then(async (r) => {
        if (r.ok) {
          const j = (await r.json()) as { entries: SearchHit[] };
          return j.entries;
        }
        const [a, b] = await Promise.all([
          fetch("/book/search-a.json").then((x) => (x.ok ? x.json() : { entries: [] })),
          fetch("/book/search-b.json").then((x) => (x.ok ? x.json() : { entries: [] })),
        ]);
        return [...(a.entries ?? []), ...(b.entries ?? [])] as SearchHit[];
      })
      .catch(() => []);
  }
  return searchPromise;
}

export function hasManuscript(n: number) {
  return n >= 0 && n <= 16;
}
