
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
CREATE TRIGGER on_auth_user_created_role AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  state TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  short_desc TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  itinerary TEXT[] NOT NULL DEFAULT '{}',
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Destinations viewable by everyone" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Admins can insert destinations" ON public.destinations FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update destinations" ON public.destinations FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete destinations" ON public.destinations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  persons INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Logged in users can add reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_destinations_category ON public.destinations(category);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_reviews_destination ON public.reviews(destination_id);
CREATE INDEX idx_destinations_search ON public.destinations USING GIN(to_tsvector('english', title || ' ' || state || ' ' || description));
