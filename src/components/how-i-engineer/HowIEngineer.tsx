"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { engineeringProcess } from "@/data/technology";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HOW I ENGINEER — "signal path" layout.
 *
 * Six stages rendered as full-width editorial rows.
 * A scroll-linked signal travels down the left rail on desktop.
 * No 1/6 → 6/6 step badges. No generic timeline or bento grid.
 * Reading it feels like tracing a signal through a schematic.
 */

function StageDetails({ details }: { details: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Stage focus">
      {details.map((d) => (
        <li
          key={d}
          className="text-tech-label text-[0.575rem] uppercase text-muted/80 flex items-center gap-2"
        >
          <span className="inline-block h-px w-3 bg-border-strong" aria-hidden="true" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export function HowIEngineer() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-i-engineer"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">04</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">Process</span>
          </div>
          <h2 className="text-fluid-heading text-section-heading max-w-[22ch] text-foreground">
            How I Engineer
          </h2>
          <p className="text-fluid-body mt-4 max-w-[52ch] text-muted">
            One continuous signal path — from problem to production. Trace it
            top to bottom; every stage is a place I actually work.
          </p>
        </div>

        {/* Signal path pipeline */}
        <div className="relative" aria-label="Engineering process pipeline">
          {/* Left signal rail — desktop only */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-border/40"
            aria-hidden="true"
          />
          <motion.div
            className="hidden lg:block absolute left-0 top-0 w-px bg-accent origin-top"
            style={reduced ? { height: "100%" } : { scaleY: progress, height: "100%" }}
            aria-hidden="true"
          />

          <ol>
            {engineeringProcess.map((stage, i) => {
              const alt = i % 2 === 1;
              return (
                <motion.li
                  key={stage.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: reduced ? 0 : 0.5,
                    delay: reduced ? 0 : i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative lg:pl-14 border-b border-border/40 last:border-b-0 py-8 md:py-10"
                >
                  {/* Node on the signal rail */}
                  <span
                    className="hidden lg:flex absolute left-0 top-11 -translate-x-1/2 h-[9px] w-[9px] rounded-full border border-accent bg-background items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="h-[3px] w-[3px] rounded-full bg-accent" />
                  </span>

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-baseline ${
                      alt ? "lg:direction-rtl" : ""
                    }`}
                  >
                    {/* Stage name — alternating weight creates editorial rhythm */}
                    <div className={`lg:col-span-4 ${alt ? "lg:text-right" : ""}`}>
                      <span className="block text-tech-label text-[0.6rem] text-muted/50 mb-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display italic text-3xl md:text-4xl lg:text-[2.5rem] text-foreground leading-none">
                        {stage.title}
                      </h3>
                    </div>

                    {/* Description + details */}
                    <div className="lg:col-span-8">
                      <p className="text-[0.9rem] leading-relaxed text-muted mb-3 max-w-[56ch]">
                        {stage.description}
                      </p>
                      <StageDetails details={stage.detail} />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Terminal — the signal ends in production */}
          <div className="relative lg:pl-14 pt-6">
            <p className="text-tech-label text-[0.65rem] uppercase tracking-[0.14em] text-muted/50">
              Output → a system running in the real world
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
