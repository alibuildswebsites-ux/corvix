"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import StatCounter from "@/components/StatCounter";
import { useReveal } from "@/hooks/useReveal";

const methodology = [
  {
    step: "01",
    title: "Plan",
    description:
      "Every project starts with a clear spec. We define scope, architecture, and success criteria before writing a single line of code. No surprises.",
  },
  {
    step: "02",
    title: "Execute",
    description:
      "We build in focused sprints with frequent communication. No black-box development — you see progress at every stage.",
  },
  {
    step: "03",
    title: "Test",
    description:
      "Nothing ships untested. Every feature is verified against requirements before delivery. Quality is non-negotiable.",
  },
];

const stats = [
  { value: "5+", label: "Services" },
  { value: "24h", label: "Response Time" },
  { value: "100%", label: "Tested Code" },
  { value: "Global", label: "Client Reach" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        {/* Header */}
        <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
          Who We Are
        </p>
        <h1 data-reveal className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8 max-w-3xl">
          About Corvix
        </h1>
        <p data-reveal className="text-corvix-muted text-xl leading-relaxed mb-6 max-w-2xl">
          Corvix is a full-service digital agency built for startups, founders, and growing businesses.
          We combine technical depth with fast execution.
        </p>
        <p data-reveal className="text-corvix-muted text-xl leading-relaxed mb-24 max-w-2xl">
          We serve clients across the USA and internationally — fully remote, always reliable.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        {/* Methodology */}
        <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
          How We Work
        </p>
        <h2 data-reveal className="font-display font-bold text-4xl text-corvix-text mb-16">
          Plan. Execute. Test.
        </h2>
        <div className="space-y-12 mb-24">
          {methodology.map((m) => (
            <div key={m.step} data-reveal className="flex gap-8 items-start">
              <span className="font-display font-extrabold text-5xl text-corvix-accent/30 w-16 shrink-0 leading-none">
                {m.step}
              </span>
              <div className="pt-1">
                <h3 className="font-display font-bold text-2xl text-corvix-text mb-3">
                  {m.title}
                </h3>
                <p className="text-corvix-muted text-lg leading-relaxed max-w-xl">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-reveal className="bg-corvix-surface rounded-2xl p-12 text-center">
          <h3 className="font-display font-bold text-3xl text-corvix-text mb-3">
            Let&apos;s build something together
          </h3>
          <p className="text-corvix-muted text-lg mb-8 max-w-sm mx-auto">
            Tell us what you&apos;re working on — we&apos;ll respond within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
