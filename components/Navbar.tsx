"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const homeSections = ["services", "portfolio", "cta"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = homeSections.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      const next = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
      if (next && next[1] > 0.05) setActiveSection(next[0]);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.25, 0.5, 0.75] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const first = firstMenuLinkRef.current;
      const last = lastMenuLinkRef.current;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => firstMenuLinkRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open]);

  const linkClass = (href: string) => {
    const active = !isHome && (pathname === href || pathname.startsWith(`${href}/`));
    return `text-sm font-medium transition-colors duration-200 ${active ? "text-corvix-text" : "text-corvix-muted hover:text-corvix-text"}`;
  };
  const homeLinkClass = (section: string) => `text-sm font-medium transition-colors duration-200 ${activeSection === section ? "text-corvix-text" : "text-corvix-muted hover:text-corvix-text"}`;

  return (
    <motion.nav
      initial={false}
      animate={{ borderRadius: open ? "24px" : "32px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Primary navigation"
      className={`fixed top-4 left-4 right-4 z-50 border border-[rgba(255,255,255,0.08)] overflow-hidden ${scrolled || open ? "bg-[rgba(255,255,255,0.02)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-widest text-corvix-text hover:text-corvix-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded transition-colors duration-200">CORVIX</Link>
        <div className="hidden md:flex items-center gap-8">
          {isHome ? <><a href="#services" className={homeLinkClass("services")}>Services</a><a href="#portfolio" className={homeLinkClass("portfolio")}>Portfolio</a><Link href="/about" className={linkClass("/about")}>About</Link><Link href="/contact" className={linkClass("/contact")}>Contact</Link></> : navLinks.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
          <Link href="/contact" className="bg-white hover:bg-gray-200 text-black text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200">Start a Project</Link>
        </div>
        <button type="button" className="md:hidden p-2.5 -mr-2 flex items-center justify-center min-w-11 min-h-11 text-corvix-muted hover:text-corvix-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors duration-200" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
      </div>

      <AnimatePresence initial={false}>
        {open && <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
          <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link, index) => <Link key={link.href} ref={index === 0 ? firstMenuLinkRef : undefined} href={link.href} className="text-corvix-muted hover:text-corvix-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded text-sm font-medium transition-colors duration-200" onClick={() => setOpen(false)}>{link.label}</Link>)}
            <Link ref={lastMenuLinkRef} href="/contact" className="bg-white hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-black text-sm font-medium px-5 py-2 rounded-full text-center transition-colors duration-200" onClick={() => setOpen(false)}>Start a Project</Link>
          </div>
        </motion.div>}
      </AnimatePresence>
    </motion.nav>
  );
}
