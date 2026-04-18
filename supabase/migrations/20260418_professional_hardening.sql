-- Professional hardening migration
-- Run this in the Supabase SQL editor (or via the CLI).
-- All statements are idempotent; re-running is safe.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. bookings.id — let Postgres generate the UUID instead of the client.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE bookings
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. bookings.route_id / bookings.bus_id / bookings.depart_time
--    Match bookings to the exact bus-run they belong to, not a display string.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS route_id     uuid REFERENCES routes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS bus_id       text REFERENCES buses(id)  ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS depart_time  text,
  ADD COLUMN IF NOT EXISTS travel_date  date;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Hard guarantee: one seat per bus-run.
--    Any second attempt to book the same (bus, date, departure, seat) fails
--    with a unique-violation (23505) that the client catches and shows the
--    user a "seat just got taken" message.
--    Partial index so canceled bookings don't block the seat.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_seat_per_run
  ON bookings (bus_id, travel_date, depart_time, seat_number)
  WHERE status IN ('Confirmed', 'Completed');

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Buses get a scheduled departure time instead of the client guessing from
--    array position.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE buses
  ADD COLUMN IF NOT EXISTS depart_time text DEFAULT '06:00';

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Indexes for the hot-path queries.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS bookings_status_idx          ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_route_date_idx      ON bookings (route_id, travel_date);
CREATE INDEX IF NOT EXISTS bookings_bus_date_idx        ON bookings (bus_id, travel_date);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx      ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS buses_route_id_idx           ON buses (route_id);
CREATE INDEX IF NOT EXISTS buses_driver_id_idx          ON buses (driver_id);
