import fleetData from "../../content/fleet.json";
import specialsData from "../../content/specials.json";
import siteData from "../../content/site.json";
import type { FleetVehicle, SpecialsConfig } from "./types";

export const site = siteData;
export const specials = specialsData as SpecialsConfig;
export const fleet = fleetData as FleetVehicle[];

export function getExotics(market = "maryland") {
  return fleet.filter(
    (v) =>
      v.category === "exotic" &&
      v.markets.includes(market) &&
      v.inventoryStatus !== "candidate",
  );
}

export function getSprinters() {
  return fleet.filter((v) => v.category === "sprinter");
}

export function getVehicle(id: string) {
  return fleet.find((v) => v.id === id);
}

export function formatRate(vehicle: FleetVehicle) {
  if (vehicle.rateStatus === "price_on_request" || vehicle.dailyRate == null) {
    return "Price on request";
  }
  return `$${vehicle.dailyRate.toLocaleString("en-US")}/day`;
}

export function rateFootnote(vehicle: FleetVehicle) {
  if (vehicle.rateStatus === "archive_confirmed" && vehicle.dailyRate != null) {
    const miles =
      vehicle.includedMiles != null
        ? ` · ${vehicle.includedMiles} mi/day archive baseline`
        : "";
    return `Archive-confirmed daily rate${miles}. Concierge confirms before booking.`;
  }
  return "Daily rate unconfirmed — inquire for a concierge quote.";
}
