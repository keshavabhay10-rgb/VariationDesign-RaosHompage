"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const fireBgRef = useRef<HTMLDivElement>(null);
  const brandRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: heroRef.current,
          pinSpacing: false,
        },
      });

      heroTl
        .to(portalRef.current, {
          scale: 6,
          borderRadius: "0px",
          borderWidth: 0,
          duration: 1,
          ease: "none",
        }, 0)
        .to(textLeftRef.current, { x: -300, opacity: 0, duration: 0.5, ease: "none" }, 0)
        .to(textRightRef.current, { x: 300, opacity: 0, duration: 0.5, ease: "none" }, 0)
        .to(scrollPromptRef.current, { opacity: 0, y: 30, duration: 0.3, ease: "none" }, 0)
        .to(fireBgRef.current, { opacity: 1, duration: 0.6, ease: "none" }, 0.3)
        .to(brandRevealRef.current, { opacity: 1, duration: 0.4, ease: "none" }, 0.6);
    } else {
      gsap.to(fireBgRef.current, { opacity: 0.4, duration: 1.5, delay: 1.5 });
      gsap.from(textLeftRef.current, { y: 30, opacity: 0, duration: 1, delay: 0.5 });
      gsap.from(textRightRef.current, { y: 30, opacity: 0, duration: 1, delay: 0.8 });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-[300vh] relative" id="home">
      <div ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
        {/* ShaderGradient — deepest background layer */}
        <div
          style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}
          aria-hidden="true"
        >
          <ShaderGradientCanvas
            style={{ width: "100%", height: "100%" }}
            pointerEvents="none"
          >
            <ShaderGradient
              type="plane"
              animate="on"
              uTime={0.2}
              uSpeed={0.15}
              uStrength={0.8}
              uDensity={1.2}
              uFrequency={5.5}
              uAmplitude={3.2}
              color1="#050810"
              color2="#0D1B3E"
              color3="#050810"
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={0}
              rotationZ={235}
              cAzimuthAngle={180}
              cPolarAngle={80}
              cDistance={2.8}
              lightType="3d"
              envPreset="city"
              reflection={0.4}
              brightness={0.8}
            />
          </ShaderGradientCanvas>
        </div>

        {/* Fire background */}
        <div
          ref={fireBgRef}
          className="absolute inset-0 overflow-hidden opacity-0 hero-fire-gradient animate-fire-glow"
        >
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover z-[1]"
          >
            <source src="/videos/tandoor-fire.mp4" type="video/mp4" />
          </video>
          <div className="fire-overlay absolute inset-0 z-[2]" />
          <div className="embers-bg absolute inset-0 z-[3] pointer-events-none animate-embers-float" />
        </div>

        {/* Portal frame */}
        <div
          ref={portalRef}
          className="relative z-[2] w-[340px] h-[460px] border-[3px] border-ice rounded-[170px_170px_12px_12px] overflow-hidden shadow-[0_0_60px_rgba(196,212,240,0.10),inset_0_0_30px_rgba(196,212,240,0.06)]
          before:content-[''] before:absolute before:inset-[-6px] before:border before:border-ice/25 before:rounded-[176px_176px_18px_18px] before:pointer-events-none
          after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center_bottom,rgba(232,118,42,0.15)_0%,transparent_60%)] after:pointer-events-none
          max-lg:w-[280px] max-lg:h-[380px] max-lg:rounded-[140px_140px_10px_10px]
          max-md:w-[200px] max-md:h-[280px] max-md:rounded-[100px_100px_8px_8px]"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videos/tandoor-fire.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text left */}
        <div ref={textLeftRef} className="absolute left-[5%] top-1/2 -translate-y-1/2 z-[3] max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[18%] max-md:text-center max-md:w-[90%]">
          <h1 className="font-display font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-text-primary">
            Where<br />Tradition<br />Meets <em className="font-semibold italic text-ice">Modern</em><br />Flavours
          </h1>
        </div>

        {/* Text right */}
        <div ref={textRightRef} className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[3] text-right max-md:right-auto max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-auto max-md:bottom-[20%] max-md:text-center max-md:w-[90%]">
          <h2 className="font-display font-light text-[clamp(1.5rem,3.5vw,3.5rem)] text-text-secondary tracking-wide">
            Indian <span className="text-ice font-semibold">Fusion</span><br />Dalston
          </h2>
        </div>

        {/* Scroll prompt */}
        <div ref={scrollPromptRef} className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[5] text-center max-md:hidden">
          <p className="font-ui text-xs tracking-[0.25em] uppercase text-text-secondary mb-3">
            Scroll to begin your experience
          </p>
          <div className="w-5 h-5 mx-auto border-r-[1.5px] border-b-[1.5px] border-ice rotate-45 animate-chevron-bounce" />
        </div>

        {/* Brand reveal */}
        <div
          ref={brandRevealRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] text-center opacity-0 p-12 brand-vignette rounded-[20px]"
        >
          <span className="font-display font-light text-[clamp(1.5rem,3vw,2.5rem)] text-ice tracking-[0.2em] uppercase block mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            Rao&apos;s Bar &amp; Restaurant
          </span>
          <span className="font-display italic text-[clamp(1rem,2vw,1.5rem)] text-white tracking-wide block mb-6 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Where Tradition Meets Modern Flavours
          </span>
          <div className="w-[60px] h-px bg-ice mx-auto mb-6 opacity-60" />
          <span className="font-ui text-xs tracking-[0.2em] uppercase text-[#D4CFC8] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
            Indian Fusion Dining &middot; Dalston, London
          </span>
          <div className="mt-8 font-display italic text-sm text-ice tracking-wide drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
            From Our Tandoor
          </div>
        </div>
      </div>
    </section>
  );
}
