ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_whatsapp text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at timestamptz;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sample_pdf_url text;
UPDATE public.products SET sample_pdf_url = '/samples/indiandietdoc-sample.pdf' WHERE sample_pdf_url IS NULL;