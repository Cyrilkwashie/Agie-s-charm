"use client";

import { useRef, useState } from "react";
import { useCart } from "./cart-context";
import { SIZES, formatPrice, type Product, type Size } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [prompt, setPrompt] = useState(false);
  const sizesRef = useRef<HTMLDivElement>(null);

  function addToBag() {
    if (!size) {
      setPrompt(true);
      sizesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    add(product, size);
  }

  function chooseSize(next: Size) {
    setSize(next);
    setPrompt(false);
  }

  return (
    <>
      <div ref={sizesRef} className="mt-10 scroll-mt-28">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">Size</span>
          {prompt && (
            <span className="text-[0.78rem] text-terracotta">Pick a size to carry on</span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {SIZES.map((option) => {
            const available = product.inStock.includes(option);
            const selected = size === option;

            return (
              <button
                key={option}
                type="button"
                disabled={!available}
                onClick={() => chooseSize(option)}
                aria-pressed={selected}
                className={`h-12 min-w-[3.5rem] px-4 text-[0.85rem] tracking-[0.1em] transition-all duration-300 ${
                  selected
                    ? "bg-espresso text-ivory"
                    : available
                      ? "border border-line bg-transparent text-espresso hover:border-camel-deep"
                      : "cursor-not-allowed border border-line/60 text-espresso-soft/40 line-through"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[0.85rem] leading-relaxed text-espresso-soft">
          {product.fit}. Stuck between two?{" "}
          <a href="mailto:hello@agiescharm.com" className="quiet-link text-terracotta">
            Ask me
          </a>
          .
        </p>
      </div>

      <button
        type="button"
        onClick={addToBag}
        className="mt-8 hidden w-full rounded-full bg-terracotta py-4.5 text-[0.82rem] tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-terracotta-deep lg:block"
      >
        ADD TO BAG &middot; {formatPrice(product.price)}
      </button>

      {/* Sticky bar — mobile and tablet only */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[1.1rem] leading-tight">{product.name}</p>
            <p className="text-[0.78rem] text-espresso-soft">
              {formatPrice(product.price)}
              {size ? ` · Size ${size}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={addToBag}
            className="rounded-full bg-terracotta px-7 py-3.5 text-[0.76rem] tracking-[0.16em] text-ivory transition-colors duration-300 active:bg-terracotta-deep"
          >
            {size ? "ADD TO BAG" : "CHOOSE SIZE"}
          </button>
        </div>
      </div>
    </>
  );
}
