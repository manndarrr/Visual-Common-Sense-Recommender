
-- Create products table for Kaggle fashion dataset
CREATE TABLE public.products (
  id BIGINT PRIMARY KEY,
  gender TEXT,
  master_category TEXT,
  sub_category TEXT,
  article_type TEXT,
  base_colour TEXT,
  season TEXT,
  year INTEGER,
  usage TEXT,
  product_display_name TEXT,
  image_filename TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (product catalog is public)
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT USING (true);

-- Create indexes for filtering
CREATE INDEX idx_products_master_category ON public.products(master_category);
CREATE INDEX idx_products_sub_category ON public.products(sub_category);
CREATE INDEX idx_products_article_type ON public.products(article_type);
CREATE INDEX idx_products_base_colour ON public.products(base_colour);
CREATE INDEX idx_products_season ON public.products(season);
CREATE INDEX idx_products_usage ON public.products(usage);
CREATE INDEX idx_products_gender ON public.products(gender);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
