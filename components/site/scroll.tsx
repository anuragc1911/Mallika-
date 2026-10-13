"use client";

import * as React from "react";

/**
 * Writes the scroll progress through a tall, sticky-pinned section to `--p`
 * (0 when its top meets the viewport top, 1 when its bottom meets the
 * viewport bottom). CSS reads `--p`; React never re-renders on scroll.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Scroll-linked motion only moves when the visitor scrolls, so it stays on
    // under reduced motion; the autonomous fade-ins are what get switched off.
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

/** Adds `is-in` to every `[data-reveal]` element the first time it enters the viewport. */
export function RevealObserver() {
  React.useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
