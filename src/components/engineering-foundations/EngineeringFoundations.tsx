"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { foundations } from "@/data/technology";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ENGINEERING FOUNDATIONS
 *
 * Academic engineering layer beneath the tooling.
 * Each foundation gets a module card with a technical mark.
 */

const marks: Record<string, React.ReactNode> = {
  graph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 4L14 10M12 4L10 10M12 20L14 14M12 20L10 14M4 12L10 10M4 12L10 14M20 12L14 10M20 12L14 14" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 12h16M12 4v16" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 16h20M2 12h20M2 8h20M2 4h20" />
    </svg>
  ),
  topology: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
      <path d="M12 8v8M10 16H8M16 16h-8" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 12h5l2-6 2 12 2-6 2 6 2-6h5" />
    </svg>
  ),
  distribution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 4v16M4 12h16M12 4l4 4-4 4" />
    </svg>
  ),
  curve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 20c0-4 4-8 8-8s8 4 8 8" />
      <path d="M4 16c0-2 2-4 4-4s4 2 4 4" />
    </svg>
  ),
  timing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

export function EngineeringFoundations() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="foundations"
      ref={ref}
      className="relative py-20 md:py-28 bg-background"
    >
      <div className="container relative z-10">
        <SectionHeading
          number="04"
          label="Foundations"
          title="Engineering Foundations"
          description="The academic engineering layer beneath the tooling — concepts that shape how systems are understood and built."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border bg-border gap-px">
          {foundations.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.1 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-background p-6 md:p-8 transition-colors duration-300 hover:bg-surface/50"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="shrink-0 w-12 h-12 border border-border bg-surface flex items-center justify-center text-muted transition-colors duration-300 group-hover:text-foreground">
                  {marks[f.mark]}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-tech-label text-[0.6rem] uppercase text-muted mb-1.5 block">
                    {f.number}
                  </span>
                  <h3 className="text-lg font-normal text-foreground leading-snug">
                    {f.title}
                  </h3>
                </div>
              </div>

              <p className="text-[0.85rem] text-muted leading-relaxed">
                {f.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
