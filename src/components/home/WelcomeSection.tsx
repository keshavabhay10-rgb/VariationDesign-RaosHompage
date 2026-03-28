"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 101;
const FRAME_PATH = (i: number) => `/Frames2/${String(i).padStart(2, "0")}.jpg`;

const pillars = [
  {
    cat: "Indian Fusion",
    headline: "Rooted in tradition,\nrefined by innovation",
    body: "Every dish at Rao's begins with respect — for the ingredients, the technique, and the centuries of culinary wisdom that inform our craft.",
    img: "/images/pillar-fusion.png",
    alt: "Indian fusion cuisine at Rao's",
  },
  {
    cat: "Locally Sourced",
    headline: "Ingredients that speak\nfor themselves",
    body: "We source the finest seasonal produce from trusted local suppliers — letting quality do the work so every plate tells an honest story.",
    img: "/images/pillar-sourced.png",
    alt: "Fresh locally sourced ingredients",
  },
  {
    cat: "Craft Cocktails",
    headline: "A table where\neveryone belongs",
    body: "From the first greeting to the last glass, Rao's is built around the belief that great food — and great drinks — bring people closer.",
    img: "/images/pillar-cocktails.png",
    alt: "Craft cocktails at Rao's bar",
  },
  {
    cat: "Dalston Heart",
    headline: "Crafted by hand,\nserved with heart",
    body: "Our kitchen runs on intuition passed down through generations — recipes that can't be rushed, flavours that can't be replicated by shortcuts.",
    img: "/images/pillar-dalston.png",
    alt: "Rao's restaurant in Dalston",
  },
];

export default function WelcomeSection() {
  // Half 1 refs
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copy1Ref = useRef<HTMLDivElement>(null);
  const copy2ARef = useRef<HTMLDivElement>(null);
  const copy2BRef = useRef<HTMLDivElement>(null);
  const copy3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ═══════════════════════════════════════════
    // HALF 1 — RAF FRAME SEQUENCE (Parampara-style)
    // ═══════════════════════════════════════════
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      if (i === 0) img.fetchPriority = "high";
      return img;
    });

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx!.scale(dpr, dpr);
      }
    }

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = images[Math.min(Math.max(index, 0), TOTAL_FRAMES - 1)];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      resizeCanvas();
      const dW = canvas.offsetWidth;
      const dH = canvas.offsetHeight;
      const scale = Math.max(dW / img.naturalWidth, dH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      ctx.clearRect(0, 0, dW, dH);
      ctx.drawImage(img, (dW - drawW) / 2, (dH - drawH) / 2, drawW, drawH);
    }

    function getScrollProgress() {
      if (!section) return 0;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(
        1,
        Math.max(0, (window.scrollY - section.offsetTop) / scrollable),
      );
    }

    let lastFrameIndex = -1;
    let rafId: number;
    function tick() {
      const progress = getScrollProgress();
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1,
      );
      if (frameIndex !== lastFrameIndex) {
        drawFrame(frameIndex);
        lastFrameIndex = frameIndex;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    images[0].onload = () => {
      drawFrame(0);
    };
    if (images[0].complete && images[0].naturalWidth > 0) {
      drawFrame(0);
    } else {
      images[0].onload = () => drawFrame(0);
    }

    const ro = new ResizeObserver(() => {
      resizeCanvas();
      drawFrame(lastFrameIndex >= 0 ? lastFrameIndex : 0);
    });
    ro.observe(canvas);

    // Copy scroll triggers — all use () => sh() for live height
    const sh = () => section.offsetHeight;

    // Copy 1 — starts VISIBLE (no opacity:0), fades out at 10–15%
    gsap.fromTo(
      copy1Ref.current,
      { opacity: 1, y: 0, filter: "blur(0px)" },
      {
        opacity: 0,
        y: -30,
        filter: "blur(4px)",
        scrollTrigger: {
          trigger: section,
          start: () => `${0.1 * sh()}px top`,
          end: () => `${0.15 * sh()}px top`,
          scrub: 1,
        },
      },
    );

    // Copy 2A — in 19–23%, out 30–34%
    gsap.fromTo(
      copy2ARef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: () => `${0.19 * sh()}px top`,
          end: () => `${0.23 * sh()}px top`,
          scrub: 1,
        },
      },
    );
    gsap.to(copy2ARef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: section,
        start: () => `${0.3 * sh()}px top`,
        end: () => `${0.34 * sh()}px top`,
        scrub: 1,
      },
    });

    // Copy 2B — in 32–36%, out 43–46%
    gsap.fromTo(
      copy2BRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: () => `${0.32 * sh()}px top`,
          end: () => `${0.36 * sh()}px top`,
          scrub: 1,
        },
      },
    );
    gsap.to(copy2BRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: section,
        start: () => `${0.43 * sh()}px top`,
        end: () => `${0.46 * sh()}px top`,
        scrub: 1,
      },
    });

    // Copy 3 — in 48–54%
    gsap.fromTo(
      copy3Ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: () => `${0.48 * sh()}px top`,
          end: () => `${0.54 * sh()}px top`,
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      copy3Ref.current?.querySelectorAll(".s2-word") ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: section,
          start: () => `${0.48 * sh()}px top`,
          end: () => `${0.54 * sh()}px top`,
          scrub: 1,
        },
      },
    );

    // ═══════════════════════════════════════════
    // HALF 2 — JOBY CLIP-PATH WIPE (timeline-driven)
    // ═══════════════════════════════════════════

    function buildWipeTransition(
      tl: gsap.core.Timeline,
      fromIdx: number,
      toIdx: number,
      startPos: number,
      layerImg: Element,
      panels: Element[],
      dots: Element[],
      catLabels: Element[],
    ) {
      const wipeDur = 0.08;

      // Exit current text
      tl.to(
        panels[fromIdx].querySelector(".joby-p"),
        { opacity: 0, y: -10, duration: 0.025 },
        startPos,
      );
      tl.to(
        panels[fromIdx].querySelector(".joby-h"),
        { opacity: 0, y: -20, duration: 0.03 },
        startPos + 0.01,
      );

      // Exit current label + line shrinks
      tl.to(catLabels[fromIdx], { opacity: 0, duration: 0.02 }, startPos);
      tl.to(
        ".joby-vert-line",
        { scaleY: 0, duration: 0.04, ease: "power1.in" },
        startPos + 0.01,
      );

      // Show incoming panel container
      tl.set(panels[toIdx], { opacity: 1 }, startPos + 0.02);

      // Image wipe — clip-path sweep top to bottom (NEVER opacity)
      tl.fromTo(
        layerImg,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: wipeDur, ease: "none" },
        startPos + 0.02,
      );

      // Line regrows + new label fades in
      tl.fromTo(
        ".joby-vert-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.06, ease: "power1.out" },
        startPos + 0.02,
      );
      tl.to(catLabels[toIdx], { opacity: 1, duration: 0.04 }, startPos + 0.03);

      // Hide outgoing panel container
      tl.set(panels[fromIdx], { opacity: 0 }, startPos + 0.02 + wipeDur);

      // Dots morph
      tl.to(
        dots[fromIdx],
        {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
          duration: 0.02,
        },
        startPos + 0.03,
      );
      tl.to(
        dots[toIdx],
        {
          width: 2,
          height: 22,
          borderRadius: 1,
          background: "#C9963B",
          duration: 0.02,
        },
        startPos + 0.05,
      );

      // New headline enters mid-wipe
      tl.fromTo(
        panels[toIdx].querySelector(".joby-h"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.04 },
        startPos + 0.02 + wipeDur * 0.5,
      );

      // Pointer events swap
      tl.set(
        panels[fromIdx],
        { pointerEvents: "none" },
        startPos + 0.02 + wipeDur,
      );
      tl.set(
        panels[toIdx],
        { pointerEvents: "auto" },
        startPos + 0.02 + wipeDur,
      );

      // New body text enters after headline
      tl.fromTo(
        panels[toIdx].querySelector(".joby-p"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.04 },
        startPos + 0.02 + wipeDur + 0.04,
      );
    }

    // Mobile guard — no animation on small screens
    if (window.innerWidth >= 768) {
      const panels = Array.from(
        document.querySelectorAll("#jobyPinned .joby-panel"),
      ) as Element[];
      const layerImgs = Array.from(
        document.querySelectorAll("#jobyPinned .joby-img-layer"),
      ) as Element[];
      const dots = Array.from(
        document.querySelectorAll("#jobyPinned .joby-dot"),
      ) as Element[];
      const catLabels = Array.from(
        document.querySelectorAll("#jobyPinned .joby-cat-label"),
      ) as Element[];

      // Initial states
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          opacity: i === 0 ? 1 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });
      gsap.set(panels[0].querySelector(".joby-h"), { opacity: 0, y: 25 });
      gsap.set(panels[0].querySelector(".joby-p"), { opacity: 0, y: 15 });
      catLabels.forEach((label) => gsap.set(label, { opacity: 0 }));

      const jobyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".joby-scroll-spacer",
          start: "top top",
          end: "bottom bottom",
          pin: "#jobyPinned",
          pinSpacing: false,
          scrub: 1,
        },
      });

      // Intro: line grows, first label fades in, dots appear, slide 0 text enters
      jobyTl.fromTo(
        ".joby-vert-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.08, ease: "power1.out" },
        0.0,
      );
      jobyTl.fromTo(
        catLabels[0],
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.02,
      );
      jobyTl.fromTo(
        "#jobyDots",
        { opacity: 0 },
        { opacity: 1, duration: 0.03 },
        0.06,
      );
      jobyTl.fromTo(
        panels[0].querySelector(".joby-h"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.09,
      );
      jobyTl.fromTo(
        panels[0].querySelector(".joby-p"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.14,
      );

      buildWipeTransition(jobyTl, 0, 1, 0.26, layerImgs[0], panels, dots, catLabels);
      buildWipeTransition(jobyTl, 1, 2, 0.5, layerImgs[1], panels, dots, catLabels);
      buildWipeTransition(jobyTl, 2, 3, 0.74, layerImgs[2], panels, dots, catLabels);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════
          HALF 1 — FRAMES SCROLL SEQUENCE
          ═══════════════════════════════════ */}
      <section
        ref={sectionRef}
        id="welcome-frames"
        style={{ height: "600vh", position: "relative", background: "#0D0D0D" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ zIndex: 1 }}
          />

          {/* Copy 1 — split layout, VISIBLE by default */}
          <div
            ref={copy1Ref}
            className="absolute inset-0 flex items-center justify-between px-[6vw] pointer-events-none"
            style={{ zIndex: 2 }}
          >
            <div>
              <p className="font-body text-[0.75rem] font-bold tracking-[0.25em] text-gold uppercase mb-3">
                Dalston, London
              </p>
              <h1
                className="font-display font-bold leading-[0.9] text-text-primary"
                style={{ fontSize: "clamp(4rem,9vw,9rem)" }}
              >
                RAO&apos;S
              </h1>
              <div className="w-px h-8 bg-gold/40 my-4" />
              <p className="font-display italic text-text-secondary text-[0.95rem] leading-relaxed max-w-[220px]">
                Where every flavour
                <br />
                tells a story.
              </p>
            </div>
            <div className="text-right">
              <p className="font-body text-[0.75rem] font-bold tracking-[0.25em] text-gold uppercase mb-3">
                Est. in tradition
              </p>
              <p
                className="font-display font-bold leading-[1.0] text-text-primary"
                style={{
                  fontSize: "clamp(1.8rem,3.5vw,3.5rem)",
                  letterSpacing: "0.02em",
                }}
              >
                Authentic.
                <br />
                <span className="text-gold">Uncompromised.</span>
              </p>
            </div>
          </div>

          {/* Copy 2A */}
          <div
            ref={copy2ARef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <p className="font-body text-[0.75rem] font-bold tracking-[0.25em] text-gold uppercase mb-4">
              The ingredients
            </p>
            <h2
              className="font-display font-bold text-text-primary leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem,6.5vw,7.5rem)" }}
            >
              Authentic
              <br />
              <span className="text-gold">Spices.</span>
            </h2>
            <p className="font-body text-text-secondary mt-5 text-[0.9rem] max-w-[480px] leading-relaxed">
              Sourced from across the subcontinent.
              <br />
              Ground fresh. Never compromised.
            </p>
          </div>

          {/* Copy 2B */}
          <div
            ref={copy2BRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <p className="font-body text-[0.75rem] font-bold tracking-[0.25em] text-gold uppercase mb-4">
              The craft
            </p>
            <h2
              className="font-display font-bold text-text-primary leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem,6.5vw,7.5rem)" }}
            >
              Traditional
              <br />
              <span className="text-gold">Methods.</span>
            </h2>
            <p className="font-body text-text-secondary mt-5 text-[0.9rem] max-w-[480px] leading-relaxed">
              Slow-cooked, hand-rolled, flame-kissed.
              <br />
              The way it&apos;s always been done.
            </p>
          </div>

          {/* Copy 3 */}
          <div
            ref={copy3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <p className="font-body text-[0.75rem] font-bold tracking-[0.25em] text-gold uppercase mb-6">
              The promise
            </p>
            <h2
              className="font-display font-bold text-text-primary leading-[1.1]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,6.5rem)" }}
            >
              <span className="s2-word inline-block">Royal</span>{" "}
              <span className="s2-word inline-block">flavors.</span>
              <br />
              <span className="s2-word inline-block">Rooted</span>{" "}
              <span className="s2-word inline-block">in</span>{" "}
              <span className="s2-word inline-block text-gold">tradition.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HALF 2 — JOBY FULL-SCREEN PILLARS
          ═══════════════════════════════════ */}
      <section className="joby-outer" id="philosophy">
        <div className="joby-scroll-spacer">
          <div className="joby-pinned" id="jobyPinned">

            {/* Full-screen image stack */}
            <div className="joby-image-wrap">
              <img
                className="joby-img joby-img-base"
                data-index="0"
                src="/images/pillar-fusion.png"
                alt="Indian Fusion"
              />
              <img
                className="joby-img joby-img-layer"
                data-index="1"
                src="/images/pillar-sourced.png"
                alt="Locally Sourced"
              />
              <img
                className="joby-img joby-img-layer"
                data-index="2"
                src="/images/pillar-cocktails.png"
                alt="Craft Cocktails"
              />
              <img
                className="joby-img joby-img-layer"
                data-index="3"
                src="/images/pillar-dalston.png"
                alt="Dalston Heart"
              />
            </div>

            {/* Gradient overlay for text legibility */}
            <div className="joby-overlay" />

            {/* Dot navigation — bottom left */}
            <div className="joby-dots" id="jobyDots">
              <div className="joby-dot active" data-index="0"></div>
              <div className="joby-dot" data-index="1"></div>
              <div className="joby-dot" data-index="2"></div>
              <div className="joby-dot" data-index="3"></div>
            </div>

            {/* Text area — right side overlay */}
            <div className="joby-text-area">
              <div className="joby-category-stack">
                <span className="joby-cat-label" data-cat="0">Indian Fusion</span>
                <span className="joby-cat-label" data-cat="1">Locally Sourced</span>
                <span className="joby-cat-label" data-cat="2">Craft Cocktails</span>
                <span className="joby-cat-label" data-cat="3">Dalston Heart</span>
              </div>
              <div className="joby-vert-line"></div>

              <div className="joby-text-panels">
                <div className="joby-panel" data-slide="0">
                  <h2 className="joby-h">Rooted in tradition, refined by innovation</h2>
                  <p className="joby-p">Every dish at Rao&apos;s begins with respect — for the ingredients, the technique, and the centuries of culinary wisdom that inform our craft.</p>
                </div>
                <div className="joby-panel" data-slide="1">
                  <h2 className="joby-h">Ingredients that speak for themselves</h2>
                  <p className="joby-p">We source the finest seasonal produce from trusted local suppliers — letting quality do the work so every plate tells an honest story.</p>
                </div>
                <div className="joby-panel" data-slide="2">
                  <h2 className="joby-h">A table where everyone belongs</h2>
                  <p className="joby-p">From the first greeting to the last glass, Rao&apos;s is built around the belief that great food — and great drinks — bring people closer.</p>
                </div>
                <div className="joby-panel" data-slide="3">
                  <h2 className="joby-h">Crafted by hand, served with heart</h2>
                  <p className="joby-p">Our kitchen runs on intuition passed down through generations — recipes that can&apos;t be rushed, flavours that can&apos;t be replicated by shortcuts.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
