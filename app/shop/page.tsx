import type { Metadata } from "next";
import { ShopCatalog } from "@/components/shop-catalog";
import { categories, onTheRail, products, type CategorySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Agies's Charm — tops, skirts and dresses, chosen with care.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory = categories.some((item) => item.slug === category)
    ? (category as CategorySlug)
    : null;

  const railCount = onTheRail(products).length;

  return (
    <div className="mx-auto max-w-[92rem] px-5 pt-10 pb-16 md:px-8 md:pt-14 lg:px-12">
      <div className="max-w-2xl">
        <p className="eyebrow">The shop</p>
        <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.06] tracking-[0.015em] md:text-[3.4rem]">
          Come in, have a look around.
        </h1>
        {railCount > 0 && (
          <p className="mt-6 text-[1.05rem] leading-[1.8] text-espresso-soft md:text-[1.1rem]">
            {railCount === 1
              ? "One piece on the rail right now."
              : `${railCount} pieces on the rail — take your time.`}
          </p>
        )}
      </div>

      <div className="mt-14 md:mt-16">
        <ShopCatalog products={products} initialCategory={initialCategory} />
      </div>
    </div>
  );
}
