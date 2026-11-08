import { NextResponse } from "next/server";
import { z } from "zod";
import { chatReply } from "@/lib/fleet-match";

const schema = z.object({
  message: z.string().min(1).max(1000),
  historyLength: z.number().int().min(0).max(40).optional().default(0),
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

  // Phase 1: deterministic fleet-match engine (no paid API required).
  // When OPENAI_API_KEY is present later, wrap language around the same match tools.
  const result = chatReply(parsed.data.message, parsed.data.historyLength);

  return NextResponse.json({
    reply: result.reply,
    matches: result.matches.map((m) => ({
      id: m.id,
      name: m.name,
      dailyRate: m.dailyRate,
      rateStatus: m.rateStatus,
      image: m.image,
      category: m.category,
    })),
    handoff: {
      phone: "(301) 615-1545",
      tel: "tel:+13016151545",
      sms: "sms:+13016151545",
      bookPath: "/book",
    },
    mode: process.env.OPENAI_API_KEY ? "rules+llm-ready" : "rules",
  });
}
