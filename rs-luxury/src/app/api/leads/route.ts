import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead, listLeads, storageMode } from "@/lib/leads";

const createSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  occasion: z.string().max(120).optional().default(""),
  market: z.string().max(40).optional().default("maryland"),
  preferredVehicleId: z.string().max(80).optional(),
  startDate: z.string().max(40).optional(),
  endDate: z.string().max(40).optional(),
  passengers: z.number().int().min(1).max(20).optional(),
  drivePreference: z.enum(["self", "chauffeur", "either"]).optional(),
  specialInterest: z
    .enum(["loyalty", "holiday", "birthdayAnniversary", "none"])
    .optional(),
  giftPreference: z.enum(["flowers", "champagne", "none"]).optional(),
  message: z.string().max(2000).optional(),
  estimatedQuote: z.number().nullable().optional(),
  source: z.string().max(80).optional().default("web-intake"),
});

export async function GET() {
  const leads = await listLeads();
  return NextResponse.json({ storage: storageMode(), leads });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = await createLead({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    occasion: parsed.data.occasion,
    market: parsed.data.market,
    preferredVehicleId: parsed.data.preferredVehicleId,
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate,
    passengers: parsed.data.passengers,
    drivePreference: parsed.data.drivePreference,
    specialInterest: parsed.data.specialInterest,
    giftPreference: parsed.data.giftPreference,
    message: parsed.data.message,
    estimatedQuote: parsed.data.estimatedQuote ?? null,
    source: parsed.data.source,
  });

  return NextResponse.json({ lead }, { status: 201 });
}
