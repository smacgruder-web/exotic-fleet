import { NextResponse } from "next/server";
import { z } from "zod";
import { estimateQuote } from "@/lib/quote";

const schema = z.object({
  vehicleId: z.string().min(1),
  days: z.number().min(1).max(30),
  estimatedMiles: z.number().min(0).max(5000).optional(),
  deliveryZip: z.string().max(12).optional(),
  specialInterest: z
    .enum(["loyalty", "holiday", "birthdayAnniversary", "none"])
    .optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const quote = estimateQuote(parsed.data);
  return NextResponse.json({ quote });
}
