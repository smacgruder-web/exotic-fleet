"use client";

import { useState } from "react";
import Link from "next/link";

type Match = {
  id: string;
  name: string;
  dailyRate: number | null;
  rateStatus: string;
  image: string;
  category: string;
};

type Msg = { role: "user" | "assistant"; text: string };

const starters = [
  "Anniversary dinner in Annapolis for two",
  "Wedding party of 8 needs a Sprinter",
  "Weekend Urus near National Harbor",
  "Chauffeur Ghost for a corporate arrival",
];

export function FleetMatchChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Tell me the occasion, passenger count, and whether you want self-drive or chauffeur. I’ll match the Maryland / DMV fleet — then we hand off to a human for confirmation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [busy, setBusy] = useState(false);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          historyLength: messages.length,
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply as string }]);
      setMatches((data.matches as Match[]) ?? []);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Something went wrong on our side. Call (301) 615-1545 and we’ll match you live.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="fleet-match"
      className="border-y border-ink-line bg-asphalt"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-champagne">
            AI fleet match · Phase 1
          </p>
          <h2 className="mt-3 font-display text-4xl text-silver md:text-5xl">
            Find the right machine in a sentence.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-muted">
            Rule-based matching against our editable fleet inventory. Paid bookings
            always go through a human — tap to call or continue to intake for SMS follow-up.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="border border-ink-line bg-ink/50 px-3 py-2 text-left text-xs text-mist transition hover:border-champagne/50 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 h-[340px] overflow-y-auto border border-ink-line bg-ink/70 p-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`mb-4 whitespace-pre-wrap text-sm leading-relaxed ${
                  m.role === "user" ? "text-champagne" : "text-mist"
                }`}
              >
                <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.2em] text-mist-muted">
                  {m.role === "user" ? "You" : "RS Concierge AI"}
                </span>
                {m.text}
              </div>
            ))}
          </div>

          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the trip…"
              className="flex-1 border border-ink-line bg-ink px-4 py-3 text-sm text-white outline-none ring-champagne focus:ring-1"
            />
            <button
              type="submit"
              disabled={busy}
              className="bg-signal px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50"
            >
              Match
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="tel:+13016151545"
              className="border border-champagne px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-champagne hover:bg-champagne hover:text-ink"
            >
              Call concierge
            </a>
            <a
              href="sms:+13016151545"
              className="border border-ink-line px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-mist hover:border-white hover:text-white"
            >
              SMS handoff
            </a>
            <Link
              href="/book"
              className="border border-ink-line px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-mist hover:border-white hover:text-white"
            >
              Full intake
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-mist-muted">
            Suggested matches
          </p>
          {matches.length === 0 ? (
            <div className="border border-dashed border-ink-line p-8 text-sm text-mist-muted">
              Matches appear here after you ask.
            </div>
          ) : (
            matches.map((m) => (
              <div
                key={m.id}
                className="border border-ink-line bg-ink-soft/80 p-4 animate-reveal"
              >
                <div className="font-display text-xl text-white">{m.name}</div>
                <div className="mt-1 text-sm text-champagne">
                  {m.dailyRate != null
                    ? `$${m.dailyRate.toLocaleString("en-US")}/day archive`
                    : "Price on request"}
                </div>
                <Link
                  href={`/book?vehicle=${m.id}`}
                  className="mt-3 inline-block text-xs uppercase tracking-[0.16em] text-mist underline underline-offset-4 hover:text-white"
                >
                  Start booking
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
