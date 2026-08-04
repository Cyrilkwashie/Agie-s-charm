"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductGrid } from "./product-grid";
import {
  categories,
  onTheRail,
  shopResultsLine,
  type CategorySlug,
  type Product,
} from "@/lib/products";

const filters: { label: string; value: CategorySlug | "all" }[] = [
  { label: "Everything", value: "all" },
  ...categories.map((category) => ({
    label: category.label,
    value: category.slug as CategorySlug | "all",
  })),
];

export function ShopCatalog({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: CategorySlug | null;
}) {
  const [active, setActive] = useState<CategorySlug | "all">(initialCategory ?? "all");

  const visible = useMemo(() => {
    const rail = onTheRail(products);
    if (active === "all") return rail;
    return rail.filter((product) => product.category === active);
  }, [active, products]);

  const activeCategory = categories.find((category) => category.slug === active);

  return (
    <div>
      <div className="rounded-sm bg-cream/70 px-4 py-5 md:px-6 md:py-6">
        <p className="text-[0.72rem] tracking-[0.2em] text-espresso-soft uppercase">
          Filter by
        </p>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-0.5 md:flex-wrap md:overflow-visible">
          {filters.map((filter) => {
            const selected = active === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActive(filter.value)}
                className={`h-10 shrink-0 rounded-full px-5 text-[0.78rem] tracking-[0.12em] transition-all duration-300 ${
                  selected
                    ? "bg-espresso text-ivory shadow-[0_8px_24px_-12px_rgba(58,46,38,0.45)]"
                    : "border border-line/80 bg-ivory/80 text-espresso-soft hover:border-camel-deep hover:text-espresso"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 border-b border-line/80 pb-7">
        <p className="font-serif text-[1.35rem] leading-snug text-espresso md:text-[1.55rem]">
          {shopResultsLine(visible.length, active)}
        </p>
        {activeCategory && visible.length > 0 && (
          <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-espresso-soft">
            {activeCategory.blurb}
          </p>
        )}
      </div>

      <div className="mt-12 md:mt-14">
        {visible.length > 0 ? (
          <ProductGrid products={visible} wide />
        ) : (
          <div className="rounded-sm bg-cream/50 px-6 py-16 text-center md:py-20">
            <p className="font-serif text-[1.7rem] leading-snug text-espresso">
              Nothing here just now.
            </p>
            <p className="mx-auto mt-3 max-w-sm text-[0.95rem] leading-relaxed text-espresso-soft">
              The rail changes often. Browse everything else, or write to me if you had your heart
              set on something.
            </p>
            <button
              type="button"
              onClick={() => setActive("all")}
              className="mt-6 rounded-full border border-espresso/20 px-8 py-3.5 text-[0.78rem] tracking-[0.16em] text-espresso transition-colors hover:border-terracotta hover:text-terracotta"
            >
              SEE EVERYTHING
            </button>
          </div>
        )}
      </div>

      <div className="mt-20 rounded-sm border border-line/70 bg-cream/40 px-6 py-8 text-center md:px-10 md:py-10">
        <p className="font-serif text-[1.35rem] italic text-camel-deep">
          Stuck between two sizes?
        </p>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-espresso-soft">
          Write to me and I&rsquo;ll tell you which one I&rsquo;d send. No algorithms — just someone
          who knows how the clothes fit.
        </p>
        <Link
          href="/about"
          className="quiet-link mt-5 inline-block text-[0.85rem] tracking-[0.1em] text-terracotta"
        >
          Say hello
        </Link>
      </div>
    </div>
  );
}
