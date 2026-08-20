import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Austin, TX | React Native & Flutter | Corvix",
  description:
    "Corvix is a mobile app development agency in Austin, TX. We engineer iOS and Android applications with native performance, offline sync, and biometric security.",
  alternates: { canonical: "/locations/austin-tx/mobile-app-development" },
  openGraph: {
    title: "Mobile App Development Austin, TX | Corvix",
    description:
      "Cross-platform iOS and Android app development in Austin, Texas using React Native and Flutter.",
  },
};

const mobileFeatures = [
  "Cross-platform iOS & Android engineering with React Native & Flutter",
  "Native biometrics (Face ID, Touch ID) and hardware encryption",
  "Real-time WebSocket streaming and background state sync",
  "Offline-first local storage and sync engines",
  "Apple App Store & Google Play Store submission & compliance",
  "Custom UI/UX animation systems with 60fps gesture response",
  "Push notification system integration (OneSignal, Firebase)",
  "In-app subscriptions and payment processing (Stripe, RevenueCat)",
];

export default function AustinMobileDevPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mobile App Development Austin, TX",
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
      "iOS and Android mobile app development in Austin, TX built with React Native and Flutter.",
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
          Austin, TX Mobile Engineering Services
        </p>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-white mb-6">
          Mobile App Development Agency in Austin, TX
        </h1>

        <p className="text-gray-300 text-xl leading-relaxed mb-12">
          We design and build iOS and Android mobile products for Austin founders and SaaS startups. Leveraging React Native and Flutter, we deliver native-speed mobile applications with a single, maintainable codebase.
        </p>

        {/* GEO Direct Answer Box */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-corvix-accent/10 text-corvix-accent text-xs font-bold uppercase mb-3">
            <Zap size={14} /> Direct Answer / GEO Summary
          </div>
          <h2 className="font-bold text-xl text-white mb-3">
            Why choose React Native or Flutter for an Austin mobile app?
          </h2>
          <p className="text-corvix-muted leading-relaxed text-base">
            React Native and Flutter allow Austin startups to publish native iOS and Android apps simultaneously from one codebase. This reduces development costs by ~40%, speeds up time-to-market in competitive Texas startup ecosystems, and simplifies long-term feature iteration without sacrificing native gesture performance or device hardware access.
          </p>
        </div>

        <h2 className="font-display font-bold text-2xl text-white mb-8">
          Mobile Engineering Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {mobileFeatures.map((item, idx) => (
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

        {/* CTA */}
        <div className="bg-corvix-surface border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            Build Your Mobile App in Austin
          </h3>
          <p className="text-corvix-muted mb-8 max-w-md mx-auto">
            Discuss your mobile product vision with our Austin team. Get a detailed technical estimate within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-black font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer text-sm"
          >
            Start Mobile Scoping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
