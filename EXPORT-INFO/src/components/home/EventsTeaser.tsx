"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const eventTags = ["Birthdays", "Corporate", "Weddings", "Set Menus"];

export default function EventsTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from(contentRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[80vh] min-h-[550px] max-md:h-auto max-md:min-h-0 overflow-hidden flex items-center" id="events">
      <div className="absolute inset-0">
        <Image
          ref={bgRef}
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop"
          alt="Private dining at Rao's"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 events-gradient max-md:!bg-bg-primary/[0.88]" />

      <div ref={contentRef} className="relative z-[2] p-16 max-lg:p-12 max-md:py-16 max-md:px-6 max-w-[550px] max-md:max-w-full">
        <span className="text-xs tracking-[0.2em] uppercase text-gold block mb-4">
          Events &amp; Private Dining
        </span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-semibold text-text-primary leading-[1.2] mb-5">
          Host Your Next Celebration With Us
        </h2>
        <p className="text-base text-text-secondary leading-[1.7] mb-8">
          From intimate birthday dinners to corporate gatherings and wedding receptions,
          our team will craft a bespoke experience tailored to your occasion.
        </p>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {eventTags.map((tag) => (
            <span key={tag} className="text-[0.7rem] tracking-[0.08em] uppercase px-4 py-1.5 border border-gold/30 rounded-full text-gold">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/events"
          className="inline-block text-sm tracking-[0.12em] uppercase font-semibold text-gold border border-gold px-10 py-3.5 rounded hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          Explore Events
        </Link>
      </div>
    </section>
  );
}
