"use client";

import { useState, useEffect } from "react";

interface SoundToggleProps {
  visible: boolean;
  active: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ visible, active, onToggle }: SoundToggleProps) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (visible && !active) {
      const timer = setTimeout(() => setShowPrompt(true), 500);
      const hide = setTimeout(() => setShowPrompt(false), 3500);
      return () => { clearTimeout(timer); clearTimeout(hide); };
    }
  }, [visible, active]);

  return (
    <>
      <button
        onClick={() => { onToggle(); setShowPrompt(false); }}
        className={`fixed bottom-8 right-8 z-[90] w-11 h-11 rounded-full bg-bg-card/80 border backdrop-blur-[10px] flex items-center justify-center cursor-pointer transition-all duration-300
          ${visible ? "opacity-100 visible" : "opacity-0 invisible"}
          ${active ? "border-gold" : "border-gold/30 hover:border-gold hover:bg-bg-card/95"}
        `}
        aria-label={active ? "Mute sound" : "Enable sound"}
      >
        {active ? (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-gold">
            <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-text-secondary">
            <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
          </svg>
        )}
      </button>

      <div
        className={`fixed bottom-20 right-4 z-[90] text-[0.7rem] text-text-secondary tracking-[0.08em] uppercase whitespace-nowrap transition-opacity duration-500
          ${showPrompt && visible ? "opacity-100" : "opacity-0"}
        `}
      >
        Turn on sound for the full experience
      </div>
    </>
  );
}
