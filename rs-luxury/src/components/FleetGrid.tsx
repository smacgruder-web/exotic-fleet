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
  const hero = vehicles.filter((v) => v.photoQuality === "hero");
  const supporting = vehicles.filter((v) => v.photoQuality === "supporting");
  const rest = vehicles.filter(
    (v) => v.photoQuality !== "hero" && v.photoQuality !== "supporting",
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-mist-muted">
        One photograph per vehicle. Bright, full-frame presentation — inquire for
        availability and current finish.
      </p>

      {hero.map((v) => (
        <article
          key={v.id}
          className="mt-10 overflow-hidden border border-ink-line bg-paper shadow-sm"
        >
          <div className="relative min-h-[70vw] md:min-h-[560px]">
            <Image
              src={v.image}
              alt={v.name}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              {v.tagline && (
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/80">
                  {v.tagline}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-4xl text-white md:text-5xl">{v.name}</h3>
                <div className="text-lg font-semibold text-white">{formatRate(v)}</div>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                {v.blurb}
              </p>
              <p className="mt-2 text-xs text-white/70">{rateFootnote(v)}</p>
              <Link
                href={`/book?vehicle=${v.id}`}
                className="mt-6 inline-flex bg-signal px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white"
              >
                Request this vehicle
              </Link>
            </div>
          </div>
        </article>
      ))}

      {supporting.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {supporting.map((v) => (
            <article
              key={v.id}
              className="overflow-hidden border border-ink-line bg-paper shadow-sm"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                {v.photoNote?.toUpperCase().includes("PLACEHOLDER") && (
                  <span className="absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-mist">
                    Reference photo
                  </span>
                )}
              </div>
              <div className="p-5">
                {v.tagline && (
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-champagne">
                    {v.tagline}
                  </p>
                )}
                <h3 className="mt-1 font-display text-2xl text-ink">{v.name}</h3>
                <p className="mt-1 text-sm text-signal">{formatRate(v)}</p>
                <p className="mt-2 text-sm text-mist-muted">{v.blurb}</p>
                <Link
                  href={`/book?vehicle=${v.id}`}
                  className="mt-4 inline-block text-[0.7rem] uppercase tracking-[0.16em] text-signal underline underline-offset-4"
                >
                  Request
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-12">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-mist-muted">
            Full inventory · compact list
          </p>
          <ul className="mt-4 divide-y divide-ink-line border border-ink-line bg-paper">
            {rest.map((v) => (
              <li
                key={v.id}
                className="grid gap-4 p-4 md:grid-cols-[96px_1fr_auto] md:items-center"
              >
                <div className="relative h-20 w-full overflow-hidden bg-ink-soft md:h-16 md:w-24">
                  {v.imageKind === "brand-mark" || v.photoQuality === "brand-mark" ? (
                    <div className="flex h-full items-center justify-center">
                      <Image src={v.image} alt="" width={40} height={36} />
                    </div>
                  ) : (
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className={
                        v.imageKind === "segment-cutout"
                          ? "object-contain object-center"
                          : "object-cover"
                      }
                      sizes="96px"
                    />
                  )}
                </div>
                <div>
                  <div className="font-display text-xl text-ink">{v.name}</div>
                  {v.inventoryStatus === "verify_with_owners" && (
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-champagne">
                      Confirm with owners
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-sm text-mist-muted">{v.blurb}</p>
                  <p className="mt-1 text-[0.65rem] text-mist-muted/80">{rateFootnote(v)}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <div className="text-sm font-semibold text-signal">{formatRate(v)}</div>
                  <Link
                    href={`/book?vehicle=${v.id}`}
                    className="text-[0.68rem] uppercase tracking-[0.16em] text-mist underline underline-offset-4 hover:text-ink"
                  >
                    Inquire
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
