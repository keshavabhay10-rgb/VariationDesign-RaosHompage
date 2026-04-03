import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ui",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rao's Bar & Restaurant | Indian Fusion Dalston, London",
  description:
    "Where tradition meets modern flavours. Premium Indian fusion dining & cocktail bar in Dalston, Hackney. Locally sourced, sustainably crafted.",
  keywords: [
    "Indian restaurant Dalston",
    "best Indian Hackney",
    "Indian fusion London",
    "cocktail bar Dalston",
    "private dining Hackney",
  ],
  openGraph: {
    title: "Rao's Bar & Restaurant | Indian Fusion Dalston",
    description:
      "Premium Indian fusion dining & cocktail bar in Dalston, London.",
    url: "https://raoslondon.co.uk",
    siteName: "Rao's Bar & Restaurant",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${dmSans.variable}`}>
      <body className="font-body bg-bg-primary text-text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
