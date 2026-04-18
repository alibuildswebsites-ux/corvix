"use client";
import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

export function useReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      // Show immediately — no animation
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 40 });

    const triggers = Array.from(elements).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        },
        once: true,
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [containerRef]);
}
