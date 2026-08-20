"use client";

import { useEffect, useRef, useState } from "react";

interface Props { value: string; label: string; }

function parseValue(raw: string): { num: number | null; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { num: null, suffix: raw };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function StatCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const { num, suffix } = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || num === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry], currentObserver) => {
      if (!entry.isIntersecting) return;
      currentObserver.disconnect();
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.round(num * eased)}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, num, suffix]);

  return <div ref={ref} className="bg-corvix-surface rounded-2xl p-4 md:p-6 text-center"><p className="font-display font-extrabold text-3xl md:text-4xl text-corvix-accent mb-1">{display}</p><p className="text-corvix-muted text-xs md:text-sm">{label}</p></div>;
}
