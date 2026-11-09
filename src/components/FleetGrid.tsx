import Link from "next/link";
import Image from "next/image";
import { formatRate, rateFootnote } from "@/lib/content";
import type { FleetVehicle } from "@/lib/types";

export function FleetGrid({
  vehicles,
  title = "Our exotics",
  eyebrow = "Curated fleet",
}: {
  vehicles: FleetVehicle[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl text-silver md:text-5xl">{title}</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {vehicles.map((v) => {
          const brandMark = v.imageKind === "brand-mark";
          return (
            <article
              key={v.id}
              className="group overflow-hidden border border-ink-line bg-ink-soft/60 transition hover:border-champagne/40"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden ${
                  brandMark
                    ? "bg-gradient-to-br from-ink via-[#1a120f] to-ink flex items-center justify-center"
                    : ""
                }`}
              >
                {brandMark ? (
                  <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
                    <Image
                      src={v.image}
                      alt="RS Luxury"
                      width={120}
                      height={108}
                      className="opacity-90"
                    />
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-mist-muted">
                      Photography coming from archive · inquire for current unit photos
                    </p>
                  </div>
                ) : (
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {!brandMark && (
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                )}
              </div>
              <div className="p-6 md:p-7">
                {v.tagline && (
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-signal">
                    {v.tagline}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                  <h3 className="font-display text-2xl text-white md:text-3xl">
                    {v.name}
                  </h3>
                  <div className="text-lg font-semibold tracking-wide text-champagne">
                    {formatRate(v)}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist-muted">{v.blurb}</p>
                <p className="mt-3 text-xs text-mist-muted/80">{rateFootnote(v)}</p>
                <Link
                  href={`/book?vehicle=${v.id}`}
                  className="mt-5 inline-flex text-[0.72rem] uppercase tracking-[0.18em] text-white underline decoration-signal underline-offset-8 transition hover:text-champagne"
                >
                  Request this vehicle
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
