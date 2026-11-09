import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FleetGrid } from "@/components/FleetGrid";
import { getSprinters, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sprinter Vans",
  description:
    "RS Luxury Sprinter vans — Presidential, Ultimate, and Executive builds for weddings, airports, and DMV groups.",
};

export default function SprinterPage() {
  const sprinters = getSprinters();

  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src="/images/rs/sprinter-shop.jpg"
          alt="RS Luxury Mercedes-Benz Sprinter"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 md:px-8">
          <p className="font-display text-5xl text-silver md:text-6xl">RS Luxury</p>
          <h1 className="mt-3 text-xl uppercase tracking-[0.16em] text-white md:text-2xl">
            Sprinter vans
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            Six captain’s chairs, ambient lighting, onboard restroom, refreshments, and
            private drivers for airport, corporate, wedding, prom, and funeral transport.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/book?vehicle=sprinter-ultimate"
              className="bg-signal px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Request a Sprinter
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="border border-silver/40 px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-silver"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/3] overflow-hidden border border-ink-line">
          <Image
            src="/images/rs/img0208.jpg"
            alt="Sprinter captain’s chairs interior"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
            Ultimate upgrades
          </p>
          <h2 className="mt-3 font-display text-4xl text-silver">
            Refreshments. Armed drivers. Guided tours.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist-muted">
            Stock beverages of choice, elevate security with a professionally trained armed
            driver, and let our chauffeurs guide you through the nation’s capital — no extra
            stops for public restrooms.
          </p>
        </div>
      </section>

      <FleetGrid
        vehicles={sprinters}
        title="Presidential · Ultimate · Executive"
        eyebrow="Group fleet"
      />
    </>
  );
}
