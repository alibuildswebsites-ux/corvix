const testimonials = [
  { text: "Corvix rebuilt our Next.js app and cut page load from 4.2 seconds to 0.8. Signups doubled within the month. They fixed our Core Web Vitals too, something our SEO agency chased for a year.", name: "Daniel W.", role: "Founder, Looply", initials: "DW", color: "bg-white/10" },
  { text: "Corvix shipped our React Native app in six weeks. It feels native on iOS and Android, and they handled the App Store submission end to end. Push notifications brought back more repeat customers than our email list ever did.", name: "Priya S.", role: "CEO, Nova Retail", initials: "PS", color: "bg-white/15" },
  { text: "Corvix built an internal agent that handles our weekly reporting. It pulls the support metrics and files the summary. That used to take me a full day.", name: "Kevin B.", role: "Head of Operations, GreenPath Software", initials: "KB", color: "bg-white/5" },
  { text: "I’m based in Ho Chi Minh City and needed a US entity to take payments. Corvix set up my LLC and EIN in five days while I kept building. The banking resolution letter was done the same week.", name: "Elise M.", role: "Founder, Voyage Commerce", initials: "EM", color: "bg-white/10" },
  { text: "Our store rebuilt on Next.js went from 6 second loads to 1.1. Checkout completion jumped 18% in the first week.", name: "Sandra K.", role: "Founder, Meridian Goods", initials: "SK", color: "bg-white/15" },
  { text: "Corvix took our app from Figma to the Play Store in five weeks. They wired up biometric login, offline sync, and push notifications. We hit a 4.8 rating within two months of launch.", name: "Marcus T.", role: "Founder, BluePeak Fitness", initials: "MT", color: "bg-white/5" },
  { text: "We used to burn three hours a day answering setup questions. Corvix built an agent on our knowledge base and routed it through Slack and our site. That time went back into shipping.", name: "Tom A.", role: "COO, Frontier Analytics", initials: "TA", color: "bg-white/10" },
  { text: "Corvix handled our LLC formation, operating agreement, and EIN. From kickoff to a funded bank account took nine days, without me touching a single form.", name: "James R.", role: "Founder, Summit Studio", initials: "JR", color: "bg-white/15" },
  { text: "Our WhatsApp AI agent deflects 60% of tickets before they reach a human. Corvix trained it on our docs and support history. My team works on real issues instead of the same three questions.", name: "Rachel L.", role: "Head of Support, Compass CRM", initials: "RL", color: "bg-white/5" },
];

const columns = [
  testimonials.filter((_, i) => i % 3 === 0),
  testimonials.filter((_, i) => i % 3 === 1),
  testimonials.filter((_, i) => i % 3 === 2),
];

function Column({ items, className = "", duration }: { items: typeof testimonials; className?: string; duration: number }) {
  const cards = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="testimonial-track flex flex-col gap-4" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
        {cards.map(({ text, name, role, initials, color }, index) => (
          <article key={`${name}-${index}`} aria-hidden={index >= items.length ? "true" : undefined} className="bg-white/[0.03] border border-[rgba(255,255,255,0.08)] rounded-2xl p-7 flex flex-col gap-5">
            <span aria-hidden="true" className="text-[36px] leading-none text-white/15 font-medium select-none">&ldquo;</span>
            <p className="text-[14px] text-corvix-muted leading-[1.7]">{text}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
              <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center flex-shrink-0`}><span className="text-[11px] font-medium text-white">{initials}</span></div>
              <div className="flex flex-col"><span className="text-[13px] font-medium text-corvix-text leading-tight">{name}</span><span className="text-[12px] text-corvix-muted leading-tight">{role}</span></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-[rgba(255,255,255,0.08)]" aria-labelledby="testimonials-heading">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 flex flex-col gap-12">
        <div className="flex items-end justify-between mb-14 gap-6">
          <div className="flex flex-col gap-4"><p className="text-corvix-accent text-xs font-medium tracking-[0.25em] uppercase mb-3">Happy Clients</p><h2 id="testimonials-heading" className="font-display font-bold text-5xl text-corvix-text">Teams That Ship With Corvix</h2></div>
          <p className="hidden md:block text-corvix-muted text-sm text-right max-w-xs leading-relaxed">Real client experiences from teams that have shipped with Corvix.</p>
        </div>
        <div className="relative h-[580px] overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <Column items={columns[0]} duration={18} />
            <Column items={columns[1]} duration={14} className="hidden md:block" />
            <Column items={columns[2]} duration={22} className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
