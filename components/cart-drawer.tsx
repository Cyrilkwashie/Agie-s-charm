"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { lines, subtotal, count, isOpen, close, setQuantity, remove } = useCart();
  const [checkoutNote, setCheckoutNote] = useState(false);

  const dismiss = useCallback(() => {
    setCheckoutNote(false);
    close();
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, dismiss]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={dismiss}
        className={`absolute inset-0 bg-espresso/25 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col bg-ivory shadow-[-24px_0_60px_-40px_rgba(58,46,38,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-baseline justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl tracking-wide">
            Your bag{" "}
            <span className="font-sans text-[0.7rem] tracking-[0.2em] text-espresso-soft">
              ({count})
            </span>
          </h2>
          <button
            type="button"
            onClick={dismiss}
            className="quiet-link text-[0.78rem] tracking-[0.14em] text-espresso-soft"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="font-serif text-[1.6rem] leading-snug text-espresso">
              Nothing in here yet.
            </p>
            <p className="max-w-[22rem] text-[0.95rem] leading-relaxed text-espresso-soft">
              Have a wander through the shop — tops, skirts and dresses waiting for you.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className="quiet-link mt-1 text-[0.82rem] tracking-[0.14em] text-terracotta"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line/70 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <Link
                    href={`/shop/${line.slug}`}
                    onClick={close}
                    className="relative h-[7.5rem] w-[5.5rem] shrink-0 overflow-hidden bg-cream"
                  >
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/shop/${line.slug}`}
                        onClick={close}
                        className="font-serif text-[1.15rem] leading-tight"
                      >
                        {line.name}
                      </Link>
                      <span className="text-[0.85rem] tabular-nums text-espresso-soft">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.78rem] tracking-[0.06em] text-espresso-soft">
                      {line.tagline} · Size {line.size}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label={`Remove one ${line.name}`}
                          className="flex h-9 w-9 items-center justify-center text-espresso-soft transition-colors hover:text-espresso"
                        >
                          &minus;
                        </button>
                        <span className="w-7 text-center text-[0.85rem] tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label={`Add one ${line.name}`}
                          className="flex h-9 w-9 items-center justify-center text-espresso-soft transition-colors hover:text-espresso"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="quiet-link text-[0.72rem] tracking-[0.14em] text-espresso-soft"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-serif text-[1.5rem] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-espresso-soft">
                Shipping and any duties are worked out at checkout. Returns are free within
                fourteen days.
              </p>
              <button
                type="button"
                onClick={() => setCheckoutNote(true)}
                className="mt-5 w-full rounded-full bg-terracotta py-4 text-[0.82rem] tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-terracotta-deep"
              >
                CHECKOUT
              </button>
              {checkoutNote && (
                <p className="mt-3 text-center text-[0.78rem] leading-relaxed text-espresso-soft">
                  Payments aren&rsquo;t switched on yet — your bag is saved and waiting.
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
