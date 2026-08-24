import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://corvix-pi.vercel.app";
const LAST_UPDATED = "August 24, 2026";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions governing use of the Corvix website and its published service information.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms & Conditions | Corvix", description: "Terms governing use of the Corvix website and service information.", url: `${SITE}/terms` },
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] px-5 pb-24 pt-40 sm:px-8 md:px-12 lg:px-20">
      <header className="mb-16 max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-corvix-accent">Legal</p>
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-corvix-text">Terms & Conditions</h1>
        <p className="mt-6 text-lg leading-relaxed text-corvix-muted">Last updated: {LAST_UPDATED}</p>
      </header>
      <div className="space-y-12 text-[15px] leading-7 text-corvix-muted">
        <section><h2>1. Acceptance</h2><p className="mt-3">By using the Corvix website, you agree to use it lawfully and in accordance with these Terms. If you do not agree, please do not use the website.</p></section>
        <section><h2>2. Website information</h2><p className="mt-3">The website provides general information about Corvix, its capabilities, examples of work, articles, and potential services. Website content may change without notice and is not a promise that any particular service, feature, price, timeline, or result will be available in every engagement.</p></section>
        <section><h2>3. Projects and proposals</h2><p className="mt-3">Submitting an inquiry does not create a client relationship, project agreement, or obligation to provide services. Project scope, deliverables, pricing, payment terms, timelines, responsibilities, intellectual-property terms, and other commercial terms should be set out in a written proposal, statement of work, or service agreement accepted by the parties.</p></section>
        <section><h2>4. Payments and changes</h2><p className="mt-3">Where Corvix provides a paid project, any deposits, milestones, refunds, change requests, cancellations, and other payment terms are governed by the applicable client agreement rather than this general website policy.</p></section>
        <section><h2>5. Intellectual property</h2><p className="mt-3">Unless a separate written agreement says otherwise, the Corvix website, brand, visual designs, source code, text, graphics, and other website materials are owned by Corvix or its licensors and may not be copied, republished, sold, or redistributed without permission.</p></section>
        <section><h2>6. Third-party services</h2><p className="mt-3">The website may link to or use third-party services. Their availability and terms are outside Corvix&apos;s control, and their separate terms and privacy policies may apply.</p></section>
        <section><h2>7. Business setup services</h2><p className="mt-3">Corvix may provide administrative or operational assistance relating to U.S. business formation, EIN applications, banking preparation, or related setup tasks. Unless expressly stated otherwise in a separate agreement, these services are not legal, tax, accounting, immigration, or financial advice.</p></section>
        <section><h2>8. AI services</h2><p className="mt-3">AI systems can produce inaccurate, incomplete, biased, or unexpected results. Where Corvix develops or integrates AI systems, clients remain responsible for reviewing outputs, setting appropriate controls, and making business decisions based on suitable human oversight.</p></section>
        <section><h2>9. Disclaimer of warranties</h2><p className="mt-3">To the extent permitted by applicable law, the website and its content are provided on an “as available” and “as is” basis without a guarantee that the website will always be uninterrupted, error-free, secure, or suitable for a particular purpose.</p></section>
        <section><h2>10. Limitation of liability</h2><p className="mt-3">To the extent permitted by applicable law, Corvix will not be liable for indirect, incidental, consequential, special, or punitive damages arising from use of the website or reliance on its general information. Any liability arising from a paid client engagement is governed primarily by the applicable written client agreement.</p></section>
        <section><h2>11. Prohibited use</h2><p className="mt-3">You may not use the website to violate law, infringe intellectual-property rights, interfere with website security, distribute malicious code, impersonate another person, or misuse contact forms or other site functionality.</p></section>
        <section><h2>12. Changes</h2><p className="mt-3">We may update these Terms when the website, services, or legal requirements change. Continued use after an update indicates acceptance of the revised Terms to the extent permitted by law.</p></section>
        <section><h2>13. Contact</h2><p className="mt-3">Questions about these Terms may be sent to <a className="text-white underline underline-offset-4" href="mailto:alibuildswebsites@gmail.com">alibuildswebsites@gmail.com</a>.</p></section>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-corvix-muted"><Link href="/privacy" className="mr-6 underline underline-offset-4 hover:text-white">Privacy Policy</Link><Link href="/disclaimer" className="underline underline-offset-4 hover:text-white">Disclaimer</Link></div>
    </article>
  );
}
