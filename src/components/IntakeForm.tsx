"use client";

import { useMemo, useState } from "react";
import type { FleetVehicle } from "@/lib/types";

const fieldClass =
  "mt-2 w-full border border-ink-line bg-paper px-3 py-3 text-sm text-ink outline-none focus:border-champagne";

export function IntakeForm({
  vehicles,
  defaultVehicleId,
}: {
  vehicles: FleetVehicle[];
  defaultVehicleId?: string;
}) {
  const initialVehicle = useMemo(() => {
    if (defaultVehicleId && vehicles.some((v) => v.id === defaultVehicleId)) {
      return defaultVehicleId;
    }
    return vehicles[0]?.id ?? "";
  }, [defaultVehicleId, vehicles]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    market: "maryland",
    preferredVehicleId: initialVehicle,
    startDate: "",
    endDate: "",
    passengers: 2,
    drivePreference: "either" as "self" | "chauffeur" | "either",
    specialInterest: "none" as
      | "none"
      | "loyalty"
      | "holiday"
      | "birthdayAnniversary",
    giftPreference: "none" as "flowers" | "champagne" | "none",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [leadId, setLeadId] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "web-intake",
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setLeadId(data.lead.id as string);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-champagne/40 bg-paper p-8 text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
          Request received
        </p>
        <h3 className="mt-3 font-display text-3xl text-ink">
          A representative will be by your side.
        </h3>
        <p className="mt-3 text-sm text-mist-muted">
          Lead {leadId?.slice(0, 8)} saved. Call or text{" "}
          <a href="tel:+13016151545" className="text-champagne">
            (301) 615-1545
          </a>{" "}
          for immediate concierge / SMS handoff.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 border border-ink-line bg-paper p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Phone">
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Occasion">
          <input
            value={form.occasion}
            onChange={(e) => update("occasion", e.target.value)}
            placeholder="Anniversary, airport, wedding…"
            className={fieldClass}
          />
        </Field>
        <Field label="Preferred vehicle">
          <select
            value={form.preferredVehicleId}
            onChange={(e) => update("preferredVehicleId", e.target.value)}
            className={fieldClass}
          >
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Market">
          <select
            value={form.market}
            onChange={(e) => update("market", e.target.value)}
            className={fieldClass}
          >
            <option value="maryland">Maryland</option>
            <option value="dc">Washington DC</option>
            <option value="virginia">Virginia</option>
            <option value="miami">Miami</option>
          </select>
        </Field>
        <Field label="Start date">
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => update("startDate", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="End date">
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => update("endDate", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Passengers">
          <input
            type="number"
            min={1}
            max={20}
            value={form.passengers}
            onChange={(e) => update("passengers", Number(e.target.value))}
            className={fieldClass}
          />
        </Field>
        <Field label="Drive preference">
          <select
            value={form.drivePreference}
            onChange={(e) =>
              update(
                "drivePreference",
                e.target.value as "self" | "chauffeur" | "either",
              )
            }
            className={fieldClass}
          >
            <option value="either">Either</option>
            <option value="self">Self-drive</option>
            <option value="chauffeur">Chauffeur</option>
          </select>
        </Field>
        <Field label="Special">
          <select
            value={form.specialInterest}
            onChange={(e) =>
              update(
                "specialInterest",
                e.target.value as
                  | "none"
                  | "loyalty"
                  | "holiday"
                  | "birthdayAnniversary",
              )
            }
            className={fieldClass}
          >
            <option value="none">None</option>
            <option value="loyalty">Loyalty 10% off</option>
            <option value="holiday">Holiday 10% + champagne</option>
            <option value="birthdayAnniversary">
              Birthday / Anniversary 10% + gift
            </option>
          </select>
        </Field>
        <Field label="Gift preference">
          <select
            value={form.giftPreference}
            onChange={(e) =>
              update(
                "giftPreference",
                e.target.value as "flowers" | "champagne" | "none",
              )
            }
            className={fieldClass}
          >
            <option value="none">None</option>
            <option value="flowers">Flowers</option>
            <option value="champagne">Champagne</option>
          </select>
        </Field>
      </div>

      <Field label="Notes for concierge">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={fieldClass}
          placeholder="Delivery address, timing, armed chauffeur interest…"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full bg-signal py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50"
      >
        {status === "saving" ? "Sending…" : "Book now — request intake"}
      </button>
      {status === "error" && (
        <p className="text-sm text-signal">
          Could not save. Call (301) 615-1545 and we’ll take it live.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.16em] text-mist-muted">
      {label}
      {children}
    </label>
  );
}
