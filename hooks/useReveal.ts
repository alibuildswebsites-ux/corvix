"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { RefObject } from "react";

export function useReveal(containerRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!elements.length) return;

    if (prefersReducedMotion) {
      gsap.set(elements, { clearProps: "all" });
      return;
    }

    elements.forEach((element) => {
      const y = Number(element.dataset.revealY ?? 18);
      const blur = Number(element.dataset.revealBlur ?? 8);
      const delay = Number(element.dataset.revealDelay ?? 0);
      const duration = Number(element.dataset.revealDuration ?? 1.05);

      gsap.set(element, {
        autoAlpha: 0,
        y,
        filter: `blur(${blur}px)`,
        willChange: "transform, opacity, filter",
      });

      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power2.out",
        clearProps: "filter,willChange",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, {
    scope: containerRef,
    dependencies: [prefersReducedMotion],
    revertOnUpdate: true,
  });
}
