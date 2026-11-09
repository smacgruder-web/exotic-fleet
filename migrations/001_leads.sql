-- Postgres-ready schema for Cursor apps-database / DATABASE_URL.
-- Local demo persists to data/leads.json until a pg client is wired.

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  occasion TEXT NOT NULL DEFAULT '',
  market TEXT NOT NULL DEFAULT 'maryland',
  preferred_vehicle_id TEXT,
  start_date DATE,
  end_date DATE,
  passengers INT,
  drive_preference TEXT,
  special_interest TEXT,
  gift_preference TEXT,
  message TEXT,
  estimated_quote NUMERIC,
  status TEXT NOT NULL DEFAULT 'new',
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  source TEXT NOT NULL DEFAULT 'web'
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
