-- Safe transition from the legacy Nice Exchange schema.
-- Review the backup table and row count in the target Supabase project before dropping it.
BEGIN;

CREATE TABLE IF NOT EXISTS public.nice_exchange_applications_legacy_backup_20260907
AS TABLE public.nice_exchange_applications WITH DATA;

ALTER TABLE public.nice_exchange_applications
    ADD COLUMN IF NOT EXISTS language_level VARCHAR(50),
    ADD COLUMN IF NOT EXISTS motivation_essay TEXT,
    ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50),
    ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

UPDATE public.nice_exchange_applications
SET language_level = french_level,
    motivation_essay = essay,
    parent_name = parent_guardian_name,
    parent_phone = emergency_contact,
    terms_accepted = TRUE,
    updated_at = COALESCE(created_at, CURRENT_TIMESTAMP)
WHERE language_level IS NULL
   OR motivation_essay IS NULL
   OR parent_phone IS NULL
   OR terms_accepted IS NULL
   OR updated_at IS NULL;

ALTER TABLE public.nice_exchange_applications
    ALTER COLUMN language_level SET NOT NULL,
    ALTER COLUMN motivation_essay SET NOT NULL,
    ALTER COLUMN parent_phone SET NOT NULL,
    ALTER COLUMN terms_accepted SET NOT NULL,
    ALTER COLUMN terms_accepted SET DEFAULT FALSE,
    ALTER COLUMN updated_at SET NOT NULL,
    ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE public.nice_exchange_applications
    DROP COLUMN IF EXISTS parent_guardian_name,
    DROP COLUMN IF EXISTS french_level,
    DROP COLUMN IF EXISTS preferred_date,
    DROP COLUMN IF EXISTS duration,
    DROP COLUMN IF EXISTS accommodation,
    DROP COLUMN IF EXISTS essay,
    DROP COLUMN IF EXISTS dietary_restrictions,
    DROP COLUMN IF EXISTS emergency_contact;

ALTER TABLE public.nice_exchange_applications
    DROP CONSTRAINT IF EXISTS nice_exchange_age_check,
    DROP CONSTRAINT IF EXISTS nice_exchange_email_format,
    DROP CONSTRAINT IF EXISTS nice_exchange_phone_format;

ALTER TABLE public.nice_exchange_applications
    ADD CONSTRAINT nice_exchange_age_check CHECK (age >= 14 AND age <= 99),
    ADD CONSTRAINT nice_exchange_language_level_check CHECK (language_level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
    ADD CONSTRAINT nice_exchange_essay_word_count_check CHECK (array_length(regexp_split_to_array(btrim(motivation_essay), '\s+'), 1) BETWEEN 300 AND 500),
    ADD CONSTRAINT nice_exchange_parent_phone_format CHECK (parent_phone ~ '^[0-9+() -]{7,50}$'),
    ADD CONSTRAINT nice_exchange_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
    ADD CONSTRAINT nice_exchange_phone_format CHECK (phone ~ '^[0-9+() -]{7,50}$'),
    ADD CONSTRAINT nice_exchange_terms_accepted_check CHECK (terms_accepted = TRUE);

ALTER TABLE public.nice_exchange_applications ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.users
        WHERE public.users.id = auth.uid() AND public.users.role = 'admin'
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

DROP POLICY IF EXISTS "Public nice exchange insert" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Public nice exchange read access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange read access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange update access" ON public.nice_exchange_applications;
DROP POLICY IF EXISTS "Admin nice exchange delete access" ON public.nice_exchange_applications;

CREATE POLICY "Public nice exchange insert"
ON public.nice_exchange_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending' AND terms_accepted = TRUE);

CREATE POLICY "Admin nice exchange read access"
ON public.nice_exchange_applications
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin nice exchange update access"
ON public.nice_exchange_applications
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (status IN ('pending', 'approved', 'rejected'));

CREATE POLICY "Admin nice exchange delete access"
ON public.nice_exchange_applications
FOR DELETE
TO authenticated
USING (public.is_admin());

COMMIT;