import Link from "next/link";
import { contact } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line bg-cream/60 md:mt-40">
      <div className="mx-auto max-w-[92rem] px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-[1.8rem] leading-none tracking-[0.12em]">
              Agies&rsquo;s Charm
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-espresso-soft">
              Tops, skirts and dresses — chosen carefully and sent wrapped in tissue by someone
              who will remember your name.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[0.85rem] text-espresso-soft md:items-end">
            <Link href="/" className="quiet-link w-fit hover:text-espresso">
              Home
            </Link>
            <Link href="/shop" className="quiet-link w-fit hover:text-espresso">
              Shop
            </Link>
            <Link href="/about" className="quiet-link w-fit hover:text-espresso">
              About
            </Link>
            <a
              href={contact.snapUrl}
              className="quiet-link w-fit hover:text-espresso"
              rel="noreferrer noopener"
              target="_blank"
            >
              Snap: {contact.snap}
            </a>
            <a href={contact.phoneUrl} className="quiet-link w-fit hover:text-espresso">
              {contact.phone}
            </a>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-[0.72rem] tracking-[0.14em] text-espresso-soft/80 uppercase">
          &copy; {new Date().getFullYear()} Agies&rsquo;s Charm &middot; Made with care
        </p>
      </div>
    </footer>
  );
}
