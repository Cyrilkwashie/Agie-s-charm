import { ProductCard } from "./product-card";
import type { Product } from "@/lib/products";

/** Straightforward and scannable — for browsing the whole rail. */
export function ProductGrid({
  products,
  wide = false,
}: {
  products: Product[];
  /** Four across on large screens instead of three. */
  wide?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 md:gap-x-8 md:gap-y-14 ${
        wide ? "xl:grid-cols-4" : ""
      }`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
