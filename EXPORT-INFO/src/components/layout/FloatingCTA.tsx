"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const menuSection = document.getElementById("menu");
      const footer = document.querySelector("footer");

      const menuTop = menuSection ? menuSection.offsetTop - viewH : 999999;
      const footerTop = footer ? footer.offsetTop - viewH : 999999;

      setVisible(scrollY > menuTop && scrollY < footerTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://www.opentable.co.uk/r/raos-bar-and-restaurant-london"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-[90] bg-gold text-bg-primary font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center gap-2.5 transition-all duration-500 ease-out
        bottom-8 left-1/2 -translate-x-1/2 py-3.5 px-9 rounded-full shadow-[0_4px_30px_rgba(201,150,59,0.35)]
        hover:shadow-[0_8px_40px_rgba(201,150,59,0.5)]
        ${visible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-24"}
      `}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <path d="M19 4H5a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V6a2 2 0 00-2-2z" />
      </svg>
      Book a Table
    </a>
  );
}
