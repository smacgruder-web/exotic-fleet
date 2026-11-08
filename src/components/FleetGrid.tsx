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
        {vehicles.map((v) => (
          <article
            key={v.id}
            className="group overflow-hidden border border-ink-line bg-ink-soft/60 transition hover:border-champagne/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-display text-2xl text-white md:text-3xl">
                  {v.name}
                </h3>
                <div className="text-right">
                  <div className="text-lg font-semibold tracking-wide text-champagne">
                    {formatRate(v)}
                  </div>
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
        ))}
      </div>
    </section>
  );
}
