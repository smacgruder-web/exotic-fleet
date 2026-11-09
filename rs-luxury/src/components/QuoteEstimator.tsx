"use client";

import { useState } from "react";
import type { FleetVehicle } from "@/lib/types";

type Quote = {
  message: string;
  estimate: number | null;
  baseSubtotal: number | null;
  discountPercent: number;
  discountAmount: number | null;
  giftLabel: string | null;
  mileageNote: string;
  deliveryNote: string;
  disclaimer: string;
  needsConcierge: boolean;
};

export function QuoteEstimator({ vehicles }: { vehicles: FleetVehicle[] }) {
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");
  const [days, setDays] = useState(2);
  const [zip, setZip] = useState("");
  const [special, setSpecial] = useState<
    "none" | "loyalty" | "holiday" | "birthdayAnniversary"
  >("none");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [busy, setBusy] = useState(false);

  async function runEstimate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          days,
          deliveryZip: zip || undefined,
          specialInterest: special,
        }),
      });
      const data = await res.json();
      setQuote(data.quote as Quote);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="quote" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid gap-10 border border-ink-line bg-ink-soft/50 p-6 md:grid-cols-2 md:p-10">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
            Instant quote estimator
          </p>
          <h2 className="mt-3 font-display text-4xl text-silver">
            Indicative numbers. Human confirmation.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist-muted">
            Archive-confirmed daily rates feed the math. Price-on-request vehicles
            route straight to concierge — we never invent a day rate.
          </p>
        </div>

        <form onSubmit={runEstimate} className="space-y-4">
          <label className="block text-xs uppercase tracking-[0.16em] text-mist-muted">
            Vehicle
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="mt-2 w-full border border-ink-line bg-ink px-3 py-3 text-sm text-white outline-none"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                  {v.dailyRate != null
                    ? ` — $${v.dailyRate}/day`
                    : " — POR"}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs uppercase tracking-[0.16em] text-mist-muted">
              Days
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-2 w-full border border-ink-line bg-ink px-3 py-3 text-sm text-white outline-none"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-mist-muted">
              Delivery ZIP
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="20745"
                className="mt-2 w-full border border-ink-line bg-ink px-3 py-3 text-sm text-white outline-none"
              />
            </label>
          </div>

          <label className="block text-xs uppercase tracking-[0.16em] text-mist-muted">
            Special
            <select
              value={special}
              onChange={(e) =>
                setSpecial(
                  e.target.value as
                    | "none"
                    | "loyalty"
                    | "holiday"
                    | "birthdayAnniversary",
                )
              }
              className="mt-2 w-full border border-ink-line bg-ink px-3 py-3 text-sm text-white outline-none"
            >
              <option value="none">None</option>
              <option value="loyalty">Loyalty · 10% off</option>
              <option value="holiday">Holiday · 10% + champagne</option>
              <option value="birthdayAnniversary">
                Birthday / Anniversary · 10% + flowers or champagne
              </option>
            </select>
          </label>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-signal py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50"
          >
            {busy ? "Estimating…" : "Get estimate"}
          </button>

          {quote && (
            <div className="border border-champagne/30 bg-ink p-4 text-sm text-mist animate-reveal">
              <p className="text-white">{quote.message}</p>
              {quote.estimate != null && (
                <p className="mt-2 font-display text-3xl text-champagne">
                  ${quote.estimate.toLocaleString("en-US")}
                </p>
              )}
              {quote.giftLabel && (
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-signal">
                  Includes: {quote.giftLabel}
                </p>
              )}
              <p className="mt-3 text-xs text-mist-muted">{quote.mileageNote}</p>
              <p className="mt-1 text-xs text-mist-muted">{quote.deliveryNote}</p>
              <p className="mt-3 text-xs text-mist-muted">{quote.disclaimer}</p>
              <a
                href="tel:+13016151545"
                className="mt-4 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-champagne underline underline-offset-4"
              >
                Confirm with concierge
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
