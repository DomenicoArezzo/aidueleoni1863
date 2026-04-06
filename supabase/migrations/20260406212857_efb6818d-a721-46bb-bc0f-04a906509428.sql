-- Create enum for booking sources
CREATE TYPE public.booking_source AS ENUM ('manual', 'booking_com', 'airbnb', 'website');

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'pending', 'cancelled');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Properties table (multi-property ready)
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  max_guests INTEGER DEFAULT 6,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  source booking_source NOT NULL DEFAULT 'manual',
  status booking_status NOT NULL DEFAULT 'confirmed',
  external_uid TEXT,
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_guests INTEGER DEFAULT 1,
  notes TEXT,
  raw_ical_data TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT check_dates CHECK (check_out > check_in),
  CONSTRAINT unique_external_uid UNIQUE (property_id, source, external_uid)
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_bookings_dates ON public.bookings (property_id, check_in, check_out);
CREATE INDEX idx_bookings_source ON public.bookings (source);

-- Availability blocks (manual overrides)
CREATE TABLE public.availability_blocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT check_block_dates CHECK (end_date >= start_date)
);

ALTER TABLE public.availability_blocks ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_blocks_dates ON public.availability_blocks (property_id, start_date, end_date);

-- iCal feeds configuration
CREATE TABLE public.ical_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  source booking_source NOT NULL,
  ical_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  poll_interval_minutes INTEGER DEFAULT 15,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ical_feeds ENABLE ROW LEVEL SECURITY;

-- Sync logs
CREATE TABLE public.sync_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feed_id UUID REFERENCES public.ical_feeds(id) ON DELETE SET NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  events_found INTEGER DEFAULT 0,
  events_created INTEGER DEFAULT 0,
  events_updated INTEGER DEFAULT 0,
  events_removed INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check availability
CREATE OR REPLACE FUNCTION public.check_availability(
  _property_id UUID,
  _check_in DATE,
  _check_out DATE
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
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

-- Function to get unavailable dates
CREATE OR REPLACE FUNCTION public.get_unavailable_dates(
  _property_id UUID,
  _from_date DATE DEFAULT CURRENT_DATE,
  _to_date DATE DEFAULT (CURRENT_DATE + INTERVAL '365 days')::DATE
)
RETURNS TABLE(date_start DATE, date_end DATE, block_type TEXT, source TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
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

-- RLS Policies

CREATE POLICY "Anyone can view active properties" ON public.properties
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage properties" ON public.properties
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage bookings" ON public.bookings
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage blocks" ON public.availability_blocks
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage feeds" ON public.ical_feeds
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage feeds" ON public.ical_feeds
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view sync logs" ON public.sync_logs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage sync logs" ON public.sync_logs
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Triggers
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at BEFORE UPDATE ON public.availability_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feeds_updated_at BEFORE UPDATE ON public.ical_feeds
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default property
INSERT INTO public.properties (name, slug, description, address, latitude, longitude, max_guests)
VALUES (
  'Ai due leoni',
  'ai-due-leoni',
  'Casa vacanze di lusso nel cuore di Ragusa, Sicilia',
  'Via Archimede 117, 97100 Ragusa (RG), Sicilia, Italia',
  36.9269,
  14.7253,
  6
);