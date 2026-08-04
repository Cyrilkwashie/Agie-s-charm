"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductGrid } from "./product-grid";
import { contact } from "@/lib/contact";
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
      <div className="grid grid-cols-2 border border-line sm:flex sm:flex-wrap sm:border-0">
        {filters.map((filter, index) => {
          const selected = active === filter.value;
          const isLeftCol = index % 2 === 0;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              className={`min-h-11 border-b border-line px-2 py-3 text-[0.68rem] tracking-[0.1em] transition-colors duration-300 sm:min-h-12 sm:border-0 sm:border-b-2 sm:px-5 sm:py-3.5 sm:text-[0.78rem] sm:tracking-[0.12em] ${
                isLeftCol ? "border-r sm:border-r-0" : ""
              } ${
                index >= filters.length - (filters.length % 2 || 2)
                  ? "border-b-0 sm:border-b-2"
                  : ""
              } ${
                selected
                  ? "bg-espresso/[0.04] text-espresso sm:border-b-espresso sm:bg-transparent"
                  : "text-espresso-soft hover:text-espresso sm:border-b-transparent"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
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
              The rail changes often. Browse everything else, or message me if you had your heart
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

      <div className="mt-20 border-t border-line pt-10 text-center md:pt-12">
        <p className="font-serif text-[1.35rem] italic text-camel-deep">
          Stuck between two sizes?
        </p>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-espresso-soft">
          Snap or call me — I&rsquo;ll tell you which one I&rsquo;d send.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 text-[0.88rem] tracking-[0.06em]">
          <a
            href={contact.snapUrl}
            className="quiet-link text-terracotta"
            rel="noreferrer noopener"
            target="_blank"
          >
            Snap: {contact.snap}
          </a>
          <a href={contact.phoneUrl} className="quiet-link text-terracotta">
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
