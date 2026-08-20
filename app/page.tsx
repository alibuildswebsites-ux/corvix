import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeHero from "@/components/HomeHero";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import Testimonials from "@/components/Testimonials";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="relative">
      <HomeHero />
      <Testimonials />
      <section id="services" className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="flex items-end justify-between mb-14"><div><p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">What We Do</p><h2 className="font-display font-bold text-5xl text-corvix-text">Services</h2></div><Link href="/services" className="hidden md:inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200">All services <ArrowUpRight size={14} /></Link></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
          <div className="mt-8 md:hidden"><Link href="/services" className="inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200">All services <ArrowUpRight size={14} /></Link></div>
        </div>
      </section>
      <section id="portfolio" className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="flex items-end justify-between mb-14"><div><p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">Our Work</p><h2 className="font-display font-bold text-5xl text-corvix-text">Portfolio</h2></div><Link href="/portfolio" className="hidden md:inline-flex items-center gap-1.5 text-corvix-muted hover:text-corvix-accent text-sm font-medium transition-colors duration-200">All work <ArrowUpRight size={14} /></Link></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{portfolioItems.map((item) => <PortfolioCard key={item.id} item={item} />)}</div>
        </div>
      </section>
      <section id="cta" className="border-t border-[rgba(255,255,255,0.08)]"><div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-20 md:py-32 text-center"><h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-tight text-corvix-text mb-6">Ready to build<br />something real?</h2><p className="text-corvix-muted text-xl mb-10 max-w-md mx-auto">Tell us what you&apos;re working on. We&apos;ll take it from idea to production.</p><Link href="/contact" className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors duration-200">Start a Project</Link></div></section>
    </div>
  );
}
