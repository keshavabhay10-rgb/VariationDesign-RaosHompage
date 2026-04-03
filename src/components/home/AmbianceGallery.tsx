"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./ambianceGallery.module.css";

// ─── Panel Data ───────────────────────────────────────────────────────────────

interface Panel {
  type: 1 | 2; // 1 = TALL (top-anchored), 2 = SHORT (bottom-anchored)
  image: string;
  overlayText: string;
}

const PANELS: Panel[] = [
  {
    type: 1,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop",
    overlayText: "Welcome to Rao's",
  },
  {
    type: 2,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    overlayText: "Crafted with Care",
  },
  {
    type: 1,
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=1200&fit=crop",
    overlayText: "Gather Together",
  },
  {
    type: 2,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    overlayText: "A Taste of Tradition",
  },
  {
    type: 1,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1200&fit=crop",
    overlayText: "Warm Hospitality",
  },
  {
    type: 2,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    overlayText: "Sharing Plates",
  },
  {
    type: 1,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1200&fit=crop",
    overlayText: "The Dining Room",
  },
  {
    type: 2,
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",
    overlayText: "Your Table Awaits",
  },
];

// ─── Single Panel ─────────────────────────────────────────────────────────────

interface PanelProps {
  panel: Panel;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

function AccordionPanel({ panel, index, hoveredIndex, onHover }: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const isOther = isAnyHovered && !isHovered;

  // Magnetic 3D tilt via requestAnimationFrame
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panelRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = panelRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateY: (x - 0.5) * 8,
        rotateX: (0.5 - y) * 6,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ rotateX: 0, rotateY: 0 });
    onHover(null);
  }, [onHover]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Width: hovered = 45%, others shrink equally, default = equal split
  let widthStyle: string;
  if (isHovered) {
    widthStyle = "45%";
  } else if (isOther) {
    widthStyle = "calc((100% - 45%) / 7)";
  } else {
    widthStyle = "12.5%";
  }

  const panelClass = [
    styles.panel,
    panel.type === 1 ? styles.panelTall : styles.panelShort,
    isHovered ? styles.panelHovered : "",
    isOther ? styles.panelOther : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={panelRef}
      className={panelClass}
      style={{
        width: widthStyle,
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={panel.image}
        alt={panel.overlayText}
        className={styles.panelImage}
        loading="lazy"
      />
      <div className={styles.panelOverlay}>
        <span className={styles.panelOverlayText}>{panel.overlayText}</span>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function AmbianceGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="ambiance" className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          The Space. The Feeling. The Food.
        </h2>
        <p className={styles.headerSubtitle}>
          Dalston&apos;s corner of fire, flavour, and warmth.
        </p>
      </div>

      <div className={styles.gallery}>
        {PANELS.map((panel, i) => (
          <AccordionPanel
            key={i}
            panel={panel}
            index={i}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  );
}
