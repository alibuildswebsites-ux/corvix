"use client";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface Props {
  value: string;
  label: string;
}

function parseValue(raw: string): { num: number | null; suffix: string } {
  // Match leading digits, then optional suffix
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { num: null, suffix: raw };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function StatCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const { num, suffix } = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || num === null) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTimeout(() => setDisplay(value), 0);
      return;
    }

    setTimeout(() => setDisplay("0" + suffix), 0);

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: "power1.out",
          onUpdate: () => {
            setDisplay(Math.round(obj.val) + suffix);
          },
          onComplete: () => {
            setDisplay(value); // ensure exact final value
          },
        });
      },
    });

    return () => { trigger.kill(); };
  }, [value, num, suffix]);

  return (
    <div ref={ref} className="bg-corvix-surface rounded-2xl p-6 text-center">
      <p className="font-display font-extrabold text-4xl text-corvix-accent mb-1">
        {display}
      </p>
      <p className="text-corvix-muted text-sm">{label}</p>
    </div>
  );
}
