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
          src={site.heroImage}
          alt="RS Luxury McLaren GT"
          fill
          priority
          className="object-cover animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <Image
            src={site.logo}
            alt=""
            width={72}
            height={64}
            className="animate-rise mb-4 opacity-90"
          />
          <p className="animate-rise text-[0.72rem] uppercase tracking-[0.32em] text-champagne">
            National Harbor · DMV · Miami
          </p>
          <h1 className="animate-rise mt-4 font-display text-[clamp(3.4rem,10vw,7rem)] leading-[0.9] tracking-[0.04em] text-silver">
            RS Luxury
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {site.tagline} Maryland exotic rentals, Sprinter groups, and chauffeur
            arrivals — curated for evenings that need presence.
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
            copy: "Urus widebody, Ghost, Cullinan Black Badge, Bentley, Aston, McLaren — self-drive showpieces rooted at National Harbor.",
            href: "/maryland-exotic-car-rentals",
            image: "/images/rs/urus-shop.jpg",
          },
          {
            title: "Sprinters",
            copy: "Presidential, Ultimate, and Executive builds with captain’s chairs, onboard comfort, and private drivers for groups.",
            href: "/sprinter-vans",
            image: "/images/rs/sprinter-shop.jpg",
          },
          {
            title: "Chauffeur",
            copy: "Optional chauffeur — including armed chauffeur routing — across Maryland, DC, and Virginia.",
            href: "/luxury-chauffeur-service",
            image: "/images/rs/ghost-shop.jpg",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group overflow-hidden border border-ink-line transition hover:border-champagne"
          >
            <div className="relative aspect-[5/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl text-silver group-hover:text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-muted">
                {item.copy}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <SpecialsBanner />
      <FleetMatchChat />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
          What our clients say
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
