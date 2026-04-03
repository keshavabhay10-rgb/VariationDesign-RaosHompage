"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./ambianceGallery.module.css";

// ─── Panel Data ───────────────────────────────────────────────────────────────

interface Panel {
  image: string;
  overlayText: string;
  topLabel: string;
}

const PANELS: Panel[] = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop&q=80",
    overlayText: "Dalston's corner of fire, flavour, and warmth",
    topLabel: "Entrance",
  },
  {
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=1200&fit=crop&q=80",
    overlayText: "Where conversations come alive",
    topLabel: "Bar",
  },
  {
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=1200&fit=crop&q=80",
    overlayText: "Intimate gatherings, unforgettable moments",
    topLabel: "Private",
  },
  {
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=1200&fit=crop&q=80",
    overlayText: "Heritage spices, modern expression",
    topLabel: "Kitchen",
  },
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1200&fit=crop&q=80",
    overlayText: "Every detail considered",
    topLabel: "Interior",
  },
  {
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=1200&fit=crop&q=80",
    overlayText: "Artfully plated, joyfully shared",
    topLabel: "Plates",
  },
  {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1200&fit=crop&q=80",
    overlayText: "Fire-kissed perfection",
    topLabel: "Grill",
  },
  {
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=1200&fit=crop&q=80",
    overlayText: "Your table awaits",
    topLabel: "Terrace",
  },
];

// ─── Single Panel ─────────────────────────────────────────────────────────────

interface PanelProps {
  panel: Panel;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  totalPanels: number;
}

function AccordionPanel({ panel, index, hoveredIndex, onHover, totalPanels }: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const isOther = isAnyHovered && !isHovered;

  // Subtle 3D tilt on hover
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panelRef.current || !isHovered) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = panelRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateY: (x - 0.5) * 4,
        rotateX: (0.5 - y) * 3,
      });
    });
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt({ rotateX: 0, rotateY: 0 });
    onHover(null);
  }, [onHover]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Width calculation: hovered = 35%, others shrink proportionally
  let widthStyle: string;
  if (isHovered) {
    widthStyle = "35%";
  } else if (isOther) {
    widthStyle = `calc((100% - 35%) / ${totalPanels - 1})`;
  } else {
    widthStyle = `${100 / totalPanels}%`;
  }

  const panelClass = [
    styles.panel,
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
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` 
          : undefined,
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
      
      {/* Top label - editorial style */}
      <span className={styles.panelTopLabel}>{panel.topLabel}</span>
      
      {/* Bottom overlay with text */}
      <div className={styles.panelOverlay}>
        <span className={styles.panelOverlayText}>{panel.overlayText}</span>
      </div>
      
      {/* Panel index number */}
      <span className={styles.panelIndex}>
        {String(index + 1).padStart(2, "0")}
      </span>
      
      {/* Vertical divider line */}
      {index < totalPanels - 1 && <div className={styles.panelDivider} />}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function AmbianceGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="ambiance" className={styles.sectionWrapper}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>
          The Space. The Feeling. The Food.
        </h2>
      </header>

      <div className={styles.gallery}>
        {PANELS.map((panel, i) => (
          <AccordionPanel
            key={i}
            panel={panel}
            index={i}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
            totalPanels={PANELS.length}
          />
        ))}
      </div>
    </section>
  );
}
