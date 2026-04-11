
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Everyone can view categories
CREATE POLICY "Categories viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed categories
INSERT INTO public.categories (name, icon, description) VALUES
  ('Beaches', '🏖️', 'Sun, sand, and coastal beauty'),
  ('Mountains', '🏔️', 'Peaks, valleys, and hill stations'),
  ('Heritage', '🏛️', 'Historic monuments and cultural sites'),
  ('Wildlife', '🐅', 'National parks and sanctuaries'),
  ('Spiritual', '🙏', 'Temples, pilgrimages, and sacred sites'),
  ('Festivals', '🎊', 'Vibrant Indian festivals and celebrations'),
  ('Craft', '🎨', 'Traditional arts and handicrafts');
