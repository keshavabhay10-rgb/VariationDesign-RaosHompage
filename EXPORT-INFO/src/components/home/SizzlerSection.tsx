"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SoundToggle from "@/components/ui/SoundToggle";

gsap.registerPlugin(ScrollTrigger);

export default function SizzlerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const specsLeftRef = useRef<HTMLDivElement>(null);
  const specsRightRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundToggle, setShowSoundToggle] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    gsap.set(plateRef.current, { y: "100vh" });
    gsap.set(specsLeftRef.current, { opacity: 0, y: 20 });
    gsap.set(specsRightRef.current, { opacity: 0, y: 20 });

    if (!isMobile) {
      const sizzlerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: sectionRef.current,
          pinSpacing: false,
          onEnter: () => setShowSoundToggle(true),
          onLeave: () => { audioRef.current?.pause(); },
          onEnterBack: () => {
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          },
          onLeaveBack: () => { audioRef.current?.pause(); },
        },
      });

      sizzlerTl
        .to(plateRef.current, { y: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to(textLeftRef.current, { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to(textRightRef.current, { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to(steamRef.current, { opacity: 1, duration: 0.15, ease: "none" }, 0.2)
        .to(specsLeftRef.current, { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.25)
        .to(specsRightRef.current, { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.28)
        .to({}, { duration: 0.6 }, 0.4);
    } else {
      gsap.set(plateRef.current, { y: 80 });
      gsap.to(plateRef.current, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      setShowSoundToggle(true);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (audioRef.current) {
      if (next) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <section ref={containerRef} className="h-[400vh] relative" id="sizzler">
      <div ref={sectionRef} className="relative w-full h-screen bg-bg-secondary overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(201,150,59,0.08)_0%,transparent_60%)]" />

        {/* Flanking text */}
        <div className="absolute left-[5%] top-[22%] z-[3]">
          <h2 ref={textLeftRef} className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold text-text-primary opacity-[0.15]">
            Taste the
          </h2>
        </div>
        <div className="absolute right-[5%] top-[22%] text-right z-[3]">
          <h2 ref={textRightRef} className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold italic text-gold opacity-[0.15]">
            Experience
          </h2>
        </div>

        {/* Sizzler plate */}
        <div ref={plateRef} className="relative z-[5] w-[380px] max-lg:w-[320px] max-md:w-[200px] h-auto max-h-[80vh] overflow-visible rounded-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/sizzler-dish.png"
            alt="Signature tandoori sizzler dish with smoke"
            width={380}
            height={600}
            className="w-full h-auto object-contain rounded-lg bg-bg-secondary"
            priority
          />
        </div>

        {/* Steam wisps */}
        <div ref={steamRef} className="absolute z-[6] w-[340px] h-[300px] left-1/2 top-[15%] -translate-x-1/2 pointer-events-none opacity-0">
          <div className="steam-wisp absolute left-[30%] animate-wisp-1" />
          <div className="steam-wisp absolute left-[50%] animate-wisp-2" />
          <div className="steam-wisp absolute left-[70%] animate-wisp-3" />
          <div className="steam-wisp absolute left-[40%] animate-wisp-4" />
          <div className="steam-wisp absolute left-[60%] animate-wisp-5" />
        </div>

        {/* Dish specs left */}
        <div ref={specsLeftRef} className="absolute z-[6] left-[5%] bottom-[12%] max-w-[280px] max-lg:hidden">
          <h3 className="font-display text-2xl font-semibold text-gold mb-2">Tandoori Sizzler</h3>
          <p className="text-sm text-text-secondary leading-[1.7] mb-3">
            Chef&apos;s signature creation. Marinated overnight in house-ground spices,
            charred in our tandoor, served on a cast-iron plate.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border border-gold/30 rounded-full text-gold">
              Kashmiri Chilli
            </span>
            <span className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border border-gold/30 rounded-full text-gold">
              Garam Masala
            </span>
          </div>
        </div>

        {/* Dish specs right */}
        <div ref={specsRightRef} className="absolute z-[6] right-[5%] bottom-[12%] max-w-[280px] text-right max-lg:hidden">
          <h3 className="font-display text-2xl font-semibold text-gold italic mb-2">Chef&apos;s Note</h3>
          <p className="text-sm text-text-secondary leading-[1.7] mb-3">
            This dish is a celebration of fire and flavour — the sizzle tells the story
            before the first bite.
          </p>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border border-gold/30 rounded-full text-gold">GF</span>
            <span className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border border-gold/30 rounded-full text-gold">Signature</span>
            <span className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border border-gold/30 rounded-full text-gold">£18.95</span>
          </div>
        </div>

        {/* Audio */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/audio/sizzle-sound.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* Sound toggle */}
      <SoundToggle
        visible={showSoundToggle}
        active={soundEnabled}
        onToggle={toggleSound}
      />
    </section>
  );
}
