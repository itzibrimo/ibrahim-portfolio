"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { philosophy } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * PHILOSOPHY — engineering principles.
 *
 * One editorial statement + four principles on a technical grid.
 * No numbered steppers, no decorative badges.
 */
export function Philosophy() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28 bg-background">
      <div className="container relative z-10" ref={ref}>
        <SectionHeading number="08" label="Philosophy" title="Engineering Principles" />

        {/* Core statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-light tracking-tight leading-[1.25] text-foreground max-w-[24ch] mb-16 md:mb-20"
          style={{ fontSize: "clamp(1.6rem, 3.6vw, 3rem)" }}
        >
          Purposeful systems that <span className="font-display italic">bridge</span> the
          digital and physical worlds.
        </motion.p>

        {/* Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border bg-border gap-px">
          {philosophy.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-background p-6 md:p-7"
            >
              <span className="text-tech-label text-[0.6rem] uppercase text-muted block mb-4">
                {item.number}
              </span>
              <h3 className="text-sm font-normal tracking-[0.08em] uppercase text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-[0.85rem] text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
