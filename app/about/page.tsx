import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Agies's Charm is a boutique clothing shop run by Agie — tops, skirts and dresses, and a person on the other end of the email.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[92rem] px-5 pt-10 pb-8 md:px-8 md:pt-14 lg:px-12">
      <div className="max-w-2xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.08] tracking-[0.015em] md:text-[3.2rem]">
          I started this because I was tired of returning things.
        </h1>
      </div>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-cream lg:sticky lg:top-28">
          <Image
            src="/images/atelier-rail.jpg"
            alt="A brass rail of dresses in camel, cream, terracotta and espresso in a sunlit workroom"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="space-y-5 text-[1.05rem] leading-[1.85] text-espresso-soft">
            <p>
              Everything used to arrive stiff, or scratchy, or two inches shorter than the photo
              suggested. So I started gathering the clothes I actually wanted to wear — things that
              drape well, feel lived-in, and stay comfortable all day.
            </p>
            <p>
              Agies&rsquo;s Charm is a proper shop now — tops, skirts and dresses, all chosen the
              same way. If I wouldn&rsquo;t wear it myself, it doesn&rsquo;t go up.
            </p>
            <p>
              I still open every parcel that comes back, so I know what didn&rsquo;t work. If
              you&rsquo;re stuck between two sizes, write to me and I&rsquo;ll tell you which one
              I&rsquo;d send.
            </p>
          </div>

          <p className="mt-10 font-serif text-[1.6rem] italic text-camel-deep">&mdash; Agie</p>

          <div className="mt-12 space-y-4 border-t border-line pt-10">
            <a
              href="mailto:hello@agiescharm.com"
              className="quiet-link block text-[1rem] text-terracotta"
            >
              hello@agiescharm.com
            </a>
            <p className="text-[0.95rem] leading-relaxed text-espresso-soft">
              Orders leave within two working days, wrapped in tissue. Free returns for fourteen
              days — try things on at home, in your own light.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-full bg-terracotta px-9 py-4 text-[0.8rem] tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-terracotta-deep"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
