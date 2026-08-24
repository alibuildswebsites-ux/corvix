import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://corvix-pi.vercel.app";
const LAST_UPDATED = "August 24, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the Corvix website and contact services.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | Corvix", description: "How Corvix handles information submitted through its website and contact form.", url: `${SITE}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-[1000px] px-5 pb-24 pt-40 sm:px-8 md:px-12 lg:px-20">
      <header className="mb-16 max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-corvix-accent">Legal</p>
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-corvix-text">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-relaxed text-corvix-muted">Last updated: {LAST_UPDATED}</p>
      </header>
      <div className="space-y-12 text-[15px] leading-7 text-corvix-muted">
        <section><h2>1. Overview</h2><p className="mt-3">Corvix respects your privacy. This Privacy Policy explains what information we collect through this website, why we collect it, how we use it, and the choices available to you.</p></section>
        <section><h2>2. Information you provide</h2><p className="mt-3">When you contact Corvix through our project form, you may provide your name, email address, selected service, and message or project details. We use that information to review your inquiry, communicate with you, and determine whether we can provide the requested services.</p></section>
        <section><h2>3. Form processing provider</h2><p className="mt-3">Our contact form is processed through Formspree. Information submitted through the form is transmitted to Formspree so the submission can be delivered and processed. Formspree may process information according to its own privacy terms in addition to this policy.</p><p className="mt-3">We do not use the contact form to request passwords, payment-card details, government identification numbers, or other sensitive information. Please do not submit information you do not want transmitted through the form.</p></section>
        <section><h2>4. Automatically collected technical information</h2><p className="mt-3">Our hosting and infrastructure may process basic technical information needed to deliver, secure, and troubleshoot the website, such as IP address, browser or device characteristics, request timestamps, and server logs. We do not currently operate a separate behavioral advertising or analytics tracking system on this website.</p></section>
        <section><h2>5. Cookies and similar technologies</h2><p className="mt-3">The website does not currently use a separate advertising-pixel or analytics-cookie system operated by Corvix. Essential technologies used by the hosting platform or browser may still be present as part of normal web delivery, security, or functionality.</p></section>
        <section><h2>6. How we use information</h2><p className="mt-3">We may use information to respond to inquiries, discuss projects, provide requested services, protect the website against misuse, maintain security, and operate or improve the website.</p></section>
        <section><h2>7. Sharing</h2><p className="mt-3">We may share information with service providers that help us operate the website or process contact submissions, such as Formspree and hosting/infrastructure providers. We may also disclose information where reasonably necessary to comply with law, protect rights or safety, prevent abuse, or respond to lawful requests.</p></section>
        <section><h2>8. Retention and security</h2><p className="mt-3">We retain inquiry information for as long as reasonably necessary for legitimate business, communication, record-keeping, security, or legal purposes. We use commercially reasonable measures appropriate to the information and our operations, but no internet transmission or storage system can be guaranteed completely secure.</p></section>
        <section><h2>9. Your choices</h2><p className="mt-3">You can contact us to ask questions about information you submitted, request correction of inaccurate information, or ask about deletion where applicable. Legal rights can vary depending on where you live and the circumstances of the processing.</p></section>
        <section><h2>10. Children</h2><p className="mt-3">This website is intended for business and professional audiences and is not directed to children under 13. We do not knowingly request personal information from children through the contact form.</p></section>
        <section><h2>11. Changes</h2><p className="mt-3">We may update this Privacy Policy when our website, services, data practices, or legal requirements change. The latest version will be posted on this page with an updated date.</p></section>
        <section><h2>12. Contact</h2><p className="mt-3">For privacy questions, contact <a className="text-white underline underline-offset-4" href="mailto:alibuildswebsites@gmail.com">alibuildswebsites@gmail.com</a>.</p></section>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-corvix-muted"><Link href="/terms" className="mr-6 underline underline-offset-4 hover:text-white">Terms & Conditions</Link><Link href="/disclaimer" className="underline underline-offset-4 hover:text-white">Disclaimer</Link></div>
    </article>
  );
}
