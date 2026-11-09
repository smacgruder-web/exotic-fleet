import { fleet } from "./content";
import type { FleetVehicle } from "./types";

export type MatchAnswers = {
  occasion?: string;
  passengers?: number;
  drive?: "self" | "chauffeur" | "either";
  budgetBand?: "under_1500" | "1500_2000" | "open" | "unknown";
  market?: string;
  message?: string;
};

function scoreVehicle(v: FleetVehicle, a: MatchAnswers) {
  let score = 0;
  const market = a.market ?? "maryland";
  if (v.markets.includes(market) || market === "any") score += 3;
  if (a.passengers && v.passengers >= a.passengers) score += 2;
  if (a.passengers && a.passengers >= 6 && v.category === "sprinter") score += 5;
  if (a.drive === "self" && (v.drive === "self" || v.drive === "either")) score += 2;
  if (a.drive === "chauffeur" && (v.drive === "chauffeur" || v.drive === "either"))
    score += 2;
  if (a.occasion) {
    const o = a.occasion.toLowerCase();
    for (const tag of v.tags) {
      if (o.includes(tag) || tag.includes(o.split(" ")[0] ?? "")) score += 1;
    }
    if (/(wedding|prom|funeral|airport|corporate|group)/.test(o) && v.category === "sprinter")
      score += 3;
    if (/(anniversary|birthday|weekend|date)/.test(o) && v.category === "exotic") score += 2;
  }
  if (a.budgetBand === "under_1500") {
    if (v.dailyRate != null && v.dailyRate < 1500) score += 2;
    if (v.rateStatus === "price_on_request") score += 0.5;
  }
  if (a.budgetBand === "1500_2000") {
    if (v.dailyRate != null && v.dailyRate >= 1500 && v.dailyRate <= 2000) score += 3;
  }
  if (a.budgetBand === "open" && v.dailyRate != null) score += 1;
  if (v.inventoryStatus === "candidate") score -= 2;
  if (v.inventoryStatus === "verify_with_owners") score -= 4;
  return score;
}

export function matchFleet(answers: MatchAnswers, limit = 3): FleetVehicle[] {
  return [...fleet]
    .map((v) => ({ v, score: scoreVehicle(v, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.v);
}

export function chatReply(userText: string, historyLength: number) {
  const text = userText.toLowerCase();
  const answers: MatchAnswers = { market: "maryland", message: userText };

  if (/(sprinter|van|group|wedding|prom|airport|8|party)/.test(text)) {
    answers.passengers = 6;
    answers.drive = "chauffeur";
    answers.occasion = "group";
  } else if (/(chauffeur|driver|armed)/.test(text)) {
    answers.drive = "chauffeur";
    answers.occasion = "chauffeur";
  } else if (/(anniversary|birthday|date|romantic)/.test(text)) {
    answers.occasion = "anniversary";
    answers.drive = "either";
    answers.passengers = 2;
  } else if (/(urus|lamborghini|suv)/.test(text)) {
    answers.occasion = "weekend";
    answers.drive = "self";
  } else {
    answers.occasion = "weekend";
    answers.drive = historyLength < 2 ? "either" : "self";
    answers.passengers = 2;
  }

  if (/(budget|cheap|under)/.test(text)) answers.budgetBand = "under_1500";
  else if (/(open|best|no limit)/.test(text)) answers.budgetBand = "open";
  else answers.budgetBand = "unknown";

  const matches = matchFleet(answers, 3);
  const lines = matches.map((m, i) => {
    const rate =
      m.dailyRate != null
        ? `$${m.dailyRate.toLocaleString("en-US")}/day (archive rate)`
        : "price on request";
    return `${i + 1}. ${m.name} — ${rate}. ${m.blurb}`;
  });

  return {
    answers,
    matches,
    reply: [
      "Based on what you shared, here are fleet matches from our Maryland / DMV inventory:",
      ...lines,
      "",
      "Every booking is human-confirmed. Call (301) 615-1545 or use Book Now for a concierge handoff — we can also text you back from that intake.",
    ].join("\n"),
  };
}
