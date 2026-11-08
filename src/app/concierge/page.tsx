import type { Metadata } from "next";
import { ConciergeDesk } from "@/components/ConciergeDesk";

export const metadata: Metadata = {
  title: "Concierge desk",
  description: "Internal lead follow-up stubs — status and notes for RS Luxury guests.",
  robots: { index: false, follow: false },
};

export default function ConciergePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
      <ConciergeDesk />
    </div>
  );
}
