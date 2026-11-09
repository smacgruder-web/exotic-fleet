import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service",
  description:
    "RS Luxury elite chauffeur service across the DMV and Miami — executive travel, weddings, red-carpet events, and secure transit.",
};

export default function ChauffeurPage() {
  return (
    <>
      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src="/images/rs/cullinan-blue-garage.jpg"
          alt="Rolls-Royce Cullinan chauffeur service"
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
            Elite chauffeur service for executive travel, weddings, red-carpet events, and
            secure transit — pairing 2023 Rolls-Royce, Bentley, and Presidential Sprinters
            with quiet, precise itineraries across the DMV and Miami.
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
          <div className="relative min-h-[260px] overflow-hidden border border-ink-line">
            <Image
              src="/images/rs/cabin-star.webp"
              alt="Starlight luxury cabin"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
