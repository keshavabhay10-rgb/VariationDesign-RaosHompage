"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=350&fit=crop",
    category: "Curries",
    name: "Butter Chicken",
    desc: "Tender chicken in a rich, creamy tomato sauce with aromatic spices and a touch of fenugreek.",
    price: "£14.95",
    tags: ["GF"],
  },
  {
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&h=350&fit=crop",
    category: "Biryani & Rice",
    name: "Lamb Dum Biryani",
    desc: "Slow-cooked lamb layered with fragrant basmati, saffron, and caramelised onions sealed in dough.",
    price: "£16.95",
    tags: ["GF"],
  },
  {
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=350&fit=crop",
    category: "Tandoori & Grill",
    name: "Paneer Tikka",
    desc: "Marinated cottage cheese grilled in our clay tandoor, served with mint chutney and pickled onions.",
    price: "£11.95",
    tags: ["V", "GF"],
  },
];

export default function MenuHighlights() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".menu-card");
    if (cards) {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section className="py-32 px-8 bg-bg-primary relative" id="menu">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.2em] uppercase text-gold block mb-3">Our Menu</span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold text-text-primary">
          Curated for Every Palate
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 max-w-[1100px] max-md:max-w-[400px] mx-auto">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="menu-card bg-bg-card rounded-xl overflow-hidden border border-white/5 opacity-0 translate-y-[40px] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-400"
          >
            <div className="h-[220px] overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                width={500}
                height={350}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-600"
              />
            </div>
            <div className="p-6">
              <span className="text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">{dish.category}</span>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">{dish.name}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{dish.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-display text-xl font-semibold text-gold">{dish.price}</span>
                <div className="flex gap-1.5">
                  {dish.tags.map((tag) => (
                    <span key={tag} className="text-[0.6rem] tracking-[0.08em] px-2 py-1 border border-gold/25 rounded text-gold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/menu"
          className="inline-block text-sm tracking-[0.12em] uppercase font-semibold text-gold border border-gold px-10 py-3.5 rounded hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
