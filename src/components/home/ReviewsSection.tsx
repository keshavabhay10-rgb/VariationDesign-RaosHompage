"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote: "Just had an awesome meal at Rao's! The food was tasty and looked so appetizing. The butter chicken with garlic naan was delicious — I'll be back!",
    author: "Paulette Ivory",
    source: "Google Reviews",
  },
  {
    quote: "Glad to discover this place! Food was great and the atmosphere had a lovely modern vibe. One of the best restaurants in Hackney.",
    author: "Abigail Rendle",
    source: "Google Reviews",
  },
  {
    quote: "The cocktail menu is outstanding and the tandoori dishes are next level. Perfect fusion of traditional and contemporary.",
    author: "James Mitchell",
    source: "TripAdvisor",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function ReviewsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".review-card");
    if (cards) {
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section className="py-32 px-8 bg-bg-secondary relative overflow-hidden" id="reviews">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[15rem] text-gold/[0.04] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.2em] uppercase text-gold block mb-3">Testimonials</span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold text-text-primary">
          What Our Guests Say
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 max-w-[1100px] max-md:max-w-[500px] mx-auto">
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`review-card p-8 border border-white/5 rounded-lg bg-bg-primary/50 opacity-0 translate-y-[30px] ${i === 2 ? "max-lg:hidden max-md:block" : ""}`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
            </div>
            <blockquote className="font-display italic text-base text-text-primary leading-[1.7] mb-6">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="text-sm text-text-secondary tracking-wide">{review.author}</div>
            <div className="text-[0.65rem] text-gold tracking-[0.1em] uppercase mt-1">{review.source}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
