"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    const SCROLL_UP_THRESHOLD = 5;
    const MOUSE_ZONE = 8;
    const HIDE_DELAY = 300;
    const MIN_SCROLL = 50;

    let lastY = window.scrollY;
    let hidden = false;
    let mouseAtTop = false;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let ticking = false;

    function show() {
      if (!hidden) return;
      hidden = false;
      setNavHidden(false);
    }

    function hide() {
      if (hidden) return;
      hidden = true;
      setNavHidden(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > MIN_SCROLL);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < MIN_SCROLL) {
          show();
        } else if (delta > 0 && !hidden && !mouseAtTop) {
          hide();
        } else if (delta < -SCROLL_UP_THRESHOLD && hidden) {
          show();
        }
        lastY = y;
        ticking = false;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= MOUSE_ZONE) {
        mouseAtTop = true;
        if (hideTimer) clearTimeout(hideTimer);
        if (hidden) show();
      } else if (mouseAtTop) {
        mouseAtTop = false;
        hideTimer = setTimeout(() => {
          if (!mouseAtTop && window.scrollY > MIN_SCROLL) hide();
        }, HIDE_DELAY);
      }
    };

    const nav = document.querySelector("nav");
    const handleMouseEnter = () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
    const handleMouseLeave = () => {
      if (window.scrollY > MIN_SCROLL && !mouseAtTop) {
        hideTimer = setTimeout(hide, HIDE_DELAY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    if (nav) {
      nav.addEventListener("mouseenter", handleMouseEnter);
      nav.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (nav) {
        nav.removeEventListener("mouseenter", handleMouseEnter);
        nav.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-[350ms] ${
          navHidden ? "nav-hidden" : "nav-visible"
        } ${
          scrolled
            ? "bg-bg-primary/92 backdrop-blur-[20px] py-3 px-8 border-b border-gold/15"
            : "py-5 px-8"
        }`}
      >
        <Link href="/" className="font-display text-2xl font-semibold text-gold tracking-wide">
          Rao&apos;s
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-body text-[0.8rem] font-medium tracking-[0.12em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300 nav-link-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden relative z-[200] w-7 h-5 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-[2px] bg-text-primary absolute left-0 transition-all duration-300 ${
              menuOpen ? "top-[9px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-text-primary absolute left-0 top-[9px] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-text-primary absolute left-0 transition-all duration-300 ${
              menuOpen ? "top-[9px] -rotate-45" : "top-[18px]"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[150] bg-bg-primary/97 backdrop-blur-[30px] flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-3xl text-text-primary hover:text-gold transition-colors tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
