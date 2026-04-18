"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AnimatePresenceWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <main key={pathname}>{children}</main>
    </AnimatePresence>
  );
}
