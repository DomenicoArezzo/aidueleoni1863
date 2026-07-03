
-- Switch SECURITY DEFINER functions to SECURITY INVOKER and lock down execute grants.

-- 1) is_admin: SECURITY INVOKER. Allow authenticated users to read their own user_roles rows so the function works under invoker rights.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
  )
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Ensure authenticated users can read their own role rows (needed for invoker-side is_admin()).
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 2) get_unavailable_dates: SECURITY INVOKER. Admins keep access via existing RLS; public/anon access is served through the check-availability edge function (service_role).
CREATE OR REPLACE FUNCTION public.get_unavailable_dates(
  _property_id uuid,
  _from_date date DEFAULT CURRENT_DATE,
  _to_date date DEFAULT (CURRENT_DATE + INTERVAL '365 days')::date
)
RETURNS TABLE(date_start date, date_end date, block_type text, source text)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT check_in AS date_start, check_out AS date_end, 'booking' AS block_type, source::TEXT
  FROM public.bookings
  WHERE property_id = _property_id
    AND status != 'cancelled'
    AND check_out > _from_date
    AND check_in < _to_date
  UNION ALL
  SELECT start_date AS date_start, end_date AS date_end, 'block' AS block_type, 'manual' AS source
  FROM public.availability_blocks
  WHERE property_id = _property_id
    AND end_date >= _from_date
    AND start_date < _to_date
  ORDER BY date_start
$$;

REVOKE ALL ON FUNCTION public.get_unavailable_dates(uuid, date, date) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_unavailable_dates(uuid, date, date) TO authenticated, service_role;

-- 3) check_availability: SECURITY INVOKER; only edge functions (service_role) call it.
CREATE OR REPLACE FUNCTION public.check_availability(
  _property_id uuid,
  _check_in date,
  _check_out date
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.bookings
    WHERE property_id = _property_id
      AND status != 'cancelled'
      AND check_in < _check_out
      AND check_out > _check_in
  ) AND NOT EXISTS (
    SELECT 1 FROM public.availability_blocks
    WHERE property_id = _property_id
      AND start_date < _check_out
      AND end_date >= _check_in
  )
$$;

REVOKE ALL ON FUNCTION public.check_availability(uuid, date, date) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_availability(uuid, date, date) TO service_role;
