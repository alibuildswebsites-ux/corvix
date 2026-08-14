"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap-init";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Sections on the home page that we track for active highlight
const homeSections = ["services", "portfolio", "cta"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // Move focus to the first menu link once the panel is mounted
    const t = window.setTimeout(() => firstMenuLinkRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open]);

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
    if (!isHome) { 
      // Safe to not sync active section if not home, handled by condition
      return; 
    }

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
      <motion.nav
        initial={false}
        animate={{ borderRadius: open ? "24px" : "32px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "fixed top-4 left-4 right-4 z-50 border border-[rgba(255,255,255,0.08)] overflow-hidden",
          scrolled || open
            ? "bg-[rgba(255,255,255,0.02)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 h-14 flex items-center justify-between">
          <div
            inert={open ? true : undefined}
            aria-hidden={open}
            className="flex items-center justify-between flex-1"
          >
            <Link
              href="/"
              className="font-display font-bold text-lg tracking-widest text-corvix-text hover:text-corvix-accent transition-colors duration-200 cursor-pointer"
            >
              CORVIX
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/services" className={linkClass("/services")}>Services</Link>
              <Link href="/portfolio" className={linkClass("/portfolio")}>Portfolio</Link>
              <Link href="/blog" className={linkClass("/blog")}>Blog</Link>
              <Link href="/about" className={linkClass("/about")}>About</Link>
              <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-200 text-black text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <button
            className="md:hidden -ml-2 p-2.5 -mr-2 flex items-center justify-center min-w-11 min-h-11 text-corvix-muted hover:text-corvix-text transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    ref={i === 0 ? firstMenuLinkRef : undefined}
                    href={link.href}
                    className="text-corvix-muted hover:text-corvix-text text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-200 text-black text-sm font-medium px-5 py-2 rounded-full text-center transition-colors duration-200 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
