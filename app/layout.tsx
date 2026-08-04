import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agiescharm.com"),
  title: {
    default: "Agies's Charm — tops, skirts & dresses",
    template: "%s — Agies's Charm",
  },
  description:
    "A boutique clothing shop — tops, skirts and dresses, chosen with care by Agie.",
  openGraph: {
    title: "Agies's Charm — tops, skirts & dresses",
    description:
      "A boutique clothing shop — tops, skirts and dresses, chosen with care by Agie.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="min-h-dvh">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
