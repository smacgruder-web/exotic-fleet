export type RateStatus = "archive_confirmed" | "price_on_request";
export type DriveMode = "self" | "chauffeur" | "either";
export type VehicleCategory = "exotic" | "sprinter";

export type FleetVehicle = {
  id: string;
  name: string;
  category: VehicleCategory;
  markets: string[];
  blurb: string;
  yearNote?: string;
  dailyRate: number | null;
  rateStatus: RateStatus;
  includedMiles: number | null;
  image: string;
  imageKind?: "photo" | "brand-mark" | "segment-cutout";
  photoQuality?: "hero" | "supporting" | "archive" | "brand-mark";
  photoNote?: string;
  rateNote?: string;
  gallery?: string[];
  tagline?: string;
  details?: string;
  tags: string[];
  passengers: number;
  drive: DriveMode;
  inventoryStatus?: "active" | "candidate" | "verify_with_owners";
};

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "closed"
  | "lost";

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  market: string;
  preferredVehicleId?: string;
  startDate?: string;
  endDate?: string;
  passengers?: number;
  drivePreference?: DriveMode | "either";
  specialInterest?: "loyalty" | "holiday" | "birthdayAnniversary" | "none";
  giftPreference?: "flowers" | "champagne" | "none";
  message?: string;
  estimatedQuote?: number | null;
  status: LeadStatus;
  notes: string[];
  source: string;
};

export type SpecialsConfig = {
  loyalty: SpecialOffer;
  holiday: SpecialOffer;
  birthdayAnniversary: SpecialOffer;
  defaultGiftOptions: string[];
  disclaimer: string;
};

export type SpecialOffer = {
  enabled: boolean;
  label: string;
  discountPercent: number;
  gift?: string;
  giftLabel?: string;
  copy: string;
};
