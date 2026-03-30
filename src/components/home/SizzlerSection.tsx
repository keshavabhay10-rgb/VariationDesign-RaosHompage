"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    name: "The Menu",
    type: "Indian Fusion Cuisine",
    highlights: "Tandoori, Biryani, Craft Cocktails",
    experience: "Dine-in · Private Events · Takeaway",
    year: "EST. 2022",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=550&fit=crop",
    alt: "The Menu",
  },
  {
    name: "Cocktail Bar",
    type: "Mixology & Spirits",
    highlights: "Signature Blends, Indian-Inspired",
    experience: "Walk-in · Late Night · Groups",
    year: "DALSTON",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=550&fit=crop",
    alt: "Cocktail Bar",
  },
  {
    name: "Private Dining",
    type: "Bespoke Experiences",
    highlights: "Set Menus, Dedicated Space",
    experience: "Birthdays · Corporate · Weddings",
    year: "6–30 GUESTS",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=550&fit=crop",
    alt: "Private Dining",
  },
  {
    name: "Events",
    type: "Celebrations & Gatherings",
    highlights: "Seasonal, Cultural, Corporate",
    experience: "Custom Packages · Full Service",
    year: "ENQUIRE",
    img: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=550&fit=crop",
    alt: "Events",
  },
  {
    name: "Our Story",
    type: "Dalston Since 2022",
    highlights: "Locally Sourced, Sustainably Minded",
    experience: "Tradition Meets Innovation",
    year: "HACKNEY",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=550&fit=crop",
    alt: "Our Story",
  },
];

const positions = {
  farLeft:  { x: -1100, z: -500,  rotateY: 35,  rotateX: 2,   scale: 0.50, opacity: 0.15, brightness: 0.35 },
  left:     { x: -620,  z: -300,  rotateY: 22,  rotateX: 2,   scale: 0.70, opacity: 0.60, brightness: 0.55 },
  center:   { x: -30,   z: 0,     rotateY: -5,  rotateX: 1.5, scale: 1.00, opacity: 1.00, brightness: 1.00 },
  right:    { x: 550,   z: -350,  rotateY: -25, rotateX: 2.5, scale: 0.65, opacity: 0.55, brightness: 0.45 },
  farRight: { x: 1100,  z: -550,  rotateY: -40, rotateX: 3,   scale: 0.45, opacity: 0.10, brightness: 0.30 },
};

function getPositionForCard(activeIndex: number, cardIndex: number) {
  const diff = cardIndex - activeIndex;
  if (diff <= -2) return positions.farLeft;
  if (diff === -1) return positions.left;
  if (diff === 0)  return positions.center;
  if (diff === 1)  return positions.right;
  return positions.farRight;
}

export default function SizzlerSection() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: IntersectionObserver updates metadata as user snaps through cards
      const track = document.getElementById("qhTrack");
      const cards = document.querySelectorAll(".qh-card");
      if (!track) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const index = parseInt(
                (entry.target as HTMLElement).dataset.index ?? "0",
                10
              );
              const data = cardData[index];
              const nameEl = document.querySelector("#qhMetaTitle .qh-meta-name");
              const typeEl = document.getElementById("qhMetaType");
              const hlEl   = document.getElementById("qhMetaHighlights");
              const expEl  = document.getElementById("qhMetaExperience");
              const yrEl   = document.getElementById("qhMetaYear");
              if (nameEl) nameEl.textContent = data.name;
              if (typeEl) typeEl.textContent = data.type;
              if (hlEl)   hlEl.textContent   = data.highlights;
              if (expEl)  expEl.textContent  = data.experience;
              if (yrEl)   yrEl.textContent   = data.year;
            }
          });
        },
        { root: track.parentElement, threshold: 0.5 }
      );
      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }

    // Desktop: full GSAP 3D scroll timeline
    const cards = Array.from(
      document.querySelectorAll("#qhSection .qh-card")
    ) as HTMLElement[];
    const totalCards = cards.length;

    // Set initial state: card 0 centered, others positioned in 3D space
    cards.forEach((card, i) => {
      const pos = getPositionForCard(0, i);
      gsap.set(card, {
        x: pos.x,
        z: pos.z,
        rotateY: pos.rotateY,
        rotateX: pos.rotateX,
        scale: pos.scale,
        opacity: pos.opacity,
        filter: `brightness(${pos.brightness})`,
        transformPerspective: 1200,
      });
    });

    let currentActiveIndex = 0;

    function updateMeta(index: number) {
      if (index === currentActiveIndex) return;
      currentActiveIndex = index;
      const data = cardData[index];
      const meta = document.getElementById("qhMeta");
      if (!meta) return;
      const targets = meta.querySelectorAll(
        ".qh-meta-value, .qh-meta-name, .qh-meta-year"
      );
      gsap.to(targets, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          const nameEl = document.querySelector("#qhMetaTitle .qh-meta-name");
          const typeEl = document.getElementById("qhMetaType");
          const hlEl   = document.getElementById("qhMetaHighlights");
          const expEl  = document.getElementById("qhMetaExperience");
          const yrEl   = document.getElementById("qhMetaYear");
          if (nameEl) nameEl.textContent = data.name;
          if (typeEl) typeEl.textContent = data.type;
          if (hlEl)   hlEl.textContent   = data.highlights;
          if (expEl)  expEl.textContent  = data.experience;
          if (yrEl)   yrEl.textContent   = data.year;
          gsap.to(targets, { opacity: 1, duration: 0.2 });
        },
      });
    }

    const stepDuration = 1 / (totalCards - 1); // 0.25 for 5 cards

    const qhTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".qh-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        pin: "#qhSection",
        pinSpacing: false,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            totalCards - 1,
            Math.floor(self.progress * totalCards)
          );
          updateMeta(activeIndex);
        },
      },
    });

    // Build timeline: transition every card through each step
    for (let step = 0; step < totalCards - 1; step++) {
      const startTime = step * stepDuration;
      cards.forEach((card, cardIndex) => {
        const fromPos = getPositionForCard(step,     cardIndex);
        const toPos   = getPositionForCard(step + 1, cardIndex);
        qhTl.fromTo(
          card,
          {
            x: fromPos.x,
            z: fromPos.z,
            rotateY: fromPos.rotateY,
            rotateX: fromPos.rotateX,
            scale: fromPos.scale,
            opacity: fromPos.opacity,
            filter: `brightness(${fromPos.brightness})`,
            transformPerspective: 1200,
          },
          {
            x: toPos.x,
            z: toPos.z,
            rotateY: toPos.rotateY,
            rotateX: toPos.rotateX,
            scale: toPos.scale,
            opacity: toPos.opacity,
            filter: `brightness(${toPos.brightness})`,
            transformPerspective: 1200,
            duration: stepDuration,
            ease: "none",
          },
          startTime
        );
      });
    }

    return () => {
      qhTl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === ".qh-container")
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="qh-container" id="experience">
      <div className="qh-section" id="qhSection">

        {/* 3D environment background */}
        <div className="qh-environment" />

        {/* 3D cards container */}
        <div className="qh-cards-perspective">
          <div className="qh-cards-track" id="qhTrack">
            {cardData.map((card, i) => (
              <div key={i} className="qh-card" data-index={i}>
                <div className="qh-card-inner">
                  <img src={card.img} alt={card.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata row */}
        <div className="qh-meta" id="qhMeta">
          <div className="qh-meta-title" id="qhMetaTitle">
            <span className="qh-meta-name">The Menu</span>
            <svg className="qh-meta-arrow" viewBox="0 0 24 24" width="18" height="18">
              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="qh-meta-col">
            <span className="qh-meta-label">TYPE</span>
            <span className="qh-meta-value" id="qhMetaType">Indian Fusion Cuisine</span>
          </div>
          <div className="qh-meta-col">
            <span className="qh-meta-label">HIGHLIGHTS</span>
            <span className="qh-meta-value" id="qhMetaHighlights">Tandoori, Biryani, Craft Cocktails</span>
          </div>
          <div className="qh-meta-col">
            <span className="qh-meta-label">EXPERIENCE</span>
            <span className="qh-meta-value" id="qhMetaExperience">Dine-in · Private Events · Takeaway</span>
          </div>
          <div className="qh-meta-year" id="qhMetaYear">EST. 2022</div>
        </div>

      </div>
    </section>
  );
}
