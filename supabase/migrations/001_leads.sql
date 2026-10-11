-- Supabase Migration: 001_leads.sql
-- Creates leads table with strict Row Level Security (RLS) enabled
-- NO public read or write policies: access is strictly reserved for the server-side service role key.

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    program TEXT NOT NULL,
    audience TEXT,
    consent BOOLEAN NOT NULL DEFAULT true,
    consent_version TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    track_source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Revoke all public access by default
REVOKE ALL ON public.leads FROM anon, authenticated;

-- Service role bypasses RLS and handles inserts/reads securely on the server
CREATE POLICY "Service Role full access"
    ON public.leads
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Index for duplicate checks and analytics
CREATE INDEX IF NOT EXISTS idx_leads_phone_created ON public.leads (phone, created_at DESC);
