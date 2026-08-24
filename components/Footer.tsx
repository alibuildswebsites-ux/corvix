import Link from "next/link";
import { services } from "@/data/services";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Start a Project" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 pt-16 sm:px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.07] pb-12 md:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Link href="/" className="w-fit font-display text-[20px] font-bold tracking-widest text-corvix-text">CORVIX</Link>
            <p className="max-w-[250px] text-[14px] leading-[1.65] text-corvix-muted">Software development, AI engineering, and business setup for startups and growing companies.</p>
            <p className="text-[13px] text-corvix-muted/60">Austin, Texas · USA</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-corvix-muted/55">Services</span>
            <ul className="flex flex-col gap-2.5">
              {services.slice(0, 4).map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`} className="text-[14px] text-corvix-muted transition-colors duration-150 hover:text-corvix-text">{service.title}</Link></li>)}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span aria-hidden="true" className="text-[11px] font-medium uppercase tracking-[0.08em] text-transparent">Services</span>
            <ul className="flex flex-col gap-2.5">
              {services.slice(4).map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`} className="text-[14px] text-corvix-muted transition-colors duration-150 hover:text-corvix-text">{service.title}</Link></li>)}
              {services.length < 5 && <li><Link href="/services" className="text-[14px] text-corvix-muted transition-colors duration-150 hover:text-corvix-text">View all services</Link></li>}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-corvix-muted/55">Company</span>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => <li key={link.href + link.label}><Link href={link.href} className="text-[14px] text-corvix-muted transition-colors duration-150 hover:text-corvix-text">{link.label}</Link></li>)}
            </ul>
            <a href="mailto:alibuildswebsites@gmail.com" className="mt-2 w-fit text-[14px] text-corvix-muted transition-colors duration-150 hover:text-corvix-text">alibuildswebsites@gmail.com</a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-8 text-[13px] text-corvix-muted/60 sm:grid-cols-3 sm:items-center">
          <p className="text-left">© {new Date().getFullYear()} Corvix. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-center">{legalLinks.map((link) => <Link key={link.href} href={link.href} className="transition-colors duration-150 hover:text-corvix-text">{link.label}</Link>)}</div>
          <p className="text-left sm:text-right">Built for speed. Designed to scale.</p>
        </div>
      </div>
    </footer>
  );
}
