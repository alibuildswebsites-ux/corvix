import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Business Setup & LLC Formation Austin, TX | Corvix",
  description:
    "Corvix provides business formation, Texas LLC filing, IRS EIN registration, operating agreements, and banking setup for US and global founders in Austin, TX.",
  alternates: { canonical: "/locations/austin-tx/business-setup" },
  openGraph: {
    title: "Texas Business Setup & LLC Formation Austin, TX | Corvix",
    description:
      "Turnkey Texas LLC formation, EIN registration, corporate compliance, and banking resolution in Austin, Texas.",
  },
};

const businessFeatures = [
  "Strategic Texas LLC formation with Texas Secretary of State",
  "Wyoming & Delaware entity structuring for tech founders",
  "IRS EIN (Employer Identification Number) processing for US & international founders",
  "Custom Corporate Governance Docs (Operating Agreements, Bylaws)",
  "Banking Resolution letters and fintech stack advisory (Mercury, Relay)",
  "Texas Franchise Tax registration & compliance setup",
  "Registered Agent service coordination in Travis County & Texas",
  "BOI (Beneficial Ownership Information) filing compliance",
];

export default function AustinBusinessSetupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Texas Business Setup & LLC Formation Austin, TX",
    provider: {
      "@type": "LocalBusiness",
      name: "Corvix Austin",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    areaServed: "Austin, Texas",
    description:
      "Turnkey LLC business formation, IRS EIN processing, and compliance documentation for startups in Austin, TX.",
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
          Austin, TX Business Services
        </p>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-white mb-6">
          Texas Business Setup &amp; LLC Formation in Austin, TX
        </h1>

        <p className="text-gray-300 text-xl leading-relaxed mb-12">
          Launching a business in Texas requires precise legal legal structuring, federal EIN compliance, and banking readiness. Corvix handles the entire corporate setup lifecycle for local Austin founders and international entrepreneurs moving to Silicon Hills.
        </p>

        {/* GEO Direct Answer Box */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-corvix-accent/10 text-corvix-accent text-xs font-bold uppercase mb-3">
            <Zap size={14} /> Direct Answer / GEO Summary
          </div>
          <h2 className="font-bold text-xl text-white mb-3">
            How do non-resident founders establish a business in Austin, Texas?
          </h2>
          <p className="text-corvix-muted leading-relaxed text-base">
            International and out-of-state founders establish a business in Austin by filing a Texas LLC (or foreign qualification) with the Texas Secretary of State, registering a local Texas Registered Agent, obtaining an IRS Employer Identification Number (EIN) via Form SS-4, drafting an Operating Agreement, and submitting BOI reports. Corvix manages this entire process remotely.
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-8">
          Business Setup &amp; Legal Compliance Included
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {businessFeatures.map((item, idx) => (
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

        {/* Local Advantage */}
        <div className="border-t border-white/10 pt-12 mb-16">
          <h3 className="font-display font-bold text-xl text-white mb-4">
            Why Texas is the Premier Jurisdiction for Tech Founders
          </h3>
          <p className="text-corvix-muted leading-relaxed mb-6">
            Texas offers zero personal state income tax, competitive corporate filing fees, and a business-friendly legal environment centered around Austin’s expanding capital network. We make sure your entity is structured properly from day one to accept venture capital or bootstrap efficiently.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-corvix-muted">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> IRS SS-4 Processing</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Texas Franchise Tax Setup</span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            Form Your Texas LLC in Austin
          </h3>
          <p className="text-corvix-muted mb-8 max-w-md mx-auto">
            Get your US company legally compliant and bank-ready. Contact our Austin business setup specialists today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Start Business Formation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
