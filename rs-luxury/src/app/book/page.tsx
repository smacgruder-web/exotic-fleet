import type { Metadata } from "next";
import { IntakeForm } from "@/components/IntakeForm";
import { SpecialsBanner } from "@/components/SpecialsBanner";
import { fleet, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book / Contact",
  description:
    "Book RS Luxury exotic rentals, Sprinters, or chauffeur service. Concierge confirms every paid booking.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
              Contact · Book now
            </p>
            <h1 className="mt-3 font-display text-5xl text-silver">
              Tell us the occasion.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-mist-muted">
              A representative will be by your side. Intake captures the lead for
              follow-up; call or text for immediate SMS / phone concierge handoff.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href={`tel:${site.phoneTel}`}
                className="block text-2xl text-champagne hover:text-white"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-mist hover:text-champagne"
              >
                {site.email}
              </a>
              <p className="text-mist-muted">{site.base}</p>
            </div>
          </div>
          <IntakeForm
            vehicles={fleet}
            defaultVehicleId={params.vehicle}
          />
        </div>
      </div>
      <SpecialsBanner />
    </>
  );
}
