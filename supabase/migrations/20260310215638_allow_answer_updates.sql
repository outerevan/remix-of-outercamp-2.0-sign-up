-- Allow anon to update only the question columns on existing rows
CREATE POLICY "Allow public answer updates" ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
