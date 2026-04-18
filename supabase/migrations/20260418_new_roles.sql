-- Add new staff roles to the profiles role column.
-- If profiles uses a CHECK constraint on role, extend it here.
-- If profiles uses an enum type, add the new values first.

-- Attempt to update CHECK constraint (safe: drop old, add new)
DO $$
BEGIN
  -- Drop existing role check if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'profiles'
      AND constraint_type = 'CHECK'
      AND constraint_name LIKE '%role%'
  ) THEN
    EXECUTE (
      SELECT 'ALTER TABLE profiles DROP CONSTRAINT ' || constraint_name
      FROM information_schema.table_constraints
      WHERE table_name = 'profiles'
        AND constraint_type = 'CHECK'
        AND constraint_name LIKE '%role%'
      LIMIT 1
    );
  END IF;
END $$;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'driver', 'station_master', 'finance', 'authority', 'inspector'));

-- RLS policies: station_master can view all bookings and buses (read-only)
CREATE POLICY IF NOT EXISTS "station_master_bookings_read"
  ON bookings FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'station_master')
  );

CREATE POLICY IF NOT EXISTS "station_master_buses_read"
  ON buses FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'station_master')
  );

-- Finance can view bookings read-only
CREATE POLICY IF NOT EXISTS "finance_bookings_read"
  ON bookings FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'finance')
  );

-- Authority can view everything read-only
CREATE POLICY IF NOT EXISTS "authority_bookings_read"
  ON bookings FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'authority')
  );

CREATE POLICY IF NOT EXISTS "authority_buses_read"
  ON buses FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'authority')
  );

CREATE POLICY IF NOT EXISTS "authority_routes_read"
  ON routes FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'authority')
  );

-- Inspector can view buses and drivers read-only
CREATE POLICY IF NOT EXISTS "inspector_buses_read"
  ON buses FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'inspector')
  );

CREATE POLICY IF NOT EXISTS "inspector_routes_read"
  ON routes FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'inspector')
  );

-- Station master can update boarded status on bookings
CREATE POLICY IF NOT EXISTS "station_master_boarding_update"
  ON bookings FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'station_master')
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'station_master')
  );
