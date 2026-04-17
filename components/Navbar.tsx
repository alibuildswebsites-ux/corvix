"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating navbar */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-corvix-bg/80 backdrop-blur-md border border-corvix-surface rounded-2xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-widest text-corvix-text hover:text-corvix-accent transition-colors duration-200 cursor-pointer"
          >
            CORVIX
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-corvix-muted hover:text-corvix-text text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-corvix-accent hover:bg-corvix-accent-hover text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-corvix-muted hover:text-corvix-text transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
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

      {/* Spacer so content doesn't hide behind floating navbar */}
      <div className="h-20" />
    </>
  );
}
