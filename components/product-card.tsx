import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  /** Sizes hint for next/image — pass the real rendered width per breakpoint. */
  sizes?: string;
  priority?: boolean;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  const soldOut = product.inStock.length === 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden bg-cream">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.03] ${
            secondary ? "group-hover:opacity-0" : ""
          } ${soldOut ? "opacity-75" : ""}`}
        />
        {secondary && (
          <Image
            src={secondary.src}
            alt=""
            fill
            sizes={sizes}
            aria-hidden="true"
            className="object-cover opacity-0 transition-opacity duration-[900ms] ease-out group-hover:opacity-100"
          />
        )}
        {soldOut && (
          <span className="absolute bottom-3 left-3 bg-ivory/90 px-3 py-2 text-[0.6rem] tracking-[0.2em] text-espresso uppercase">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-[1.15rem] leading-tight tracking-wide md:text-[1.3rem]">
          {product.name}
        </h3>
        <span className="text-[0.82rem] tabular-nums text-espresso-soft">
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-1.5 text-[0.68rem] tracking-[0.16em] text-espresso-soft/85 uppercase">
        {product.tagline}
        {product.badge === "new" && <span className="text-camel-deep"> &middot; Just in</span>}
      </p>
    </Link>
  );
}
