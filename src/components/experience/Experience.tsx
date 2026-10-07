"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * EXPERIENCE — engineering field record.
 *
 * Large editorial cards, not a corporate timeline. The most recent and
 * relevant entry (Tunisie Telecom) is visually dominant; the industrial
 * internship is secondary; the upcoming PFE is rendered as planned work,
 * clearly marked — never as completed experience.
 */

function ExperienceCard({ exp, index }: { exp: (typeof experience)[0]; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const primary = exp.primary ?? false;
  const upcoming = exp.upcoming ?? false;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduced ? 0 : 0.55,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      {/* Subtle vertical connector between cards (desktop) */}
      {index > 0 && (
        <span
          className="hidden md:block absolute -top-6 left-[7.5rem] h-6 w-px bg-border/50"
          aria-hidden="true"
        />
      )}

      <article
        className={`relative border bg-card/40 backdrop-blur-none transition-colors duration-300 ${
          primary
            ? "border-border-strong p-8 md:p-12 lg:p-14"
            : upcoming
              ? "border-dashed border-border/60 p-7 md:p-9"
              : "border-border/50 p-7 md:p-9 hover:border-border-strong"
        }`}
      >
        {/* Year — strong hierarchy */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-1">
          <span
            className={`font-display leading-none tracking-tight ${
              primary
                ? "text-6xl md:text-7xl text-foreground"
                : "text-4xl md:text-5xl text-foreground/85"
            } ${upcoming ? "italic text-muted/70" : ""}`}
          >
            {exp.year}
          </span>
          {primary && (
            <span className="text-tech-label text-[0.6rem] uppercase tracking-[0.18em] text-accent">
              Current
            </span>
          )}
          {upcoming && (
            <span className="text-tech-label text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Planned
            </span>
          )}
        </div>

        {/* Organization + role */}
        <h3
          className={`font-light tracking-tight text-foreground mt-4 ${
            primary ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {exp.organization}
        </h3>
        <p className="text-tech-label text-[0.7rem] uppercase tracking-[0.12em] text-muted mt-1.5">
          {exp.role}
        </p>
        <p className="text-tech-label text-[0.62rem] uppercase tracking-[0.1em] text-muted/70 mt-1">
          {exp.environment}
        </p>

        {/* Description */}
        <p
          className={`text-muted leading-relaxed mt-5 max-w-[64ch] ${
            primary ? "text-[0.95rem]" : "text-[0.875rem]"
          }`}
        >
          {exp.description}
        </p>

        {/* Technical areas */}
        <div className="flex flex-wrap gap-2 mt-6">
          {exp.areas.map((area) => (
            <span
              key={area}
              className={`text-tech-label text-[0.6rem] uppercase tracking-[0.08em] border px-2.5 py-1 ${
                primary
                  ? "border-border-strong text-foreground/80"
                  : "border-border/60 text-muted"
              }`}
            >
              {area}
            </span>
          ))}
        </div>

        {/* GitHub — project work produced during this experience */}
        {exp.source && (
          <div className="mt-6">
            <a
              href={exp.source}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 h-9 px-4 text-tech-label text-[0.62rem] uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                primary
                  ? "border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground"
                  : "border border-border text-muted hover:border-border-strong hover:text-foreground"
              }`}
            >
              View on GitHub
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}
      </article>
    </motion.li>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);

  const primary = experience.filter((e) => e.primary);
  const past = experience.filter((e) => !e.primary && !e.upcoming);
  const upcoming = experience.filter((e) => e.upcoming);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-20 md:py-28 bg-background"
    >
      <div className="container relative z-10">
        <SectionHeading
          number="07"
          label="Experience"
          title="Field Experience"
          description="Real engineering environments — telecommunications infrastructure, industrial automation, and planned engineering work."
        />

        <ol className="space-y-8 md:space-y-10">
          {/* Primary entry — visually dominant */}
          {primary.map((exp, i) => (
            <ExperienceCard key={exp.organization} exp={exp} index={i} />
          ))}

          {/* Secondary entries */}
          {past.map((exp, i) => (
            <ExperienceCard
              key={exp.organization}
              exp={exp}
              index={primary.length + i}
            />
          ))}

          {/* Upcoming — subtle, clearly not completed */}
          {upcoming.map((exp, i) => (
            <ExperienceCard
              key={exp.year}
              exp={exp}
              index={primary.length + past.length + i}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
