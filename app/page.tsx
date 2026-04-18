"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import PageWrapper from "@/components/PageWrapper";
import { useReveal } from "@/hooks/useReveal";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  return (
    <PageWrapper>
      <div ref={pageRef} className="relative">
        {/* ── Fixed/Absolute 3D Background Wallpaper ── */}
        <div className="absolute top-0 left-0 right-0 w-full h-[100vh] overflow-hidden z-0 pointer-events-none">
          <HeroCanvas />
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[1200px] sm:h-[1200px] spotlight rounded-full z-0" />
          {/* Bottom fade out gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-corvix-bg to-transparent z-10" />
        </div>

        {/* ── Hero Content ─────────────────────────────────────────────── */}
        <section className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 min-h-[100vh] flex flex-col items-center justify-center text-center pt-24 pb-24">
          <div className="flex flex-col items-center">
            <div data-reveal className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.02] mb-8">
              <span className="w-2 h-2 rounded-full bg-corvix-accent animate-pulse" />
              <span className="text-corvix-muted text-xs font-medium tracking-wide">Corvix 2.0 is live</span>
            </div>
            
            <h1 data-reveal className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[1.05] tracking-tight mb-8 text-white [text-shadow:0_0_20px_rgba(255,255,255,0.15)]">
              We build software<br />
              that scales.
            </h1>
            
            <p data-reveal className="text-gray-300 text-[1.25rem] max-w-2xl mx-auto leading-relaxed mb-12">
              Corvix delivers web apps, mobile products, AI integrations, and business setup — under one roof purpose-built for speed and scale.
            </p>
            
            <div data-reveal className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-[#ffffff05] border border-[rgba(255,255,255,0.08)] hover:bg-[#ffffff0a] text-corvix-text font-medium px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer text-sm"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section id="services" className="border-t border-[rgba(255,255,255,0.08)]">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
                  What We Do
                </p>
                <h2 data-reveal className="font-display font-bold text-5xl text-corvix-text">
                  Services
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden md:inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                All services <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <div key={s.slug} data-reveal>
                  <ServiceCard service={s} />
                </div>
              ))}
            </div>
            <div className="mt-8 md:hidden">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                All services <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Portfolio ─────────────────────────────────────────── */}
        <section id="portfolio" className="border-t border-[rgba(255,255,255,0.08)]">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
                  Our Work
                </p>
                <h2 data-reveal className="font-display font-bold text-5xl text-corvix-text">
                  Portfolio
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                All work <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolioItems.map((item) => (
                <div key={item.id} data-reveal>
                  <PortfolioCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section id="cta" className="border-t border-[rgba(255,255,255,0.08)]">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-20 md:py-32 text-center">
            <h2 data-reveal className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-tight text-corvix-text mb-6">
              Ready to build<br />something real?
            </h2>
            <p data-reveal className="text-corvix-muted text-xl mb-10 max-w-md mx-auto">
              Tell us what you&apos;re working on. We&apos;ll take it from idea to production.
            </p>
            <div data-reveal>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
