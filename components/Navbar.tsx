"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Sections on the home page that we track for active highlight
const homeSections = ["services", "portfolio", "cta"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Scroll effect
    const trigger = ScrollTrigger.create({
      start: 50,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => { trigger.kill(); };
  }, []);

  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }

    const triggers = homeSections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(id),
        onLeaveBack: () => setActiveSection(null),
        onEnterBack: () => setActiveSection(id),
        onLeave: () => setActiveSection(null),
      });
    }).filter(Boolean);

    return () => { triggers.forEach((t) => t?.kill()); };
  }, [isHome]);

  const linkClass = (href: string, sectionId?: string) => {
    const isActive = isHome && sectionId
      ? activeSection === sectionId
      : pathname === href;
    return [
      "text-sm font-medium transition-colors duration-200 cursor-pointer",
      isActive ? "text-corvix-text" : "text-corvix-muted hover:text-corvix-text",
    ].join(" ");
  };

  return (
    <>
      <nav
        className={[
          "fixed top-4 left-4 right-4 z-50 border border-corvix-surface rounded-2xl transition-all duration-300",
          scrolled
            ? "bg-corvix-bg/95 shadow-lg shadow-black/20"
            : "bg-corvix-bg/80 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-widest text-corvix-text hover:text-corvix-accent transition-colors duration-200 cursor-pointer"
          >
            CORVIX
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className={linkClass("/services")}>Services</Link>
            <Link href="/portfolio" className={linkClass("/portfolio")}>Portfolio</Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link
              href="/contact"
              className="bg-corvix-accent hover:bg-corvix-accent-hover text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-corvix-muted hover:text-corvix-text transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-corvix-surface px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-corvix-muted hover:text-corvix-text text-sm font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-corvix-accent hover:bg-corvix-accent-hover text-white text-sm font-medium px-5 py-2 rounded-lg text-center transition-colors duration-200 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <div className="h-20" />
    </>
  );
}
