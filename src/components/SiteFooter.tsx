import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="font-display text-3xl tracking-[0.06em] text-silver">
            RS Luxury
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist-muted">
            {site.tagline} Based in {site.base}. Owners {site.owners}.
          </p>
        </div>
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
            Contact
          </div>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-3 block text-lg text-white hover:text-champagne"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 block text-mist hover:text-champagne"
          >
            {site.email}
          </a>
        </div>
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
            Paths
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-mist">
            <Link href="/maryland-exotic-car-rentals" className="hover:text-white">
              Maryland exotic rentals
            </Link>
            <Link href="/sprinter-vans" className="hover:text-white">
              Sprinter vans
            </Link>
            <Link href="/luxury-chauffeur-service" className="hover:text-white">
              Chauffeur service
            </Link>
            <Link href="/book" className="hover:text-white">
              Book / intake
            </Link>
            <Link href="/concierge" className="hover:text-white">
              Concierge desk
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-line px-5 py-5 text-center text-xs text-mist-muted md:px-8">
        © {new Date().getFullYear()} {site.legalName}. Rates marked archive-confirmed
        require concierge verification before booking.
      </div>
    </footer>
  );
}
