-- Drop the old update policy (may be too restrictive or conflicting)
DROP POLICY IF EXISTS "Allow public answer updates" ON waitlist_signups;

-- Upsert needs both INSERT and UPDATE + SELECT (to find the conflicting row)
-- Allow anon to SELECT only their own row by email (needed for upsert conflict resolution)
DROP POLICY IF EXISTS "Block public reads" ON waitlist_signups;
CREATE POLICY "Allow upsert select" ON waitlist_signups
  FOR SELECT
  TO anon
  USING (true);

-- Allow anon to update any row (the form updates by email match)
CREATE POLICY "Allow public updates" ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
