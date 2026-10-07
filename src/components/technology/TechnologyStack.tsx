"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stackDomains, type StackItem } from "@/data/technology";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * TECHNOLOGY STACK — engineered domain modules.
 *
 * Real brand logos where a genuine mark exists. Concepts, standards and
 * protocols (SQL, VHDL, GRAFCET, Modbus, RS-485…) are rendered as deliberate
 * typographic marks — never fake logos, never emoji.
 *
 * Layout: a continuous technical sheet. Cards share hairline borders like
 * modules on a drawing; wide domains span both columns on desktop.
 */

/** Brand logo, or a typographic mark for concepts without one. */
function TechMark({ item }: { item: StackItem }) {
  if (item.logo) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-surface">
        <Image
          src={`/assets/technologies/${item.logo}.svg`}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] object-contain"
        />
      </span>
    );
  }

  // Concept / standard / protocol — a technical designation, not a brand mark.
  const mark = item.mark ?? item.name.slice(0, 3).toUpperCase();
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-surface">
      <span className="font-mono text-[0.6rem] font-medium tracking-[0.02em] text-muted">
        {mark}
      </span>
    </span>
  );
}

function StackCard({
  domain,
  delay,
  animate,
}: {
  domain: (typeof stackDomains)[number];
  delay: number;
  animate: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative bg-background p-7 md:p-9 transition-colors duration-300 hover:bg-surface/50 ${
        domain.wide ? "lg:col-span-2" : ""
      }`}
    >
      {/* Module header */}
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-light tracking-tight text-foreground">
            {domain.title}
          </h3>
        </div>
        <span className="text-tech-label text-[0.65rem] uppercase text-muted shrink-0 pt-1">
          {domain.number}
        </span>
      </div>

      {/* Domain description */}
      <p className="text-[0.875rem] text-muted leading-relaxed max-w-[62ch] mb-7">
        {domain.description}
      </p>

      {/* Technology modules */}
      <ul
        className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${
          domain.wide ? "xl:grid-cols-3" : ""
        }`}
      >
        {domain.items.map((item) => (
          <li
            key={`${domain.id}-${item.name}`}
            className="flex items-center gap-3 border border-border/70 bg-card px-3 py-2.5 transition-colors duration-200 hover:border-border-strong"
            title={item.context}
          >
            <TechMark item={item} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.85rem] font-normal text-foreground truncate">
                {item.name}
              </span>
              <span className="text-tech-label text-[0.575rem] uppercase text-muted mt-1 truncate">
                {item.context}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function TechnologyStack() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="relative py-20 md:py-28 bg-background">
      <div className="container relative z-10" ref={ref}>
        <SectionHeading
          number="03"
          label="Technology"
          title="Technology Stack"
          description="Real tools grouped by engineering domain — the instruments behind the layers, not a wall of logos."
        />

        {/* Technical sheet — cards share hairline borders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-border bg-border gap-px">
          {stackDomains.map((domain, i) => (
            <StackCard
              key={domain.id}
              domain={domain}
              delay={(i % 2) * 0.06}
              animate={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
