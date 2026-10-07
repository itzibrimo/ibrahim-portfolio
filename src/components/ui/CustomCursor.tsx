"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorLabel {
  text: string;
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<CursorLabel | null>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      queueMicrotask(() => setIsTouch(true));
      return;
    }

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const addHoverListeners = () => {
      document.querySelectorAll("[data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setLabel({ text: el.getAttribute("data-cursor") || "" });
        });
        el.addEventListener("mouseleave", () => {
          setLabel(null);
        });
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block"
          animate={{ x: pos.x - 4, y: pos.y - 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={label ? { scale: 3, opacity: 0.6 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-medium tracking-[0.2em] uppercase whitespace-nowrap text-white"
            >
              {label.text}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
