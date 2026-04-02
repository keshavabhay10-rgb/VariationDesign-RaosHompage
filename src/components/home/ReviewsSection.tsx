"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const sectionRef    = useRef<HTMLDivElement>(null);
  const plateRef      = useRef<HTMLDivElement>(null);
  const textLeftRef   = useRef<HTMLDivElement>(null);
  const textRightRef  = useRef<HTMLDivElement>(null);
  const steamRef      = useRef<HTMLDivElement>(null);
  const specsLeftRef  = useRef<HTMLDivElement>(null);
  const specsRightRef = useRef<HTMLDivElement>(null);
  const audioRef      = useRef<HTMLAudioElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundVisible, setSoundVisible] = useState(false);

  // Build GSAP timeline once on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const plate     = plateRef.current;
    const textLeft  = textLeftRef.current;
    const textRight = textRightRef.current;
    const steam     = steamRef.current;
    const specsL    = specsLeftRef.current;
    const specsR    = specsRightRef.current;
    const container = containerRef.current;
    const section   = sectionRef.current;
    const audio     = audioRef.current;

    if (!plate || !container || !section) return;

    if (audio) audio.volume = 0.4;

    // Initial states
    gsap.set(plate, { y: "100vh" });
    gsap.set(specsL, { opacity: 0, y: 20 });
    gsap.set(specsR, { opacity: 0, y: 20 });

    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: section,
          pinSpacing: false,
          onEnter: () => {
            setSoundVisible(true);
            if (soundEnabled && audio) audio.play().catch(() => {});
          },
          onLeave:     () => { if (audio) audio.pause(); },
          onEnterBack: () => { if (soundEnabled && audio) audio.play().catch(() => {}); },
          onLeaveBack: () => { if (audio) audio.pause(); },
        },
      });

      tl
        .to(plate,  { y: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to(textLeft  ? textLeft.querySelector("h2")  : {}, { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to(textRight ? textRight.querySelector("h2") : {}, { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to(steam,  { opacity: 1, duration: 0.15, ease: "none" }, 0.2)
        .to(specsL, { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.25)
        .to(specsR, { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.28)
        .to({},     { duration: 0.6 }, 0.4);
    } else {
      // Mobile — simple scroll-in, no pin
      gsap.set(plate, { y: 80 });
      gsap.to(plate, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
      setSoundVisible(true);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === container)
        .forEach((st) => st.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle audio toggling separately so it doesn't re-create the ScrollTrigger
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundEnabled) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundEnabled]);

  return (
    <>
      {/* ── 400vh scroll container ── */}
      <div ref={containerRef} className="sizzler-container" id="sizzlerContainer">
        <div ref={sectionRef} className="sizzler-section" id="sizzlerSection">

          <div className="sizzler-bg-gradient" />

          {/* Flanking text — left */}
          <div ref={textLeftRef} className="sizzler-text-left">
            <h2>Taste the</h2>
          </div>

          {/* Flanking text — right */}
          <div ref={textRightRef} className="sizzler-text-right">
            <h2>Experience</h2>
          </div>

          {/* Sizzler plate */}
          <div ref={plateRef} className="sizzler-plate">
            <img src="/images/sizzler-dish.png" alt="Tandoori Sizzler" />
          </div>

          {/* Steam wisps */}
          <div ref={steamRef} className="sizzler-steam-container">
            <div className="sizzler-steam-wisp" />
            <div className="sizzler-steam-wisp" />
            <div className="sizzler-steam-wisp" />
            <div className="sizzler-steam-wisp" />
            <div className="sizzler-steam-wisp" />
          </div>

          {/* Sizzle audio */}
          <audio ref={audioRef} loop preload="auto">
            <source src="/audio/sizzle-sound.mp3" type="audio/mpeg" />
          </audio>

          {/* Dish specs — bottom left */}
          <div ref={specsLeftRef} className="sizzler-dish-specs sizzler-dish-specs-left">
            <h3>Tandoori Sizzler</h3>
            <p>
              Chef&apos;s signature creation. Marinated overnight in house-ground
              spices, charred in our tandoor, served on a cast-iron plate.
            </p>
            <div className="sizzler-spice-tags">
              <span className="sizzler-spice-tag">Kashmiri Chilli</span>
              <span className="sizzler-spice-tag">Garam Masala</span>
            </div>
          </div>

          {/* Dish specs — bottom right */}
          <div ref={specsRightRef} className="sizzler-dish-specs sizzler-dish-specs-right">
            <h3>Chef&apos;s Note</h3>
            <p>
              This dish is a celebration of fire and flavour — the sizzle tells
              the story before the first bite.
            </p>
            <div className="sizzler-spice-tags">
              <span className="sizzler-spice-tag">GF</span>
              <span className="sizzler-spice-tag">Signature</span>
              <span className="sizzler-spice-tag">£18.95</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Sound toggle (fixed, bottom-right) ── */}
      {soundVisible && (
        <button
          onClick={() => setSoundEnabled((v) => !v)}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 90,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(45,45,45,0.8)",
            border: `1px solid ${soundEnabled ? "#C9963B" : "rgba(201,150,59,0.3)"}`,
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          aria-label={soundEnabled ? "Mute sizzle sound" : "Unmute sizzle sound"}
        >
          {soundEnabled ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9963B">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#A0978E">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
      )}
    </>
  );
}
