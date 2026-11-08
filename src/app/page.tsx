import Image from "next/image";
import Link from "next/link";
import { FleetMatchChat } from "@/components/FleetMatchChat";
import { SpecialsBanner } from "@/components/SpecialsBanner";
import { site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/images/bentley-front.jpg"
          alt="RS Luxury exotic at dusk"
          fill
          priority
          className="object-cover animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <p className="animate-rise text-[0.72rem] uppercase tracking-[0.32em] text-champagne">
            National Harbor · DMV · Miami
          </p>
          <h1 className="animate-rise mt-4 font-display text-[clamp(3.4rem,10vw,7rem)] leading-[0.9] tracking-[0.04em] text-silver">
            RS Luxury
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Maryland exotic rentals, Sprinter groups, and chauffeur arrivals —
            curated for evenings that need presence.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3">
            <Link
              href="/maryland-exotic-car-rentals"
              className="bg-signal px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Maryland exotics
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="border border-silver/40 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-silver hover:border-champagne hover:text-champagne"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3 md:px-8">
        {[
          {
            title: "Exotics",
            copy: "Urus, Ghost, Cullinan Black Badge, Bentley, Aston — self-drive showpieces rooted at National Harbor.",
            href: "/maryland-exotic-car-rentals",
          },
          {
            title: "Sprinters",
            copy: "Presidential, Ultimate, and Executive builds with captain’s chairs for weddings, airports, and groups.",
            href: "/sprinter-vans",
          },
          {
            title: "Chauffeur",
            copy: "Optional chauffeur — including armed chauffeur routing — across Maryland, DC, and Virginia.",
            href: "/luxury-chauffeur-service",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group border-t border-ink-line pt-6 transition hover:border-champagne"
          >
            <h2 className="font-display text-3xl text-silver group-hover:text-white">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist-muted">
              {item.copy}
            </p>
          </Link>
        ))}
      </section>

      <SpecialsBanner />
      <FleetMatchChat />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
          From the floor
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {site.testimonials.map((t) => (
            <blockquote key={t.name} className="border-l border-signal pl-5">
              <p className="font-display text-2xl leading-snug text-silver">
                “{t.quote}”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.18em] text-mist-muted">
                {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
