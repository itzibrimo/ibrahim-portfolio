"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { engineeringLayers } from "@/data/technology";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ENGINEERING LAYERS — the replacement for the old "Engineering System" map.
 *
 * Six stratified layers, read top-down like a system stack: software at the
 * top, deployment at the bottom. An editorial engineering table — no fake
 * nodes, no decorative diagrams — that stays fully readable with animations
 * disabled.
 */

export function EngineeringLayers() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="engineering-layers"
      ref={ref}
      className="relative py-20 md:py-28 bg-background"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              02
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              System
            </span>
          </div>
          <h2 className="text-fluid-heading text-section-heading max-w-[22ch] text-foreground">
            Engineering Layers
          </h2>
          <p className="text-fluid-body mt-4 max-w-[54ch] text-muted">
            I read systems as layers — from code and computation down to
            hardware, communication, intelligence and deployment. Each layer is
            a place I work in.
          </p>
        </div>

        {/* The layered stack */}
        <div className="border-t border-border">
          {engineeringLayers.map((layer, i) => (
            <motion.div
              key={layer.number}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.45,
                delay: reduced ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative border-b border-border"
            >
              {/* Hover tint — the layer lifts out of the stack */}
              <div
                className="absolute inset-0 pointer-events-none bg-surface opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-[6rem_1fr_17rem] md:gap-10 items-baseline py-7 md:py-9">
                {/* Number + depth marker */}
                <div className="flex items-center gap-3 md:gap-0 md:flex-col md:items-start">
                  <span className="text-tech-label text-[0.7rem] text-muted transition-colors duration-300 group-hover:text-accent">
                    {layer.number}
                  </span>
                  <span
                    className="hidden md:block mt-2 h-px bg-border-strong transition-all duration-300 group-hover:w-8 group-hover:bg-accent w-5"
                    aria-hidden="true"
                  />
                </div>

                {/* Layer identity */}
                <div className="mt-2 md:mt-0">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground leading-tight">
                    {layer.title}
                  </h3>
                  <p className="mt-2 text-fluid-body-sm text-muted leading-relaxed max-w-[58ch]">
                    {layer.description}
                  </p>
                </div>

                {/* Spec column */}
                <ul
                  className="mt-4 md:mt-0 flex flex-wrap md:flex-col gap-2 md:gap-1.5"
                  aria-label={`${layer.title} scope`}
                >
                  {layer.spec.map((spec) => (
                    <li
                      key={spec}
                      className="text-tech-label text-[0.65rem] uppercase text-muted border border-border px-2.5 py-1 md:border-0 md:px-0 md:py-0 flex items-center gap-2.5"
                    >
                      <span
                        className="hidden md:inline-block h-1 w-1 bg-accent"
                        aria-hidden="true"
                      />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reading direction */}
        <p className="mt-6 text-tech-label text-[0.65rem] uppercase text-muted flex items-center gap-3">
          <svg width="10" height="22" viewBox="0 0 10 22" fill="none" aria-hidden="true">
            <path
              d="M5 1v19M1.5 16.5l3.5 4 3.5-4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </svg>
          Read top to bottom — from software down to deployment
        </p>
      </div>
    </section>
  );
}
