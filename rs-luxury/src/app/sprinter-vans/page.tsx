import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FleetGrid } from "@/components/FleetGrid";
import { getSprinters, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Luxury Sprinter Vans",
  description:
    "RS Luxury Presidential Mercedes-Benz Sprinters — six captain’s chairs, ultimate layouts, executive climate, and RV-type bathrooms for DMV executive travel and events.",
};

export default function SprinterPage() {
  const sprinters = getSprinters();

  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden bg-ink-soft">
        {/* Only clean bright Sprinter interior available after QC — no dark exterior with open door */}
        <Image
          src="/images/rs/lifestyle/bentayga-castle-green.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/40" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 md:px-8">
          <p className="font-display text-5xl text-ink md:text-6xl">RS Luxury</p>
          <h1 className="mt-3 text-xl uppercase tracking-[0.16em] text-ink md:text-2xl">
            Luxury Sprinter vans
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            Presidential Mercedes-Benz Sprinters with six captain’s chairs, ultimate luxury
            layouts, executive climate systems, and RV-type bathrooms — built for
            long-distance comfort, weddings, executive travel, and secure group transit.
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
              className="border border-ink-line px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-ink"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/3] overflow-hidden border border-ink-line bg-paper">
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
          <h2 className="mt-3 font-display text-4xl text-ink">
            Hyper-luxury multi-passenger travel.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist-muted">
            Captain’s chairs, executive climate, and RV-type bathrooms mean fewer stops and
            more composure — with optional armed chauffeur for secure transit across the DMV.
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
