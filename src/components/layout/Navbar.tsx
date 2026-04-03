"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME",         href: "/" },
  { label: "MENU",         href: "/menu" },
  { label: "ABOUT",        href: "/about" },
  { label: "RESERVATIONS", href: "/reservations" },
  { label: "EVENTS",       href: "/events" },
  { label: "GALLERY",      href: "/gallery" },
  { label: "BLOG",         href: "/blog" },
  { label: "CONTACT",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        height: "64px",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(5, 8, 16, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "1.4rem",
          letterSpacing: "0.04em",
          color: "#C4D4F0",
          textDecoration: "none",
        }}
      >
        Rao&apos;s
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              color: "#9BA8C4",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#E8EEFF")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#9BA8C4")
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
