"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionHeadingProps {
  number?: string;
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

/**
 * SectionHeading — the single header system used by every section.
 * Mono index + label, fluid display title, readable muted description.
 * Renders identically with animations disabled.
 */
export function SectionHeading({
  number,
  label,
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      {(number || label) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          {number && (
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              {number}
            </span>
          )}
          {number && label && (
            <span className="h-px w-8 bg-border" aria-hidden="true" />
          )}
          {label && (
            <span className="text-tech-label text-[0.6875rem] uppercase text-muted">
              {label}
            </span>
          )}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="text-fluid-heading text-section-heading max-w-[26ch] text-foreground"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-fluid-body mt-4 max-w-[58ch] text-muted"
          style={align === "center" ? { margin: "1rem auto 0" } : undefined}
        >
          {description}
        </motion.p>
      )}
      {children}
    </div>
  );
}
