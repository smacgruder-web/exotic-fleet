import { NextResponse } from "next/server";
import { z } from "zod";
import { updateLead } from "@/lib/leads";

const patchSchema = z.object({
  status: z
    .enum(["new", "contacted", "quoted", "booked", "closed", "lost"])
    .optional(),
  note: z.string().max(2000).optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const lead = await updateLead(id, parsed.data);
  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ lead });
}
