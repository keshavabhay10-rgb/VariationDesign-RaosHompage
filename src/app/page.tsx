"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import SizzlerSection from "@/components/home/SizzlerSection";
import MenuHighlights from "@/components/home/MenuHighlights";
import ReviewsSection from "@/components/home/ReviewsSection";
import AmbianceGallery from "@/components/home/AmbianceGallery";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Staggered init — prevents pinSpacing:false miscalculation
    // when multiple pinned sections exist on the same page.
    // Each double-RAF gives the browser two paint frames to settle
    // layout measurements between GSAP ScrollTrigger inits.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // QH gallery (Section 3) deferred init
        ScrollTrigger.sort();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Joby pillars (Section 2 Half 2) deferred sort
            ScrollTrigger.sort();

            requestAnimationFrame(() => {
              // Final refresh after all pins are registered
              ScrollTrigger.refresh();
            });
          });
        });
      });
    });
  }, []);

  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <SizzlerSection />
      <MenuHighlights />
      <ReviewsSection />
      <AmbianceGallery />
    </>
  );
}
