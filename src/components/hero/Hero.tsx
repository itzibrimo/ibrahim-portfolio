"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/data/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HERO — cinematic introduction.
 *
 * Layered composition: video → color grade → atmospheric light →
 * typography → metadata. The video path points at the real asset
 * (/assets/hero/workspace.mp4); grading lives in globals.css so both
 * themes integrate the footage instead of covering it with a grey wash.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* 1 — Video + fallback */}
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          poster="/assets/hero/hero-poster.svg"
          className="hero-video"
          preload="metadata"
        >
          <source src="/assets/hero/workspace.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2 — Color grade + atmospheric light */}
      <div className="hero-grade" aria-hidden="true" />

      {/* 3 — Readability gradients (only where text sits) */}
      <div className="hero-shade-top" aria-hidden="true" />
      <div className="hero-shade-left" aria-hidden="true" />

      {/* 4 — Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div
          className="w-full"
          style={{
            paddingInline: "clamp(1.5rem, 5vw, 6rem)",
            paddingTop: "7rem",
            paddingBottom: "5rem",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-20">
              {/* Identity */}
              <div className="flex-1 min-w-0 max-w-[680px]">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease, delay: 0.05 }}
                  className="text-tech-label text-[0.6875rem] uppercase text-muted mb-6"
                >
                  Computer Engineering Student
                </motion.p>

                {/* Single H1 — both name lines live inside it */}
                <h1 className="mb-6 font-display text-fluid-hero text-foreground leading-[1.02] tracking-[-0.025em]">
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.9, ease, delay: 0.1 }}
                    className="block italic"
                  >
                    {config.firstName}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.9, ease, delay: 0.16 }}
                    className="block"
                  >
                    {config.lastName}
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, ease, delay: 0.22 }}
                  className="text-fluid-body-sm text-muted mb-9 max-w-[52ch] leading-relaxed"
                >
                  {config.heroDescription}
                </motion.p>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease, delay: 0.28 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="#projects"
                    className="btn-base border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground text-[0.7rem] tracking-[0.12em]"
                  >
                    Selected Work
                  </a>
                  <a
                    href="#contact"
                    className="btn-base border border-border text-muted hover:border-border-strong hover:text-foreground text-[0.7rem] tracking-[0.12em]"
                  >
                    Get in Touch
                  </a>
                  <a
                    href={config.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-base border border-border text-muted hover:border-border-strong hover:text-foreground text-[0.7rem] tracking-[0.12em] inline-flex items-center gap-2"
                  >
                    GitHub
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={config.cvPath}
                    download="CV_Ibrahim_Sbouai.pdf"
                    className="btn-base border border-border text-muted hover:border-border-strong hover:text-foreground text-[0.7rem] tracking-[0.12em] inline-flex items-center gap-2"
                  >
                    Download CV
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M5 1v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Metadata panel — desktop only */}
              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: 0.4 }}
                className="hidden lg:grid grid-cols-[auto_auto] gap-x-10 gap-y-5 text-right border-l border-border pl-10 shrink-0"
              >
                <dt className="text-tech-label text-[0.6rem] uppercase text-muted self-baseline">
                  Location
                </dt>
                <dd className="text-sm text-foreground self-baseline">{config.location}</dd>

                <dt className="text-tech-label text-[0.6rem] uppercase text-muted self-baseline">
                  Focus
                </dt>
                <dd className="text-sm text-foreground self-baseline">
                  Embedded Systems &amp; IoT
                </dd>

                <dt className="text-tech-label text-[0.6rem] uppercase text-muted self-baseline">
                  Domains
                </dt>
                <dd className="text-sm text-muted self-baseline">
                  Software × Hardware × Communication
                </dd>

                <dt className="text-tech-label text-[0.6rem] uppercase text-muted self-baseline">
                  Portfolio
                </dt>
                <dd className="text-sm text-muted self-baseline">{config.year}</dd>
              </motion.dl>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showScroll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: reduced ? 0 : 2.4, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted"
              aria-hidden="true"
            >
              <span className="text-tech-label text-[0.55rem] uppercase">Scroll</span>
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                <path
                  d="M6 1v16M2 11l4 5 4-5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
