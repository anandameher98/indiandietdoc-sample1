CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'phone')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  kind TEXT NOT NULL DEFAULT 'ebook',
  amount_paise INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  download_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT TO anon, authenticated USING (active = true);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT,
  amount_paise INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);
CREATE INDEX orders_user_idx ON public.orders (user_id, created_at DESC);
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

INSERT INTO public.products (slug, name, description, kind, amount_paise, download_url) VALUES
  ('healthy-recipe-book', 'Healthy Recipe Book', '80+ everyday Indian recipes for fat loss.', 'ebook', 49900, 'https://indiandietdoc-sample1.lovable.app/downloads/healthy-recipe-book.pdf'),
  ('high-protein-recipes', 'High Protein Recipes', 'Vegetarian & non-veg high-protein Indian meals.', 'ebook', 59900, 'https://indiandietdoc-sample1.lovable.app/downloads/high-protein-recipes.pdf'),
  ('indian-meal-prep-guide', 'Indian Meal Prep Guide', 'Weekly meal prep made simple for Indian kitchens.', 'ebook', 69900, 'https://indiandietdoc-sample1.lovable.app/downloads/indian-meal-prep-guide.pdf'),
  ('diabetic-friendly-recipes', 'Diabetic Friendly Recipes', 'Low-GI Indian recipes for blood sugar balance.', 'ebook', 79900, 'https://indiandietdoc-sample1.lovable.app/downloads/diabetic-friendly-recipes.pdf'),
  ('program-basic', 'Basic Program', 'Personalized diet plan, basic workout plan, bi-weekly check-ins.', 'program', 499900, NULL),
  ('program-premium', 'Premium Program', 'Fully custom diet & training with weekly 1-on-1 calls.', 'program', 899900, NULL),
  ('program-elite', 'Elite Program', 'Total transformation with 24/7 priority support.', 'program', 1499900, NULL);