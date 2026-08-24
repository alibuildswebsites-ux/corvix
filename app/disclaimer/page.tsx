import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://corvix-pi.vercel.app";
const LAST_UPDATED = "August 24, 2026";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers about Corvix website content, AI systems, software services, and business setup assistance.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { title: "Disclaimer | Corvix", description: "Important disclaimers for Corvix website content and services.", url: `${SITE}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] px-5 pb-24 pt-40 sm:px-8 md:px-12 lg:px-20">
      <header className="mb-16 max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-corvix-accent">Legal</p>
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-corvix-text">Disclaimer</h1>
        <p className="mt-6 text-lg leading-relaxed text-corvix-muted">Last updated: {LAST_UPDATED}</p>
      </header>
      <div className="space-y-12 text-[15px] leading-7 text-corvix-muted">
        <section><h2>1. General information</h2><p className="mt-3">Information on the Corvix website is provided for general informational and business-development purposes. It does not constitute professional advice tailored to your circumstances.</p></section>
        <section><h2>2. Software and AI</h2><p className="mt-3">Software, AI agents, chatbots, integrations, and automations can fail, produce unexpected outputs, or depend on third-party systems. Any examples, capabilities, performance claims, or technical descriptions should not be interpreted as a guarantee of a particular result in every environment.</p></section>
        <section><h2>3. Business formation assistance</h2><p className="mt-3">Corvix may assist with administrative steps related to U.S. business setup. This assistance is not a substitute for independent legal, tax, accounting, immigration, banking, or financial advice. Business formation, tax treatment, eligibility, filing requirements, and banking decisions depend on the facts and jurisdiction involved.</p></section>
        <section><h2>4. Third-party information</h2><p className="mt-3">Links, references, client examples, statistics, or third-party services may be included for context or convenience. Corvix does not guarantee the accuracy, availability, security, or continued operation of third-party websites or services.</p></section>
        <section><h2>5. Results</h2><p className="mt-3">Past project outcomes, testimonials, performance improvements, or other examples do not guarantee future results. Actual outcomes depend on the client&apos;s technology, data, budget, implementation, market conditions, internal processes, and other factors.</p></section>
        <section><h2>6. No client relationship</h2><p className="mt-3">Viewing this website, sending a contact form, or communicating with Corvix through ordinary website channels does not by itself create a legal, fiduciary, attorney-client, tax-advisor, or other professional relationship.</p></section>
        <section><h2>7. Contact</h2><p className="mt-3">For questions about this Disclaimer, contact <a className="text-white underline underline-offset-4" href="mailto:alibuildswebsites@gmail.com">alibuildswebsites@gmail.com</a>.</p></section>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-corvix-muted"><Link href="/privacy" className="mr-6 underline underline-offset-4 hover:text-white">Privacy Policy</Link><Link href="/terms" className="underline underline-offset-4 hover:text-white">Terms & Conditions</Link></div>
    </article>
  );
}
