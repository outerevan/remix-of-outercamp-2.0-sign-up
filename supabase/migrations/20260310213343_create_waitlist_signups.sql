-- Waitlist signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  question_1 TEXT,
  question_2 TEXT,
  question_3 TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the form is public)
CREATE POLICY "Allow public inserts" ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block reads from anon (admin only via dashboard/service role)
CREATE POLICY "Block public reads" ON waitlist_signups
  FOR SELECT
  TO anon
  USING (false);

-- Index on email for uniqueness lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups (email);
