import { services } from "@/data/services";
import { blogPosts, type BlogPost } from "@/data/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bot, Building2, Check, ChevronRight, Globe, Smartphone, Zap, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Bot,
  Building2,
};

// Keyword terms used to relate a service to relevant blog posts.
// Matching is a soft tag/keyword overlap so it never depends on slug shape.
const SERVICE_TERMS: Record<string, string[]> = {
  "web-development": [
    "next.js",
    "react",
    "web",
    "ui",
    "performance",
    "cls",
    "layout",
    "enterprise",
    "scaling",
  ],
  "mobile-development": ["mobile", "react native", "flutter", "app"],
  "ai-integrations": [
    "ai",
    "llm",
    "rag",
    "agent",
    "chatbot",
    "autonomous",
    "gpt",
    "orchestration",
    "knowledge",
  ],
  "business-setup": [
    "llc",
    "ein",
    "business",
    "compliance",
    "non-resident",
    "founder",
    "startup",
    "irs",
  ],
};

// Relate a service to blog posts by keyword overlap, ranked by score.
// Falls back to the latest posts so the section is never empty.
function getRelatedPosts(serviceSlug: string, limit: number): BlogPost[] {
  const terms = SERVICE_TERMS[serviceSlug] ?? [];
  const scored = blogPosts
    .map((post) => {
      const haystack = [post.slug, post.title, post.excerpt, ...post.keywords]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((acc, term) => acc + (haystack.includes(term) ? 1 : 0), 0);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return scored.slice(0, limit).map(({ post }) => post);
  }
  return blogPosts.slice(0, limit);
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  const title = `${service.title} | Corvix`;
  const description = service.description;

  return {
    title,
    description,
    alternates: { canonical: "/services/" + service.slug },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICONS[service.iconName] ?? Zap;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Corvix",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technical Stack",
      "itemListElement": service.details.map((detail) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": detail,
        },
      })),
    },
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-40 md:pt-48 pb-20 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent text-sm font-medium mb-12 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} /> All Services
      </Link>

      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-corvix-surface mb-8">
        <Icon size={24} className="text-corvix-accent" />
      </div>

      <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tight text-corvix-text mb-4">
        {service.title}
      </h1>
      <p className="text-corvix-accent text-lg font-semibold mb-8">
        {service.tagline}
      </p>
      <p className="text-corvix-muted text-xl leading-relaxed mb-16 max-w-2xl">
        {service.description}
      </p>

      <h2 className="font-display font-bold text-2xl text-corvix-text mb-8">
        What&apos;s included
      </h2>
      <ul className="space-y-4 mb-20">
        {service.details.map((detail) => (
          <li key={detail} className="flex items-start gap-3">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-corvix-accent/10 mt-0.5 shrink-0">
              <Check size={12} className="text-corvix-accent" />
            </div>
            <span className="text-corvix-muted leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>

      <div className="bg-corvix-surface border border-corvix-surface rounded-2xl p-10 text-center mb-12">
        <h3 className="font-display font-bold text-2xl text-corvix-text mb-3">
          Ready to get started?
        </h3>
        <p className="text-corvix-muted mb-8">
          Tell us about your project. We&apos;ll respond within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Start a Project
        </Link>
      </div>

      {/* Technical Insight | Related Reading */}
      <div className="border-t border-white/5 pt-12">
        <h3 className="text-white font-bold text-lg mb-6">Technical Insight</h3>
        <div className="flex flex-col gap-4">
          {getRelatedPosts(service.slug, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-[rgba(255,255,255,0.08)] hover:border-corvix-accent/30 transition-colors cursor-pointer"
            >
              <div className="min-w-0">
                <p className="text-corvix-accent text-xs font-bold uppercase tracking-wider mb-2">
                  {post.category}
                </p>
                <p className="text-corvix-text font-semibold group-hover:text-white transition-colors duration-200">
                  {post.title}
                </p>
              </div>
              <ChevronRight size={16} className="text-corvix-muted mt-1 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
