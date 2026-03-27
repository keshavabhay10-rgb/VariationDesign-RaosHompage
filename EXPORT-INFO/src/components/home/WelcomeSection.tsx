"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-gold fill-none stroke-[1.5]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Indian Fusion",
    desc: "Bold, innovative flavours inspired by classic Indian recipes with a modern twist.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-gold fill-none stroke-[1.5]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Locally Sourced",
    desc: "Seasonal, sustainable ingredients from trusted local suppliers and farms.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-gold fill-none stroke-[1.5]">
        <path d="M8 22h8M12 2v9M17 7l-5 5-5-5" />
        <circle cx="12" cy="17" r="4" />
      </svg>
    ),
    title: "Craft Cocktails",
    desc: "Unique blends and curated selections to elevate your dining experience.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-gold fill-none stroke-[1.5]">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Dalston Heart",
    desc: "Rooted in our vibrant neighbourhood, serving the community with warmth.",
  },
];

const headlineText = "Discover a dining experience where every dish tells a story";

export default function WelcomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = sectionRef.current?.querySelectorAll(".word");
    if (words) {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }

    gsap.to(taglineRef.current, {
      opacity: 1,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    gsap.to(descRef.current, {
      opacity: 1,
      duration: 0.8,
      delay: 0.6,
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    const pillarEls = pillarsRef.current?.querySelectorAll(".pillar");
    if (pillarEls) {
      gsap.to(pillarEls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-8 bg-bg-primary overflow-hidden section-gold-line"
      id="about-teaser"
    >
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1.4] text-text-primary mb-4">
          {headlineText.split(" ").map((word, i) => (
            <span key={i} className="word inline-block opacity-0 translate-y-[15px]">
              {word}&nbsp;
            </span>
          ))}
        </h2>

        <p ref={taglineRef} className="font-display italic text-lg text-gold mb-12 opacity-0">
          A fusion of culinary artistry, sustainability, and unmatched ambiance.
        </p>

        <p ref={descRef} className="text-base leading-[1.8] text-text-secondary max-w-[650px] mx-auto mb-16 opacity-0">
          Nestled in the heart of Dalston, Rao&apos;s blends the rich flavours of traditional
          Indian recipes with contemporary flair. We source locally, cook with care, and pour
          with passion — crafting every moment into a memory.
        </p>
      </div>

      <div ref={pillarsRef} className="grid grid-cols-4 max-lg:grid-cols-2 gap-8 max-md:gap-4 max-w-[1000px] mx-auto">
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="pillar text-center p-8 max-md:p-5 border border-gold/15 rounded-lg bg-bg-card/30 opacity-0 translate-y-[30px] hover:border-gold/40 hover:bg-bg-card/50 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gold/10">
              {pillar.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
              {pillar.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
