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
          alt="RS Luxury Rolls-Royce Cullinan"
          fill
          priority
          className="object-cover object-[center_45%] animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <Image
            src={site.logo}
            alt=""
            width={72}
            height={64}
            className="animate-rise mb-4 opacity-90"
          />
          <p className="animate-rise text-[0.72rem] uppercase tracking-[0.32em] text-cobalt-glow">
            National Harbor · DMV · Miami
          </p>
          <h1 className="animate-rise mt-4 font-display text-[clamp(3.4rem,10vw,7rem)] leading-[0.9] tracking-[0.04em] text-silver">
            RS Luxury
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {site.tagline} {site.positioning}
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
              className="border border-silver/40 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-silver hover:border-cobalt-glow hover:text-cobalt-glow"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-3 md:px-8">
        {[
          {
            title: "Exotics",
            copy: "2023 Rolls-Royce Ghost, Wraith, and Cullinan Black Badge, plus Bentley Bentayga, Aston Martin DB11, and McLaren GT.",
            href: "/maryland-exotic-car-rentals",
            image: "/images/rs/cullinan-blue-garage.jpg",
          },
          {
            title: "Sprinters",
            copy: "Presidential Mercedes-Benz Sprinters with six captain’s chairs, ultimate layouts, executive climate, and RV-type bathrooms.",
            href: "/sprinter-vans",
            image: "/images/rs/img0208.jpg",
          },
          {
            title: "Chauffeur",
            copy: "Elite chauffeur for executive travel, weddings, red-carpet events, and secure transit across the DMV and Miami.",
            href: "/luxury-chauffeur-service",
            image: "/images/rs/cabin-star.webp",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group overflow-hidden border border-ink-line transition hover:border-cobalt-glow/50"
          >
            <div className="relative aspect-[5/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl text-silver group-hover:text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-muted">{item.copy}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="border-y border-ink-line bg-ink-soft/40">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-5 py-8 md:px-8">
          <p className="w-full text-[0.7rem] uppercase tracking-[0.28em] text-champagne md:w-auto md:self-center">
            Tailored for
          </p>
          {site.occasions.map((o) => (
            <span
              key={o}
              className="text-sm tracking-wide text-mist md:text-[0.95rem]"
            >
              {o}
            </span>
          ))}
        </div>
      </section>

      {site.prom?.enabled && (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid overflow-hidden border border-ink-line md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px] bg-ink">
              <Image
                src={site.prom.image}
                alt="RS Luxury exotic prom rental cars and chauffeur service"
                fill
                className="object-contain object-center p-4 md:p-6"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-ink-soft/60 p-8 md:p-10">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
                Limited dates · DMV
              </p>
              <h2 className="mt-3 font-display text-4xl text-silver md:text-5xl">
                {site.prom.headline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-mist-muted md:text-base">
                {site.prom.copy}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="bg-signal px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Reserve prom
                </Link>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="border border-silver/40 px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-silver"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

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
