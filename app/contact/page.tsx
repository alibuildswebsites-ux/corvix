"use client";
import { useRef } from "react";
import ContactForm from "@/components/ContactForm";
import PageWrapper from "@/components/PageWrapper";
import { useReveal } from "@/hooks/useReveal";
import { Mail, Clock, Globe } from "lucide-react";

const FORMSPREE_ID = "xvzdawkj";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@corvix.io",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours on business days",
  },
  {
    icon: Globe,
    label: "Locations",
    value: "USA & International — fully remote",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-6xl mx-auto px-6 pt-12 pb-20 md:pb-32">
        <p data-reveal className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-5">
          Let&apos;s Talk
        </p>
        <h1 data-reveal className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-corvix-text mb-8">
          Get in Touch
        </h1>
        <p data-reveal className="text-corvix-muted text-xl mb-20 max-w-xl leading-relaxed">
          Tell us about your project. We respond within 24 hours.
        </p>

        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <ContactForm formId={FORMSPREE_ID} />

          {/* Contact info */}
          <div className="space-y-8 lg:pt-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-corvix-surface shrink-0">
                  <Icon size={18} className="text-corvix-accent" />
                </div>
                <div>
                  <p className="text-corvix-muted text-xs font-medium tracking-wide uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-corvix-text font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
