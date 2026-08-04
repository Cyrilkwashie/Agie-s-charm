import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductGrid } from "@/components/product-grid";
import { categories, mostLoved, newIn, products } from "@/lib/products";

const trust = [
  {
    title: "Thoughtfully made",
    body: "Chosen for how they feel on the body — not just how they look in a photo.",
  },
  {
    title: "Honest fit notes",
    body: "Every piece has real measurements and a note on how it sits. Stuck between sizes? Write to me.",
  },
  {
    title: "Fourteen free days",
    body: "Try it on at home with your own shoes and light. Returns are free within two weeks.",
  },
];

export default function HomePage() {
  const justIn = newIn(4);
  const loved = mostLoved(4);
  const shopPreview = products.filter((p) => p.inStock.length > 0).slice(0, 12);

  return (
    <>
      {/* Hero — one full screen; scroll to reveal the shop below */}
      <section className="relative h-dvh w-full">
        <div className="relative h-full w-full overflow-hidden bg-cream">
          <Image
            src="/images/atelier-rail.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/45 via-espresso/5 to-espresso/15" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:px-8 lg:px-12">
            <div className="mx-auto max-w-[92rem]">
              <Link
                href="/shop"
                className="inline-block rounded-full bg-terracotta px-9 py-4 text-[0.8rem] tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-terracotta-deep"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="pt-16 md:pt-24">
        <div className="mx-auto max-w-[92rem] px-5 md:px-8 lg:px-12">
          <div className="flex items-end justify-between border-b border-line pb-6">
            <h2 className="font-serif text-[1.8rem] tracking-[0.02em] md:text-[2.2rem]">
              Shop by category
            </h2>
            <Link
              href="/shop"
              className="quiet-link hidden text-[0.78rem] tracking-[0.14em] text-espresso-soft uppercase sm:inline-block"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-cream">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-[1.35rem] tracking-wide">{category.label}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-espresso-soft">
                    {category.blurb}
                  </p>
                  <p className="mt-2 text-[0.72rem] tracking-[0.12em] text-camel-deep uppercase">
                    Shop {category.label.toLowerCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Just in */}
      {justIn.length > 0 && (
        <section className="pt-24 md:pt-32">
          <div className="mx-auto max-w-[92rem] px-5 md:px-8 lg:px-12">
            <div className="flex items-end justify-between border-b border-line pb-6">
              <h2 className="font-serif text-[1.8rem] tracking-[0.02em] md:text-[2.2rem]">
                Just in
              </h2>
              <Link
                href="/shop"
                className="quiet-link text-[0.78rem] tracking-[0.14em] text-espresso-soft uppercase"
              >
                Shop new
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8">
              {justIn.map((product, index) => (
                <ProductCard key={product.slug} product={product} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Collection preview */}
      <section className="pt-24 md:pt-32">
        <div className="mx-auto max-w-[92rem] px-5 md:px-8 lg:px-12">
          <div className="flex flex-col gap-3 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-[1.8rem] leading-none tracking-[0.02em] md:text-[2.2rem]">
                A little of what&rsquo;s on the rail
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-espresso-soft">
                New things land often. Here&rsquo;s a taste — the full shop has plenty more.
              </p>
            </div>
            <Link
              href="/shop"
              className="quiet-link w-fit text-[0.78rem] tracking-[0.14em] text-terracotta uppercase"
            >
              See the full shop
            </Link>
          </div>

          <div className="mt-12 md:mt-14">
            <ProductGrid products={shopPreview} wide />
          </div>

          <div className="mt-14 text-center md:mt-16">
            <Link
              href="/shop"
              className="inline-block rounded-full border border-espresso/25 px-10 py-4 text-[0.8rem] tracking-[0.2em] text-espresso transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
            >
              SEE THE FULL SHOP
            </Link>
          </div>
        </div>
      </section>

      {/* Most loved — quiet second rail */}
      {loved.length > 0 && (
        <section className="pt-24 md:pt-32">
          <div className="mx-auto max-w-[92rem] px-5 md:px-8 lg:px-12">
            <h2 className="border-b border-line pb-6 font-serif text-[1.8rem] tracking-[0.02em] md:text-[2.2rem]">
              Most loved
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8">
              {loved.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Slim trust strip — not a long about */}
      <section className="pt-24 md:pt-32">
        <div className="mx-auto max-w-[92rem] px-5 md:px-8 lg:px-12">
          <div className="grid border-t border-line md:grid-cols-3">
            {trust.map((item, index) => (
              <div
                key={item.title}
                className="border-b border-line py-9 md:border-b-0 md:border-l md:px-9 md:py-11 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-serif text-[1.4rem] text-camel-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-[1.3rem] leading-snug">{item.title}</h3>
                <p className="mt-3 max-w-[24rem] text-[0.93rem] leading-[1.75] text-espresso-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
