"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-corvix-bg border border-[rgba(255,255,255,0.08)] focus:border-corvix-accent focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl px-4 py-3.5 text-corvix-text placeholder:text-corvix-muted outline-none transition-colors duration-200 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="service">
          Service
        </label>
        <select id="service" name="service" autoComplete="off" className={inputClass}>
          <option value="">Select a service</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile App Development</option>
          <option value="ai-integrations">AI Agents &amp; Chatbots</option>
          <option value="business-setup">Business Setup</option>
          <option value="other">Other / Multiple</option>
        </select>
      </div>

      <div>
        <label className="block text-corvix-muted text-xs font-medium mb-2 tracking-wide" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          autoComplete="off"
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="w-full inline-flex items-center justify-center gap-2 bg-corvix-accent hover:bg-corvix-accent-hover disabled:opacity-60 text-black font-semibold py-4 rounded-xl transition-colors duration-200 cursor-pointer"
      >
        {status === "sending" ? "Sending…" : status === "success" ? "Message Sent!" : (
          <><Send size={16} /> Send Message</>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message…" : status === "success" ? "Message sent." : ""}
      </p>

      {status === "error" && (
        <p role="alert" className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
