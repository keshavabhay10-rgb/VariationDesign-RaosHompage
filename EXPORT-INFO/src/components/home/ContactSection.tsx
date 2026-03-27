"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: "Monday", time: "17:00 – 23:00" },
  { day: "Tuesday", time: "17:00 – 23:00" },
  { day: "Wednesday", time: "17:00 – 23:00" },
  { day: "Thursday", time: "17:00 – 23:00" },
  { day: "Friday", time: "12:00 – 00:00" },
  { day: "Saturday", time: "12:00 – 00:00" },
  { day: "Sunday", time: "12:00 – 23:00" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(infoRef.current, {
      y: 30, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
    gsap.from(mapRef.current, {
      y: 30, opacity: 0, duration: 0.8, delay: 0.2,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-bg-primary" id="contact">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12 max-w-[1100px] mx-auto">
        <div ref={infoRef}>
          <h2 className="font-display text-3xl font-semibold text-text-primary mb-8">Find Us</h2>

          {/* Address */}
          <div className="flex gap-4 mb-6 items-start">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-gold fill-none stroke-[1.5]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-[0.1em] uppercase text-gold mb-1">Address</div>
              <div className="text-[0.95rem] text-text-primary leading-relaxed">230B Dalston Ln<br />Hackney Downs, London E8 1LA</div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 mb-6 items-start">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-gold fill-none stroke-[1.5]">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-[0.1em] uppercase text-gold mb-1">Phone</div>
              <a href="tel:02037378112" className="text-[0.95rem] text-text-primary hover:text-gold transition-colors">020 3737 8112</a>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 mb-6 items-start">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-gold fill-none stroke-[1.5]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-[0.1em] uppercase text-gold mb-1">Email</div>
              <a href="mailto:info.raos.london@gmail.com" className="text-[0.95rem] text-text-primary hover:text-gold transition-colors">info.raos.london@gmail.com</a>
            </div>
          </div>

          {/* Hours */}
          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4">Opening Hours</h3>
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-text-secondary">{h.day}</span>
                <span className="text-text-primary">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={mapRef} className="rounded-xl overflow-hidden border border-white/5 min-h-[400px] bg-bg-card map-dark">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.5!2d-0.0637!3d51.5495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761c6b2a4f0b0b%3A0x1234567890abcdef!2s230B+Dalston+Ln%2C+London+E8+1LA!5e0!3m2!1sen!2suk!4v1234567890"
            className="w-full h-full min-h-[400px] border-0"
            allowFullScreen
            loading="lazy"
            title="Rao's Bar & Restaurant location"
          />
        </div>
      </div>
    </section>
  );
}
