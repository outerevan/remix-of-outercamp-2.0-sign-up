-- Rename generic question columns to descriptive names
ALTER TABLE waitlist_signups RENAME COLUMN question_1 TO product_interest;
ALTER TABLE waitlist_signups RENAME COLUMN question_2 TO crowdfunding_interest;
ALTER TABLE waitlist_signups RENAME COLUMN question_3 TO investment_interest;
ALTER TABLE waitlist_signups RENAME COLUMN question_4 TO referral_source;

-- Add column comments for dashboard clarity
COMMENT ON COLUMN waitlist_signups.product_interest IS 'What interests you most about Outercamp 2.0?';
COMMENT ON COLUMN waitlist_signups.crowdfunding_interest IS 'Would you like to be notified if we open crowdfunding opportunities?';
COMMENT ON COLUMN waitlist_signups.investment_interest IS 'Would you like to hear about private investment opportunities?';
COMMENT ON COLUMN waitlist_signups.referral_source IS 'How did you first hear about Outercamp?';
COMMENT ON COLUMN waitlist_signups.phone_number IS 'Optional — provided if interested in private investment';
COMMENT ON COLUMN waitlist_signups.list_tag IS 'Always outercamp-2.0-waitlist for CRM organization';
COMMENT ON COLUMN waitlist_signups.segments IS 'Auto-computed: crowdfunding, private_investment, sauna_socials, stay_at_camp';
