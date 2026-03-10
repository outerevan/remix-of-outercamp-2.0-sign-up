-- Add question 4, phone number, list tag, and segment columns
ALTER TABLE waitlist_signups
  ADD COLUMN IF NOT EXISTS question_4 TEXT,
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS list_tag TEXT DEFAULT 'outercamp-2.0-waitlist',
  ADD COLUMN IF NOT EXISTS segments TEXT[] DEFAULT '{}';
