import type { Product, Size } from "./products";

export type CartLine = {
  /** slug + size, so the same dress in two sizes stays two lines. */
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  size: Size;
  image: string;
  quantity: number;
};

const STORAGE_KEY = "agies-charm-bag";

/** Stable reference so useSyncExternalStore doesn't loop on the server snapshot. */
const EMPTY: CartLine[] = [];

let snapshot: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    // A corrupt bag isn't worth breaking the page over.
    return EMPTY;
  }
}

function publish(next: CartLine[]) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing, full quota — the bag just won't survive a reload.
  }
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  snapshot = read();
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): CartLine[] {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

export function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

export function addLine(product: Product, size: Size) {
  const id = `${product.slug}-${size}`;
  const current = getSnapshot();
  const existing = current.find((line) => line.id === id);

  publish(
    existing
      ? current.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      : [
          ...current,
          {
            id,
            slug: product.slug,
            name: product.name,
            tagline: product.tagline,
            price: product.price,
            size,
            image: product.images[0].src,
            quantity: 1,
          },
        ],
  );
}

export function setLineQuantity(id: string, quantity: number) {
  const current = getSnapshot();
  publish(
    quantity < 1
      ? current.filter((line) => line.id !== id)
      : current.map((line) => (line.id === id ? { ...line, quantity } : line)),
  );
}

export function removeLine(id: string) {
  publish(getSnapshot().filter((line) => line.id !== id));
}
