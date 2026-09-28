"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Shifts its child slightly as the block moves through the viewport. */
export function ScrollFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const delta = (center - view / 2) / view;
      const y = Math.max(-24, Math.min(24, delta * -36));
      node.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
