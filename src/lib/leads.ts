import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Lead, LeadStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]\n", "utf8");
  }
}

async function readJsonLeads(): Promise<Lead[]> {
  await ensureStore();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeJsonLeads(leads: Lead[]) {
  await ensureStore();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
}

/** Postgres-ready hook: when DATABASE_URL is set, swap this module’s storage. */
export function storageMode(): "json" | "postgres-ready" {
  return process.env.DATABASE_URL ? "postgres-ready" : "json";
}

export type CreateLeadInput = Omit<
  Lead,
  "id" | "createdAt" | "updatedAt" | "status" | "notes"
> & {
  status?: LeadStatus;
  notes?: string[];
};

export async function listLeads(): Promise<Lead[]> {
  // Future: if (process.env.DATABASE_URL) query Postgres.
  const leads = await readJsonLeads();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: input.status ?? "new",
    notes: input.notes ?? [],
  };

  if (process.env.DATABASE_URL) {
    // Schema lives in migrations/001_leads.sql — wire a pg client when Cursor apps-database is attached.
    // Fall through to JSON so local/demo still works until the driver is connected.
  }

  const leads = await readJsonLeads();
  leads.push(lead);
  await writeJsonLeads(leads);
  return lead;
}

export async function updateLead(
  id: string,
  patch: { status?: LeadStatus; note?: string },
): Promise<Lead | null> {
  const leads = await readJsonLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  const current = leads[idx];
  const notes = [...current.notes];
  if (patch.note?.trim()) {
    notes.push(`${new Date().toISOString()} — ${patch.note.trim()}`);
  }
  const updated: Lead = {
    ...current,
    status: patch.status ?? current.status,
    notes,
    updatedAt: new Date().toISOString(),
  };
  leads[idx] = updated;
  await writeJsonLeads(leads);
  return updated;
}
