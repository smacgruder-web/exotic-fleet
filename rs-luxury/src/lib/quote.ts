import { fleet, specials } from "./content";
import type { FleetVehicle } from "./types";

export type QuoteInput = {
  vehicleId: string;
  days: number;
  estimatedMiles?: number;
  deliveryZip?: string;
  specialInterest?: "loyalty" | "holiday" | "birthdayAnniversary" | "none";
};

export type QuoteResult = {
  ok: boolean;
  vehicle?: FleetVehicle;
  days: number;
  baseSubtotal: number | null;
  discountPercent: number;
  discountAmount: number | null;
  estimate: number | null;
  giftLabel: string | null;
  mileageNote: string;
  deliveryNote: string;
  disclaimer: string;
  needsConcierge: boolean;
  message: string;
};

function daysBetweenSafe(days: number) {
  if (!Number.isFinite(days) || days < 1) return 1;
  return Math.min(Math.round(days), 30);
}

export function estimateQuote(input: QuoteInput): QuoteResult {
  const vehicle = fleet.find((v) => v.id === input.vehicleId);
  const days = daysBetweenSafe(input.days);
  const specialKey = input.specialInterest ?? "none";
  const offer =
    specialKey !== "none" && specials[specialKey]?.enabled
      ? specials[specialKey]
      : null;
  const discountPercent = offer?.discountPercent ?? 0;
  const giftLabel = offer?.giftLabel ?? null;

  const mileageNote =
    vehicle?.includedMiles != null
      ? `Archive baseline includes ~${vehicle.includedMiles} miles/day; extra miles quoted by concierge.`
      : "Mileage allowance confirmed with concierge for this vehicle.";

  const deliveryNote = input.deliveryZip
    ? `Delivery ZIP ${input.deliveryZip} — fee and radius confirmed by phone.`
    : "National Harbor pickup by default; delivery available across the DMV.";

  if (!vehicle) {
    return {
      ok: false,
      days,
      baseSubtotal: null,
      discountPercent,
      discountAmount: null,
      estimate: null,
      giftLabel,
      mileageNote,
      deliveryNote,
      disclaimer: specials.disclaimer,
      needsConcierge: true,
      message: "Choose a vehicle to estimate.",
    };
  }

  if (vehicle.dailyRate == null || vehicle.rateStatus === "price_on_request") {
    return {
      ok: true,
      vehicle,
      days,
      baseSubtotal: null,
      discountPercent,
      discountAmount: null,
      estimate: null,
      giftLabel,
      mileageNote,
      deliveryNote,
      disclaimer: specials.disclaimer,
      needsConcierge: true,
      message: `${vehicle.name} is price-on-request. Call ${"(301) 615-1545"} for a same-day estimate.`,
    };
  }

  const baseSubtotal = vehicle.dailyRate * days;
  const discountAmount = Math.round(baseSubtotal * (discountPercent / 100));
  const estimate = baseSubtotal - discountAmount;

  return {
    ok: true,
    vehicle,
    days,
    baseSubtotal,
    discountPercent,
    discountAmount,
    estimate,
    giftLabel,
    mileageNote,
    deliveryNote,
    disclaimer: specials.disclaimer,
    needsConcierge: true,
    message: `Indicative estimate $${estimate.toLocaleString("en-US")} for ${days} day${days === 1 ? "" : "s"}. Concierge confirms availability, insurance, and delivery before any charge.`,
  };
}
