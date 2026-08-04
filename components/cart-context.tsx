"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product, Size } from "@/lib/products";
import {
  addLine,
  getServerSnapshot,
  getSnapshot,
  removeLine,
  setLineQuantity,
  subscribe,
  type CartLine,
} from "@/lib/bag";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (product: Product, size: Size) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((product: Product, size: Size) => {
    addLine(product, size);
    setIsOpen(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.price * line.quantity, 0),
      isOpen,
      add,
      setQuantity: setLineQuantity,
      remove: removeLine,
      open,
      close,
    }),
    [lines, isOpen, add, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
