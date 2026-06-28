-- Schema para Valiente Estudio de Belleza
-- Ejecutar en Supabase SQL Editor

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  youtube TEXT,
  map_embed_url TEXT,
  logo_url TEXT,
  logo_secondary_url TEXT,
  business_name TEXT,
  opening_hours TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Content (texto editable por página/sección)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_value TEXT,
  language_code TEXT DEFAULT 'es',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(website_id, page_path, section_key, language_code)
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  source TEXT DEFAULT 'google',
  review_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  duration TEXT,
  category TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking Services
CREATE TABLE IF NOT EXISTS booking_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  duration TEXT,
  category TEXT,
  image_url TEXT,
  online_booking BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  author TEXT,
  published BOOLEAN DEFAULT false,
  language_code TEXT DEFAULT 'es',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(website_id, slug)
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  service_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking Appointments
CREATE TABLE IF NOT EXISTS booking_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  service_id TEXT,
  service_name TEXT,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  booking_date DATE NOT NULL,
  booking_time TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id TEXT NOT NULL,
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies para sitio público (lectura sin auth)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read booking_services" ON booking_services FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert booking_appointments" ON booking_appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);

-- Insertar datos iniciales de Valiente Estética
INSERT INTO site_settings (website_id, phone, email, whatsapp, address, instagram, facebook, youtube, map_embed_url, business_name) VALUES
('valiente-estetica', '02994716807', 'hola@valiente-estetica.com', '542994716807', '9 de Julio 181, Cinco Saltos, Río Negro', 'valienteestudiodebelleza', 'Valiente-Estudio-de-Belleza-61587077702119', 'PLXzSMlGeO0vt4WxgUdqSYkPG6d6teTBp8', 'https://maps.app.goo.gl/3zLaZMXrFeq5BkLd7', 'Valiente Estudio de Belleza')
ON CONFLICT (website_id) DO NOTHING;
