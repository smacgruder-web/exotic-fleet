import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service",
  description:
    "RS Luxury chauffeur service across DC, Maryland, and Virginia — optional armed chauffeur routing with human concierge confirmation.",
};

export default function ChauffeurPage() {
  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src="/images/rolls-royce.jpg"
          alt="Chauffeur-ready Rolls-Royce"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
          <p className="font-display text-5xl text-silver md:text-6xl">RS Luxury</p>
          <h1 className="mt-3 max-w-2xl text-xl uppercase tracking-[0.14em] text-white md:text-2xl">
            Luxury chauffeur service
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            From Ghost evenings to Sprinter airport runs, our chauffeurs keep the
            itinerary quiet and precise across Maryland, Washington DC, and Virginia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="bg-signal px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Request chauffeur
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="border border-silver/40 px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-silver"
            >
              Speak with concierge
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-silver">Armed chauffeur option</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist-muted">
              Regional pages call out an optional armed chauffeur. We treat this as a
              human-routed request — describe the need in intake notes and a concierge
              will brief you carefully. No automated “security AI.”
            </p>
          </div>
          <div className="border border-ink-line bg-ink-soft/50 p-8">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
              Pair with
            </p>
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li>
                <Link href="/maryland-exotic-car-rentals" className="hover:text-champagne">
                  Maryland exotic fleet
                </Link>
              </li>
              <li>
                <Link href="/sprinter-vans" className="hover:text-champagne">
                  Sprinter group transport
                </Link>
              </li>
              <li>
                <Link href="/#fleet-match" className="hover:text-champagne">
                  AI fleet match
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
