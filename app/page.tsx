import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-32">
        <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-8">
          Full-Service Digital Agency
        </p>
        <h1 className="font-display font-extrabold text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] tracking-tight text-corvix-text mb-10">
          Build.<br />
          Deploy.<br />
          <span className="text-corvix-accent">Scale.</span>
        </h1>
        <p className="text-corvix-muted text-xl max-w-lg leading-relaxed mb-12">
          Corvix delivers web apps, mobile products, cloud infrastructure,
          AI integrations, and business setup — under one roof.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            Start a Project <ArrowRight size={18} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-corvix-surface hover:border-corvix-accent text-corvix-text font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="border-t border-corvix-surface">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
                What We Do
              </p>
              <h2 className="font-display font-bold text-5xl text-corvix-text">
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
              <ServiceCard key={s.slug} service={s} />
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
      <section className="border-t border-corvix-surface">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
                Our Work
              </p>
              <h2 className="font-display font-bold text-5xl text-corvix-text">
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
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="border-t border-corvix-surface">
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-tight text-corvix-text mb-6">
            Ready to build<br />something real?
          </h2>
          <p className="text-corvix-muted text-xl mb-10 max-w-md mx-auto">
            Tell us what you&apos;re working on. We&apos;ll take it from idea to production.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-white font-semibold px-10 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
