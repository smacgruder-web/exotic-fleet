import type { Metadata } from "next";
import { FleetGrid } from "@/components/FleetGrid";
import { fleet } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fleet",
  description:
    "Editable RS Luxury fleet inventory — exotics and Sprinters with archive-confirmed or price-on-request rates.",
};

export default function FleetPage() {
  const exotics = fleet.filter((v) => v.category === "exotic");
  const sprinters = fleet.filter((v) => v.category === "sprinter");

  return (
    <div className="pb-10">
      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
          Inventory
        </p>
        <h1 className="mt-3 font-display text-5xl text-silver">The fleet</h1>
        <p className="mt-4 max-w-2xl text-sm text-mist-muted">
          Managed in <code className="text-champagne">content/fleet.json</code>. Daily
          rates marked price-on-request are intentionally blank until owners confirm.
        </p>
      </div>
      <FleetGrid vehicles={exotics} title="Exotics" eyebrow="Self-drive & chauffeur-ready" />
      <FleetGrid vehicles={sprinters} title="Sprinters" eyebrow="Group luxury" />
    </div>
  );
}
