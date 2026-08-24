"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") || "").trim()) return;
    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-corvix-bg border border-[rgba(255,255,255,0.08)] focus:border-corvix-accent focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl px-4 py-3.5 text-corvix-text placeholder:text-corvix-muted outline-none transition-colors duration-200 text-sm";

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="space-y-5">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden"><label htmlFor="_gotcha">Leave this field empty</label><input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="name">Name</label><input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} placeholder="Your name" /></div>
        <div><label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} placeholder="you@company.com" /></div>
      </div>
      <div><label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="service">Service</label><select id="service" name="service" autoComplete="off" className={inputClass}><option value="">Select a service</option><option value="web-development">Web Development</option><option value="mobile-development">Mobile App Development</option><option value="ai-integrations">AI Agents &amp; Chatbots</option><option value="business-setup">Business Setup</option><option value="other">Other / Multiple</option></select></div>
      <div><label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="message">Message</label><textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} autoComplete="off" className={`${inputClass} resize-none`} placeholder="Tell us about your project…" /></div>
      <p className="text-center text-xs leading-5 text-corvix-muted">By submitting this form, you agree that Corvix may use the information you provide to respond to your inquiry. See our <a href="/privacy" className="text-corvix-text underline underline-offset-2 hover:text-white">Privacy Policy</a>.</p>
      <button type="submit" disabled={status === "sending" || status === "success"} className="w-full inline-flex items-center justify-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover disabled:opacity-60 text-black font-semibold py-4 rounded-xl transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">{status === "sending" ? "Sending…" : status === "success" ? "Message Sent!" : <><Send size={16} aria-hidden="true" /> Send Message</>}</button>
      <div aria-live="polite" aria-atomic="true" className="text-center text-sm">
        {status === "sending" && <p className="text-corvix-muted">Sending your message…</p>}
        {status === "success" && <p className="text-emerald-400">Your message was sent. We&apos;ll get back to you within 24 hours on business days.</p>}
        {status === "error" && <div role="alert" className="space-y-3"><p className="text-red-400">We couldn&apos;t send your message. Please try again or email <a className="underline underline-offset-2" href="mailto:alibuildswebsites@gmail.com">alibuildswebsites@gmail.com</a>.</p><button type="button" onClick={() => setStatus("idle")} className="text-corvix-text underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">Try again</button></div>}
      </div>
    </form>
  );
}
