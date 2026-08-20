import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Development Agency Austin, TX | Next.js 16 & React 19",
  description:
    "Corvix is a custom web development agency in Austin, TX. We engineer fast, scalable Next.js and React 19 web applications for Austin startups and enterprises.",
  alternates: { canonical: "/locations/austin-tx/web-development" },
  openGraph: {
    title: "Custom Web Development Agency Austin, TX",
    description:
      "High-performance Next.js 16, React 19, and Tailwind CSS 4 web development in Austin, Texas. Sub-second load times and zero layout shifts.",
  },
};

const features = [
  "Next.js 16 App Router & Server Actions architecture",
  "React 19 Server Components for instant page transitions",
  "Core Web Vitals and LCP performance optimization",
  "Layout-stable animation architecture with CSS and WebGL",
  "Headless CMS integration (Sanity, Contentful, Strapi)",
  "Custom REST & GraphQL API integrations",
  "Tailwind CSS 4 zero-runtime styling engine",
  "Full WCAG 2.1 AA accessibility & Core Web Vitals optimization",
];

export default function AustinWebDevPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Web Development Austin, TX",
    provider: { "@type": "Organization", name: "Corvix" },
    areaServed: "Austin, Texas",
    description:
      "High-performance web application development services in Austin, TX using Next.js 16, React 19, and modern TypeScript stack.",
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-40 md:pt-48 pb-20 md:pb-32">
        <Link
          href="/locations/austin-tx"
          className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent text-sm font-medium mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Austin Agency Hub
        </Link>

        <p className="text-corvix-accent text-xs font-bold uppercase tracking-[0.25em] mb-4">
          Austin, TX Engineering Services
        </p>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-white mb-6">
          Custom Web Development Agency in Austin, TX
        </h1>

        <p className="text-gray-300 text-xl leading-relaxed mb-12">
          We architect production-grade web applications for Austin tech ventures, VC-backed startups, and Texas businesses. Built on Next.js 16, React 19, and TypeScript, our web products combine performance-focused engineering with interactive visual polish.
        </p>

        {/* GEO Direct Answer Box */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-corvix-accent/10 text-corvix-accent text-xs font-bold uppercase mb-3">
            <Zap size={14} /> Quick Summary / GEO Citation
          </div>
          <h2 className="font-bold text-xl text-white mb-3">
            How does Corvix build custom websites in Austin?
          </h2>
          <p className="text-corvix-muted leading-relaxed text-base">
            Corvix engineers web applications in Austin, TX using Next.js 16, React 19, and Tailwind CSS 4. We focus on Core Web Vitals, layout stability, modular architecture, technical SEO, headless CMS support, and API integrations.
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-8">
          Web Engineering Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-5 h-5 rounded-full bg-corvix-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-corvix-accent" />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        {/* Technical Standards Section */}
        <div className="border-t border-white/10 pt-12 mb-16">
          <h3 className="font-display font-bold text-xl text-white mb-4">
            Why Austin Startups Choose Next.js 16
          </h3>
          <p className="text-corvix-muted leading-relaxed mb-6">
            Austin’s startup ecosystem demands web software that can scale from launch to Series A without complete rewrites. Next.js 16 Partial Prerendering (PPR) allows us to serve static content instantly while fetching dynamic user data asynchronously in parallel.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-corvix-muted">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Server-Side Rendering (SSR)</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Incremental Static Regeneration (ISR)</span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            Start Your Web Project in Austin
          </h3>
          <p className="text-corvix-muted mb-8 max-w-md mx-auto">
            Discuss your technical requirements with our Austin engineering team. We deliver custom estimates within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Request Austin Scoping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
