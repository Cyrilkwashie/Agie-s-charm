"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = overlay
    ? "quiet-link text-[0.82rem] tracking-[0.08em] text-ivory/85 transition-colors hover:text-ivory"
    : "quiet-link text-[0.82rem] tracking-[0.08em] text-espresso-soft transition-colors hover:text-espresso";

  const iconClass = overlay
    ? "text-ivory"
    : "text-espresso";

  return (
    <header
      className={`top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
        isHome ? "fixed" : "sticky"
      } ${
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line/70 bg-ivory/90 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 md:h-20 md:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`-ml-2 flex h-11 w-11 items-center justify-center md:hidden ${iconClass}`}
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`absolute left-1/2 -translate-x-1/2 font-serif text-[1.35rem] leading-none tracking-[0.13em] md:static md:left-auto md:translate-x-0 md:text-[1.6rem] ${
            overlay ? "text-ivory" : "text-espresso"
          }`}
        >
          Agies&rsquo;s Charm
        </Link>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={open}
            className={`-mr-2 flex h-11 items-center gap-2 px-2 text-[0.82rem] tracking-[0.08em] ${
              overlay
                ? "text-ivory/85 hover:text-ivory"
                : "text-espresso-soft hover:text-espresso"
            }`}
          >
            <span className="hidden sm:inline">Bag</span>
            <BagIcon />
            <span className="tabular-nums">({count})</span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          menuOpen
            ? "max-h-40 border-t border-line/70 bg-ivory/95 opacity-100 backdrop-blur-md"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line/60 py-4 font-serif text-xl tracking-wide text-espresso last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 20 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className="h-[19px] w-[19px] sm:hidden"
      aria-hidden="true"
    >
      <path d="M1.6 6.5h16.8l-1.1 14H2.7L1.6 6.5Z" />
      <path d="M6.7 8.6V5.3a3.3 3.3 0 0 1 6.6 0v3.3" />
    </svg>
  );
}
