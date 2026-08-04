import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import {
  formatPrice,
  getProduct,
  getRelated,
  productDetails,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.story[0],
    openGraph: {
      title: `${product.name} — Agies's Charm`,
      description: product.story[0],
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const details = productDetails(product);
  const soldOut = product.inStock.length === 0;

  return (
    <div className="pb-28 lg:pb-0">
      <div className="mx-auto max-w-[92rem] px-5 pt-6 md:px-8 lg:px-12">
        <Link
          href="/shop"
          className="quiet-link text-[0.72rem] tracking-[0.16em] text-espresso-soft uppercase"
        >
          &larr; Back to shop
        </Link>
      </div>

      <article className="mx-auto mt-6 max-w-[92rem] lg:grid lg:grid-cols-[1fr_25rem] lg:items-start lg:gap-16 lg:px-12 xl:grid-cols-[1fr_27rem] xl:gap-24">
        {/* Gallery: a peeking swipe rail on mobile, a stacked column on desktop */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:px-8 lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {product.images.map((image, index) => (
            <div
              key={image.src}
              className="relative aspect-3/4 w-[86%] shrink-0 snap-center overflow-hidden bg-cream lg:w-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 60vw, 86vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="px-5 pt-10 md:px-8 lg:sticky lg:top-28 lg:px-0 lg:pt-0">
          <h1 className="font-serif text-[2.4rem] leading-[1.08] tracking-[0.015em] md:text-[3rem] lg:text-[2.8rem]">
            {product.name}
          </h1>
          <p className="mt-3 text-[0.72rem] tracking-[0.18em] text-espresso-soft uppercase">
            {product.tagline} &middot; {product.colour}
          </p>
          <p className="mt-6 font-serif text-[1.6rem] tabular-nums">
            {formatPrice(product.price)}
          </p>

          <div className="mt-8 space-y-4 text-[1rem] leading-[1.8] text-espresso-soft">
            {product.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {soldOut ? (
            <p className="mt-10 border-t border-line pt-6 text-[0.95rem] text-espresso-soft">
              Every size has gone. Write to me and I&rsquo;ll let you know if it comes back.
            </p>
          ) : (
            <ProductPurchase product={product} />
          )}

          <dl className="mt-12 border-t border-line">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex gap-6 border-b border-line/70 py-4 last:border-0"
              >
                <dt className="w-[5.5rem] shrink-0 text-[0.72rem] tracking-[0.14em] text-espresso-soft uppercase">
                  {detail.label}
                </dt>
                <dd className="text-[0.93rem] leading-relaxed text-espresso">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[0.85rem] leading-relaxed text-espresso-soft">
            Wrapped in tissue and posted within two working days. Free returns for fourteen days.
          </p>
        </div>
      </article>

      <section className="mx-auto mt-28 max-w-[92rem] px-5 md:mt-36 md:px-8 lg:px-12">
        <h2 className="border-b border-line pb-6 font-serif text-[1.7rem] tracking-[0.02em] md:text-[2.1rem]">
          You might also love
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-x-8">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
