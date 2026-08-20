import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Business Setup & LLC Formation Support in Austin, TX",
  description:
    "Business formation and administrative setup support for founders in Austin, Texas, including entity filing coordination, EIN assistance, governance documents, and banking documentation.",
  alternates: { canonical: "/locations/austin-tx/business-setup" },
  openGraph: {
    title: "Texas Business Setup & LLC Formation Support in Austin, TX",
    description:
      "Business formation and administrative setup support in Austin, Texas, including entity filing coordination, EIN assistance, governance documentation, and banking paperwork.",
  },
};

const businessFeatures = [
  "Texas LLC formation and entity filing coordination with the Texas Secretary of State",
  "Wyoming & Delaware entity formation coordination for tech founders",
  "IRS EIN (Employer Identification Number) application assistance for U.S. and international founders",
  "Governance document preparation support (Operating Agreements, Bylaws)",
  "Banking Resolution letters and fintech stack advisory (Mercury, Relay)",
  "Administrative support for Texas business-tax registrations and related records",
  "Registered Agent service coordination in Travis County & Texas",
  "Current FinCEN BOI-status guidance and coordination when a reporting obligation applies",
];

export default function AustinBusinessSetupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Texas Business Setup & LLC Formation Support in Austin, TX",
    provider: { "@type": "Organization", name: "Corvix" },
    areaServed: "Austin, Texas",
    description:
      "Business formation, EIN assistance, governance documentation, and administrative setup support for startups in Austin, TX.",
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
          Launching a business in Texas involves entity formation, federal identification, governance documentation, and banking readiness. Corvix provides administrative setup support for Austin founders and coordinates qualified professional assistance when legal or tax advice is required.
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
            International and out-of-state founders can establish a business in Austin through entity formation or foreign qualification, registered-agent coordination, EIN assistance, governance documentation, and banking setup. Under the current FinCEN rule, U.S.-created companies are exempt from BOI reporting; certain foreign entities registered to do business in the U.S. may still have reporting obligations. Review current FinCEN guidance or consult qualified counsel for case-specific advice.
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-8">
          Business Setup &amp; Administrative Support
        </h2>
        <p className="text-corvix-muted text-sm leading-relaxed mb-8 max-w-3xl">
          Corvix provides administrative business-setup assistance and coordinates qualified third-party professionals when legal or tax advice is required. Information on this page is general and is not legal or tax advice.
        </p>

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
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-corvix-accent" /> Texas business-tax setup support</span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            Form Your Texas LLC in Austin
          </h3>
          <p className="text-corvix-muted mb-8 max-w-md mx-auto">
            Get your U.S. business setup organized and bank-ready. Contact our Austin team for administrative support and professional coordination where needed.
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
