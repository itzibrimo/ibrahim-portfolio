"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { config } from "@/data/config";
import { education } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ABOUT — editorial identity block.
 *
 * Large statement + engineering metadata + education.
 * No badge strips, no card grid. The Engineering Layers section
 * carries the domain breakdown, so this section stays biographical.
 */
export function About() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-background"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              01
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              About
            </span>
          </div>
          <h2 className="text-fluid-heading text-section-heading max-w-[24ch] text-foreground">
            Software is only half of the system.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-fluid-subheading text-foreground/90 leading-[1.45] max-w-[38ch] mb-8">
              {config.about}
            </p>

            <p className="text-fluid-body text-muted leading-relaxed max-w-[58ch]">
              {config.aboutFull}
            </p>

            <div className="mt-10 border-t border-border pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {config.domains.map((domain) => (
                <div key={domain.label}>
                  <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-1.5">
                    {domain.label}
                  </p>
                  <p className="text-sm font-normal text-foreground leading-snug">
                    {domain.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education / technical metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2 }}
            className="lg:col-span-5"
          >
            <div className="border border-border bg-card">
              <div className="px-7 py-5 border-b border-border flex items-center justify-between gap-4">
                <h3 className="text-tech-label text-[0.65rem] uppercase text-muted">
                  Education
                </h3>
                <span className="text-tech-label text-[0.65rem] uppercase text-accent">
                  Engineering
                </span>
              </div>

              <div className="px-7 py-6">
                <p className="text-base font-normal text-foreground leading-snug mb-2">
                  {education.institution}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {education.degree}
                </p>
                <p className="mt-1 text-tech-label text-[0.65rem] uppercase text-muted">
                  {education.track}
                </p>
              </div>

              <div className="px-7 py-5 border-t border-border">
                <p className="text-tech-label text-[0.6rem] uppercase text-muted mb-3">
                  Working across
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    "Software Engineering",
                    "Embedded Systems",
                    "Computer Networks",
                    "Industrial Automation",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-[0.8rem] text-muted flex items-center gap-2"
                    >
                      <span
                        className="inline-block h-1 w-1 bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
