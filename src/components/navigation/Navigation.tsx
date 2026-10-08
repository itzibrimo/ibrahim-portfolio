"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/data/config";
import { useTheme } from "@/components/layout/ThemeProvider";

const THEME_LABEL: Record<string, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking — the section crossing the middle of the viewport
  useEffect(() => {
    const ids = config.navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const cycleTheme = () => {
    const order: (typeof theme)[] = ["light", "dark", "system"];
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  };

  const icon = theme === "light" ? "◐" : theme === "dark" ? "●" : "○";

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-xs focus:text-foreground"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between gap-6">
          <a
            href="#home"
            className="text-tech-label text-[0.6875rem] uppercase text-foreground whitespace-nowrap"
          >
            {config.shortName}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {config.navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-tech-label text-[0.65rem] uppercase transition-colors duration-300 py-1 ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop utilities */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <button
              onClick={cycleTheme}
              className="text-sm text-muted hover:text-foreground transition-colors duration-300 leading-none"
              aria-label={`${THEME_LABEL[theme]} — switch theme`}
              title={`${THEME_LABEL[theme]} — switch theme`}
            >
              {icon}
            </button>
            <Link
              href="/cv"
              className="text-tech-label text-[0.65rem] uppercase text-muted hover:text-foreground transition-colors duration-300"
            >
              View CV
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2 w-11 h-11"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-foreground origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-foreground"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-foreground origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-7">
              {config.navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-light tracking-[0.18em] uppercase text-foreground"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.3 }}
                className="flex items-center gap-8 mt-4"
              >
                <button
                  onClick={cycleTheme}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  aria-label={`${THEME_LABEL[theme]} — switch theme`}
                >
                  {icon}
                </button>
                <Link
                  href="/cv"
                  className="text-tech-label text-[0.7rem] uppercase text-muted hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View CV
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
