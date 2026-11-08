"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "booked",
  "closed",
  "lost",
];

export function ConciergeDesk() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [storage, setStorage] = useState("json");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data.leads ?? []);
      setStorage(data.storage ?? "json");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function patch(id: string, body: { status?: LeadStatus; note?: string }) {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setNoteDrafts((d) => ({ ...d, [id]: "" }));
      await refresh();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
            Follow-up workflow stub
          </p>
          <h1 className="mt-2 font-display text-4xl text-silver">Concierge desk</h1>
          <p className="mt-2 text-sm text-mist-muted">
            Storage: {storage}. Update status and append notes for guest lifecycle.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="border border-ink-line px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-mist hover:text-white"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-mist-muted">Loading leads…</p>
      ) : leads.length === 0 ? (
        <p className="border border-dashed border-ink-line p-8 text-sm text-mist-muted">
          No leads yet. Submit the intake form on /book to seed the pipeline.
        </p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="border border-ink-line bg-ink-soft/50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-white">{lead.name}</h2>
                  <p className="mt-1 text-sm text-mist">
                    {lead.phone} · {lead.email}
                  </p>
                  <p className="mt-1 text-xs text-mist-muted">
                    {lead.occasion || "No occasion"} · {lead.market} ·{" "}
                    {lead.preferredVehicleId || "any vehicle"}
                  </p>
                </div>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    void patch(lead.id, {
                      status: e.target.value as LeadStatus,
                    })
                  }
                  className="border border-ink-line bg-ink px-3 py-2 text-xs uppercase tracking-[0.14em] text-champagne"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {lead.message && (
                <p className="mt-3 text-sm text-mist-muted">{lead.message}</p>
              )}

              {lead.notes.length > 0 && (
                <ul className="mt-3 space-y-1 border-t border-ink-line pt-3 text-xs text-mist-muted">
                  {lead.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  value={noteDrafts[lead.id] ?? ""}
                  onChange={(e) =>
                    setNoteDrafts((d) => ({ ...d, [lead.id]: e.target.value }))
                  }
                  placeholder="Add follow-up note…"
                  className="flex-1 border border-ink-line bg-ink px-3 py-2 text-sm text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    void patch(lead.id, { note: noteDrafts[lead.id] })
                  }
                  className="bg-signal px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-white"
                >
                  Save note
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
