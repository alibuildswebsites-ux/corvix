"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function ScrollRevealRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  return <div ref={rootRef}>{children}</div>;
}
