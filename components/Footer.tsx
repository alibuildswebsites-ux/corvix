import Link from "next/link";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-corvix-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Wordmark */}
          <span className="font-display font-bold text-xl tracking-widest text-corvix-text">
            CORVIX
          </span>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-corvix-muted hover:text-corvix-text text-sm transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-corvix-muted text-sm">
            © {new Date().getFullYear()} Corvix
          </p>
        </div>
      </div>
    </footer>
  );
}
