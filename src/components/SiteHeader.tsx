import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

const links = [
  { href: "/maryland-exotic-car-rentals", label: "Maryland Exotics" },
  { href: "/fleet", label: "Fleet" },
  { href: "/sprinter-vans", label: "Sprinters" },
  { href: "/luxury-chauffeur-service", label: "Chauffeur" },
  { href: "/book", label: "Book" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={site.logo}
            alt="RS Luxury"
            width={44}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.08em] text-silver transition group-hover:text-white md:text-2xl">
              RS Luxury
            </span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-mist-muted">
              & Exotic Rentals
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[0.78rem] uppercase tracking-[0.18em] text-mist-muted lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-champagne"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${site.phoneTel}`}
          className="inline-flex items-center justify-center border border-signal bg-signal px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-transparent hover:text-signal"
        >
          {site.phone}
        </a>
      </div>
    </header>
  );
}
