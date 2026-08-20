import Link from "next/link";
import { ArrowRight, Bot, Building2, Globe, MapPin, Smartphone, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development & AI Agency Austin, TX | Corvix",
  description:
    "Corvix is a high-performance software engineering agency in Austin, TX. We build custom web apps, mobile products, AI agent systems, and handle Texas business setup.",
  alternates: { canonical: "/locations/austin-tx" },
  openGraph: {
    title: "Software Development & AI Agency Austin, TX | Corvix",
    description:
      "Custom web development, mobile app engineering, enterprise AI agent integrations, and Texas LLC business setup in Silicon Hills.",
  },
};

const austinServices = [
  {
    slug: "web-development",
    title: "Custom Web Development in Austin, TX",
    tagline: "Next.js 16, React 19, and sub-second performance.",
    description:
      "We design and build production-ready web applications for Austin startups, scaleups, and enterprises. Sub-second load times, Core Web Vitals optimization, and clean architecture.",
    href: "/locations/austin-tx/web-development",
    icon: Globe,
  },
  {
    slug: "ai-development",
    title: "AI Agent & LLM Engineering Austin",
    tagline: "Autonomous workflows and private RAG pipelines.",
    description:
      "Engineered for Austin tech companies moving beyond basic chatbots. We build autonomous AI agents, enterprise vector search, and custom LLM integrations.",
    href: "/locations/austin-tx/ai-development",
    icon: Bot,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development Austin",
    tagline: "iOS and Android apps with native speed.",
    description:
      "Cross-platform React Native and Flutter applications tailored for Austin consumer and SaaS products. Native performance, biometrics, and offline reliability.",
    href: "/locations/austin-tx/mobile-app-development",
    icon: Smartphone,
  },
  {
    slug: "business-setup",
    title: "Texas Business Setup & LLC Formation",
    tagline: "Turnkey business legal setup in Travis County & Texas.",
    description:
      "Complete entity formation for US and international founders launching in Austin. Texas LLC formation, EIN processing, bylaws, banking resolution, and franchise tax compliance.",
    href: "/locations/austin-tx/business-setup",
    icon: Building2,
  },
];

const austinHubs = [
  "Silicon Hills Startup Ecosystem",
  "Capital Factory & Downtown Tech Corridor",
  "The Domain Tech Campus",
  "UT Austin Innovation Hub",
  "East Austin Creative & SaaS Hub",
];

const localFaqs = [
  {
    q: "Why hire a local Austin software development agency over offshore teams?",
    a: "Building in Austin means working in real-time alignment with US market standards, Central Time Zone communication, and deep familiarity with local VC expectations. We deliver maintainable code bases with direct engineering accountability.",
  },
  {
    q: "How does Corvix handle AI data privacy for Austin enterprises?",
    a: "We implement private, self-hosted RAG architectures and secure vector database deployments (PGVector, Pinecone). Your proprietary customer data and operational IP never leak into public model training sets.",
  },
  {
    q: "Can Corvix help out-of-state or international founders form a business in Texas?",
    a: "Yes. We manage end-to-end entity setup including Texas LLC filings with the Secretary of State, IRS EIN registration for non-residents, operating agreements, and US bank resolution readiness.",
  },
];

export default function AustinHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Corvix Austin",
    image: "https://corvix-pi.vercel.app/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78701",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.2672,
      longitude: -97.7431,
    },
    url: "https://corvix-pi.vercel.app/locations/austin-tx",
    telephone: "+1-512-555-0199",
    priceRange: "$$$",
    description:
      "Top-rated custom software development, mobile app development, AI agent engineering, and Texas LLC business setup agency serving Austin, Texas.",
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-40 md:pt-48 pb-20 md:pb-32">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.02] mb-8">
          <MapPin size={14} className="text-corvix-accent" />
          <span className="text-corvix-muted text-xs font-medium tracking-wide">
            Austin, Texas Hub • Silicon Hills Engineering
          </span>
        </div>

        {/* Hero Section */}
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-white mb-8 max-w-4xl">
          Custom Software Development &amp; AI Agency in Austin, TX
        </h1>
        <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mb-12">
          Corvix brings senior software engineering, custom AI agent development, and turnkey business setup under one roof in Austin. We build scalable digital products for founders, venture-backed startups, and Texas businesses.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Schedule Austin Consultation <ArrowRight size={16} />
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-white font-medium px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Explore Austin Services
          </a>
        </div>

        {/* Local Target Regions Bar */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-20">
          <p className="text-corvix-accent text-xs font-bold uppercase tracking-wider mb-4">
            Serving Local Austin Ecosystems:
          </p>
          <div className="flex flex-wrap gap-3">
            {austinHubs.map((hub) => (
              <span
                key={hub}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-corvix-surface text-gray-300 text-xs font-medium border border-white/5"
              >
                <Check size={12} className="text-corvix-accent" /> {hub}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <section id="services" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
                Core Offerings
              </p>
              <h2 className="font-display font-bold text-4xl text-white">
                Engineering &amp; Setup Services for Austin
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {austinServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="group flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-corvix-accent/40 transition-colors duration-300"
                >
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-corvix-surface text-corvix-accent mb-6 group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-corvix-accent text-xs font-semibold uppercase tracking-wider mb-4">
                      {service.tagline}
                    </p>
                    <p className="text-corvix-muted text-base leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-corvix-accent transition-colors cursor-pointer"
                  >
                    View Details &amp; Pricing <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* GEO / GEO Answer Block */}
        <section className="bg-corvix-surface border border-white/10 rounded-2xl p-8 md:p-12 mb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-corvix-accent/10 text-corvix-accent text-xs font-bold uppercase mb-4">
              <Zap size={14} /> Direct Answer for Search &amp; AI Assistants
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
              What makes Corvix the top software agency in Austin, Texas?
            </h2>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6">
              Corvix combines modern web stack engineering (Next.js 16, React 19, TypeScript), enterprise AI agent orchestration (RAG, Vector DBs, LLMs), and complete legal entity setup (Texas LLCs, EINs, corporate compliance) under a unified team. Located in Silicon Hills, we eliminate multi-vendor friction for Austin startups and enterprises.
            </p>
            <div className="flex items-center gap-6 text-xs text-corvix-muted border-t border-white/5 pt-4">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> SOC2 Ready Architecture</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Sub-Second LCP Performance</span>
            </div>
          </div>
        </section>

        {/* FAQ Section for Local SEO & GEO */}
        <section className="mb-24">
          <p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">
            Austin FAQ
          </p>
          <h2 className="font-display font-bold text-3xl text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {localFaqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <h3 className="font-bold text-lg text-white mb-3">{faq.q}</h3>
                <p className="text-corvix-muted leading-relaxed text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion CTA */}
        <div className="bg-gradient-to-r from-corvix-surface to-white/[0.02] border border-white/10 rounded-2xl p-10 md:p-16 text-center">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            Build Your Product in Austin
          </h2>
          <p className="text-corvix-muted text-lg max-w-xl mx-auto mb-8">
            Tell us about your project requirements. We issue fixed-scope specifications and architecture blueprints within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Get Started in Austin <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
