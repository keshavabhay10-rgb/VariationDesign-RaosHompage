import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-bg-primary text-text-primary">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
