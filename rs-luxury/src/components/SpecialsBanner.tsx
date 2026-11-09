import { specials } from "@/lib/content";

export function SpecialsBanner() {
  const items = [
    specials.loyalty,
    specials.holiday,
    specials.birthdayAnniversary,
  ].filter((s) => s.enabled);

  return (
    <section className="border-y border-ink-line bg-paper border-y border-ink-line">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
          Guest lifecycle specials
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="animate-reveal">
              <h3 className="font-display text-2xl text-ink">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                {item.copy}
              </p>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-signal">
                {item.discountPercent}% off
                {item.giftLabel ? ` · ${item.giftLabel}` : ""}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-mist-muted">{specials.disclaimer}</p>
      </div>
    </section>
  );
}
