"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function HomeHero() {
  const [ready, setReady] = useState(false);
  const handleHeroReady = useCallback(() => setReady(true), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center pt-24 pb-24">
      <div className={`absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        <Suspense fallback={null}><HeroCanvas onReady={handleHeroReady} /></Suspense>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[1200px] sm:h-[1200px] spotlight rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-corvix-bg to-transparent" />
      </div>
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col items-center" data-reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.02] mb-8">
            <span className="w-2 h-2 rounded-full bg-corvix-accent animate-pulse" />
            <span className="text-corvix-muted text-xs font-medium tracking-wide">Corvix 2.0 is live</span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[1.05] tracking-tight mb-8 text-white [text-shadow:0_0_20px_rgba(255,255,255,0.15)]">We build software<br />that scales.</h1>
          <p className="text-gray-300 text-[1.25rem] max-w-2xl mx-auto leading-relaxed mb-12">Corvix delivers web apps, mobile products, AI integrations, and business setup, all under one roof purpose-built for speed and scale.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">Start a Project <ArrowRight size={16} /></Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-[#ffffff05] border border-[rgba(255,255,255,0.08)] hover:bg-[#ffffff0a] text-corvix-text font-medium px-6 py-3 rounded-lg transition-colors duration-200 text-sm">View Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
