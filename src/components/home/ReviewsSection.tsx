"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Review Data ──────────────────────────────────────────────────────────────

const REVIEW_LEFT = {
  quote:
    "Just had an awesome meal at Rao's! The butter chicken with garlic naan was delicious — I'll be back!",
  author: "Paulette Ivory",
  source: "Google",
};

const REVIEW_RIGHT = {
  quote:
    "The cocktail menu is outstanding and the tandoori dishes are next level. Perfect fusion.",
  author: "James Mitchell",
  source: "TripAdvisor",
};

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        marginBottom: "14px",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          style={{ fill: "#C9963B", flexShrink: 0 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── SVG Glass Distortion Filter ─────────────────────────────────────────────
//
// Must render in the DOM before any GlassCard.
// Uses feDisplacementMap + feSpecularLighting to physically distort the
// background through the card — this is what makes it look like real glass,
// not a flat rectangle.

function GlassFilterDef() {
  return (
    <svg style={{ display: "none", position: "absolute" }} aria-hidden="true">
      <filter
        id="rv-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

// ─── Liquid Glass Card ────────────────────────────────────────────────────────
//
// Three stacked layers:
//   Layer 0 — backdrop-blur + SVG displacement (the glass physics)
//   Layer 1 — very faint gold tint rgba(201,150,59,0.06) — the glass colour
//   Layer 2 — gold inset box-shadow — the edge catch-light
//   Layer 3 — content

function GlassCard({
  children,
  textAlign = "left",
}: {
  children: React.ReactNode;
  textAlign?: "left" | "right";
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        overflow: "hidden",
        borderRadius: "20px",
        maxWidth: "340px",
        cursor: "default",
        border: "1px solid rgba(201,150,59,0.18)",
        boxShadow: "0 6px 6px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.15)",
        textAlign: textAlign,
      }}
    >
      {/* Layer 0 — distortion + blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          borderRadius: "20px",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          filter: "url(#rv-glass-distortion)",
          isolation: "isolate",
        }}
      />
      {/* Layer 1 — gold tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "20px",
          background: "rgba(201,150,59,0.06)",
        }}
      />
      {/* Layer 2 — gold edge specular */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "inset 2px 2px 1px 0 rgba(201,150,59,0.35), inset -1px -1px 1px 1px rgba(201,150,59,0.15)",
        }}
      />
      {/* Layer 3 — content */}
      <div
        style={{ position: "relative", zIndex: 3, padding: "28px 32px", width: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReviewsSection() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    gsap.set("#rvPlate", { y: "100vh" });
    gsap.set("#rvHeadLeft h2", { opacity: 0 });
    gsap.set("#rvHeadRight h2", { opacity: 0 });
    gsap.set("#rvCardLeft", { opacity: 0, y: 20 });
    gsap.set("#rvCardRight", { opacity: 0, y: 20 });

    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".rv-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: "#rvSection",
          pinSpacing: false,
        },
      });

      tl.to("#rvPlate", { y: 0, duration: 0.4, ease: "power2.out" }, 0)
        .to("#rvHeadLeft h2", { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to("#rvHeadRight h2", { opacity: 0.9, duration: 0.2, ease: "none" }, 0.1)
        .to("#rvCardLeft", { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.33)
        .to("#rvCardRight", { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0.36)
        .to({}, { duration: 0.6 }, 0.4);
    } else {
      gsap.set("#rvPlate", { y: 80 });
      gsap.to("#rvPlate", {
        y: 0,
        duration: 1,
        scrollTrigger: { trigger: "#rvSection", start: "top 70%" },
      });
      gsap.to("#rvHeadLeft h2, #rvHeadRight h2", {
        opacity: 0.9,
        duration: 0.5,
        scrollTrigger: { trigger: "#rvSection", start: "top 70%" },
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter(
          (st) =>
            st.vars.trigger === ".rv-container" ||
            st.vars.trigger === "#rvSection"
        )
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      className="rv-container"
      id="reviews"
      style={{ height: "400vh", position: "relative" }}
    >
      {/* SVG filter — must precede any GlassCard in render order */}
      <GlassFilterDef />

      <div
        id="rvSection"
        className="bg-bg-secondary"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center bottom, rgba(201,150,59,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Heading — left */}
        <div
          id="rvHeadLeft"
          style={{ position: "absolute", left: "5%", top: "22%", zIndex: 3 }}
        >
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", opacity: 0 }}
          >
            Straight from
          </h2>
        </div>

        {/* Heading — right */}
        <div
          id="rvHeadRight"
          style={{
            position: "absolute",
            right: "5%",
            top: "22%",
            textAlign: "right",
            zIndex: 3,
          }}
        >
          <h2
            className="font-display font-bold italic text-gold"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", opacity: 0 }}
          >
            The Table
          </h2>
        </div>

        {/* Sizzler video plate
            marginLeft nudges it right of viewport center so it sits visually
            between "Straight from" (wide) and "The Table" (narrower).
            Tune this single value if the plate looks off-center at your resolution. */}
        <div
          id="rvPlate"
          style={{
            position: "relative",
            zIndex: 5,
            width: "380px",
            height: "auto",
            maxHeight: "80vh",
            borderRadius: "8px",
            background: "#1A1A1A",
            marginLeft: "60px",
            filter:
              "drop-shadow(0 20px 50px rgba(0,0,0,0.6)) drop-shadow(0 0 80px rgba(201,150,59,0.12))",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          >
            <source src="/videos/3Sec-Sizzler.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Review card — left (desktop only) */}
        <div
          id="rvCardLeft"
          className="rv-hide-mobile"
          style={{ position: "absolute", left: "5%", bottom: "12%", zIndex: 4 }}
        >
          <GlassCard textAlign="left">
            <Stars align="left" />
            <blockquote
              className="font-display italic text-text-primary"
              style={{ fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "14px" }}
            >
              &ldquo;{REVIEW_LEFT.quote}&rdquo;
            </blockquote>
            <div
              className="text-text-secondary"
              style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
            >
              {REVIEW_LEFT.author}
            </div>
            <div
              className="text-gold"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {REVIEW_LEFT.source}
            </div>
          </GlassCard>
        </div>

        {/* Review card — right (desktop only) */}
        <div
          id="rvCardRight"
          className="rv-hide-mobile"
          style={{ position: "absolute", right: "5%", bottom: "12%", zIndex: 4 }}
        >
          <GlassCard textAlign="right">
            <Stars align="right" />
            <blockquote
              className="font-display italic text-text-primary"
              style={{ fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "14px" }}
            >
              &ldquo;{REVIEW_RIGHT.quote}&rdquo;
            </blockquote>
            <div
              className="text-text-secondary"
              style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
            >
              {REVIEW_RIGHT.author}
            </div>
            <div
              className="text-gold"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {REVIEW_RIGHT.source}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
