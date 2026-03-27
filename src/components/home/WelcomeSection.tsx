"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 61;
const FRAME_PATH = (i: number) => `/Frames/${i}.jpg`;

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

  // Half 2 refs
  const jobySpacerRef = useRef<HTMLDivElement>(null);
  const jobyPinnedRef = useRef<HTMLDivElement>(null);
  const dotsContRef = useRef<HTMLDivElement>(null);
  const vertLineRef = useRef<HTMLDivElement>(null);
  const catLabelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

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
    images[0].onload = () => drawFrame(0);
    if (images[0].complete) drawFrame(0);

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
    // HALF 2 — JOBY GSAP TIMELINE (exact prototype pattern)
    // ═══════════════════════════════════════════
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const layerImgs = imagesRef.current
      .slice(1)
      .filter(Boolean) as HTMLImageElement[];
    const dots = Array.from(
      dotsContRef.current?.querySelectorAll(".joby-dot") ?? [],
    ) as HTMLElement[];
    const catLabels = catLabelsRef.current.filter(Boolean) as HTMLSpanElement[];

    if (panels.length < 4 || layerImgs.length < 3) return;

    // Initial states — exact prototype
    panels.forEach((panel, i) => {
      gsap.set(panel, {
        opacity: i === 0 ? 1 : 0,
        pointerEvents: i === 0 ? "auto" : "none",
      });
    });
    gsap.set(panels[0].querySelector(".joby-h"), { opacity: 0, y: 25 });
    gsap.set(panels[0].querySelector(".joby-p"), { opacity: 0, y: 15 });
    catLabels.forEach((label) => gsap.set(label, { opacity: 0 }));

    function buildWipeTransition(
      tl: gsap.core.Timeline,
      fromIdx: number,
      toIdx: number,
      startPos: number,
      layerImg: HTMLImageElement,
    ) {
      const wipeDur = 0.08;
      const vl = vertLineRef.current;

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
      tl.to(catLabels[fromIdx], { opacity: 0, duration: 0.02 }, startPos);
      tl.to(
        vl,
        { scaleY: 0, duration: 0.04, ease: "power1.in" },
        startPos + 0.01,
      );
      tl.set(panels[toIdx], { opacity: 1 }, startPos + 0.02);
      tl.fromTo(
        layerImg,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: wipeDur, ease: "none" },
        startPos + 0.02,
      );
      tl.fromTo(
        vl,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.06, ease: "power1.out" },
        startPos + 0.02,
      );
      tl.to(catLabels[toIdx], { opacity: 1, duration: 0.04 }, startPos + 0.03);
      tl.set(panels[fromIdx], { opacity: 0 }, startPos + 0.02 + wipeDur);
      tl.to(
        dots[fromIdx],
        {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.3)",
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
      tl.fromTo(
        panels[toIdx].querySelector(".joby-h"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.04 },
        startPos + 0.02 + wipeDur * 0.5,
      );
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
      tl.fromTo(
        panels[toIdx].querySelector(".joby-p"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.04 },
        startPos + 0.02 + wipeDur + 0.04,
      );
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: jobySpacerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: jobyPinnedRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 1,
      },
    });

    // Intro: line grows, label fades, dots appear, first slide text enters
    tl.fromTo(
      vertLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.08, ease: "power1.out" },
      0.0,
    );
    tl.fromTo(
      catLabels[0],
      { opacity: 0 },
      { opacity: 1, duration: 0.04 },
      0.02,
    );
    tl.fromTo(
      dotsContRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.03 },
      0.06,
    );
    tl.fromTo(
      panels[0].querySelector(".joby-h"),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.04 },
      0.09,
    );
    tl.fromTo(
      panels[0].querySelector(".joby-p"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.04 },
      0.14,
    );

    buildWipeTransition(tl, 0, 1, 0.26, layerImgs[0]);
    buildWipeTransition(tl, 1, 2, 0.5, layerImgs[1]);
    buildWipeTransition(tl, 2, 3, 0.74, layerImgs[2]);

    // Refresh after setup so GSAP measures correct positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
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
              <p className="font-body text-[0.7rem] tracking-[0.25em] text-gold/70 uppercase mb-3">
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
              <p className="font-body text-[0.7rem] tracking-[0.25em] text-gold/70 uppercase mb-3">
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
            <p className="font-body text-[0.7rem] tracking-[0.25em] text-gold/70 uppercase mb-4">
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
            <p className="font-body text-[0.7rem] tracking-[0.25em] text-gold/70 uppercase mb-4">
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
            <p className="font-body text-[0.7rem] tracking-[0.25em] text-gold/70 uppercase mb-6">
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
      <div
        ref={jobySpacerRef}
        style={{ height: "500vh", position: "relative" }}
      >
        <div
          ref={jobyPinnedRef}
          className="joby-pinned"
          id="jobyPinned"
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Full-screen image stack */}
          <div className="joby-image-wrap">
            {pillars.map((p, i) => (
              <img
                key={i}
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                className={`joby-img ${i === 0 ? "joby-img-base" : "joby-img-layer"}`}
                data-index={i}
                src={p.img}
                alt={p.alt}
              />
            ))}
          </div>

          {/* Dark gradient overlay — right side for text legibility */}
          <div className="joby-overlay" />

          {/* Dot nav — bottom left */}
          <div ref={dotsContRef} className="joby-dots">
            {pillars.map((_, i) => (
              <div
                key={i}
                className={`joby-dot${i === 0 ? " active" : ""}`}
                data-index={i}
              />
            ))}
          </div>

          {/* Text area — right side overlay */}
          <div className="joby-text-area">
            <div className="joby-category-stack">
              {pillars.map((p, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    catLabelsRef.current[i] = el;
                  }}
                  className="joby-cat-label"
                  data-cat={i}
                >
                  {p.cat}
                </span>
              ))}
            </div>

            <div ref={vertLineRef} className="joby-vert-line" />

            <div className="joby-text-panels">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    panelsRef.current[i] = el;
                  }}
                  className="joby-panel"
                  data-slide={i}
                >
                  <h2 className="joby-h">
                    {p.headline.split("\n").map((line, li) => (
                      <span key={li}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h2>
                  <p className="joby-p">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
