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

function fileFor(n: number) {
  if (n === 0) return "/book/front.json";
  return `/book/ch-${String(n).padStart(2, "0")}.json`;
}

const chapterCache = new Map<number, Promise<ManuscriptChapter | null>>();

export function loadChapter(n: number): Promise<ManuscriptChapter | null> {
  if (n < 0 || n > 16) return Promise.resolve(null);
  const hit = chapterCache.get(n);
  if (hit) return hit;
  const p = fetch(fileFor(n))
    .then((r) => (r.ok ? (r.json() as Promise<ManuscriptChapter>) : null))
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
      .then((r) => r.json())
      .then((j: { entries: SearchHit[] }) => j.entries)
      .catch(() => []);
  }
  return searchPromise;
}

export function hasManuscript(n: number) {
  return n >= 0 && n <= 16;
}
