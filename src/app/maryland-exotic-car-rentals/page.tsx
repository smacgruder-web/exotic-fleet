import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FleetGrid } from "@/components/FleetGrid";
import { FleetMatchChat } from "@/components/FleetMatchChat";
import { QuoteEstimator } from "@/components/QuoteEstimator";
import { SpecialsBanner } from "@/components/SpecialsBanner";
import { fleet, getExotics, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Maryland Exotic Car Rentals",
  description:
    "RS Luxury Maryland exotic car rentals from National Harbor — Lamborghini Urus, Rolls-Royce, Bentley, Aston Martin, and more across the DMV.",
};

export default function MarylandExoticPage() {
  const exotics = getExotics("maryland");
  const md = site.markets.find((m) => m.id === "maryland");

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={site.marylandHeroImage}
          alt="Lamborghini Urus widebody — RS Luxury Maryland"
          fill
          priority
          className="object-cover animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <Image
            src={site.logo}
            alt=""
            width={64}
            height={58}
            className="animate-rise mb-3 opacity-90"
          />
          <p className="animate-rise font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.92] tracking-[0.04em] text-silver">
            RS Luxury
          </p>
          <h1 className="animate-rise mt-3 max-w-3xl text-[clamp(1.6rem,4vw,2.6rem)] font-semibold uppercase tracking-[0.14em] text-white">
            Maryland exotic car rentals
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-mist">
            {site.marylandPitch}
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="bg-signal px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Book now
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="border border-silver/40 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-silver"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
              Experience luxury & performance
            </p>
            <h2 className="mt-3 font-display text-4xl text-silver md:text-5xl">
              Masterpieces of engineering and luxury.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist-muted md:text-base">
              {site.experiencePitch}
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
              Maryland service areas
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-mist">
              {md?.areas.map((area) => (
                <li key={area} className="border-b border-ink-line pb-2">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
          What our clients say
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {site.testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="border border-ink-line bg-ink-soft/40 p-6"
            >
              <p className="font-display text-xl leading-snug text-silver">
                “{t.quote}”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.18em] text-mist-muted">
                {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <FleetGrid vehicles={exotics} title="Our exotics" eyebrow="Maryland fleet" />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-0 border border-ink-line md:grid-cols-2">
          <div className="relative min-h-[280px]">
            <Image
              src="/images/rs/sprinter-shop.jpg"
              alt="RS Luxury Sprinter"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-ink/55" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <h2 className="font-display text-3xl text-silver">Need a Sprinter?</h2>
              <p className="mt-3 max-w-md text-sm text-mist">
                Ultimate and Presidential vans with captain’s chairs, onboard restroom,
                and private drivers for groups across Maryland.
              </p>
              <Link
                href="/sprinter-vans"
                className="mt-5 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-champagne underline underline-offset-8"
              >
                View Sprinters
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src="/images/rs/ghost-shop.jpg"
              alt="Rolls-Royce Ghost chauffeur"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-ink/55" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <h2 className="font-display text-3xl text-silver">Prefer a chauffeur?</h2>
              <p className="mt-3 max-w-md text-sm text-mist">
                Optional chauffeur — including carefully routed armed chauffeur requests —
                for Ghost, Cullinan, and Sprinter itineraries.
              </p>
              <Link
                href="/luxury-chauffeur-service"
                className="mt-5 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-champagne underline underline-offset-8"
              >
                Chauffeur service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SpecialsBanner />
      <QuoteEstimator vehicles={fleet.filter((v) => v.markets.includes("maryland"))} />
      <FleetMatchChat />
    </>
  );
}
