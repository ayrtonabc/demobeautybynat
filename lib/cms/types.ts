export interface SiteContent {
  id: string;
  website_id: string;
  page_path: string;
  section_key: string;
  content_value: string;
  language_code: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  website_id: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  map_embed_url?: string;
  logo_url?: string;
  logo_secondary_url?: string;
  business_name?: string;
  business_description?: string;
  opening_hours?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  website_id: string;
  name: string;
  quote: string;
  rating: number;
  source?: string;
  review_date?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  website_id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  website_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  author: string;
  published: boolean;
  language_code: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  website_id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  image_url?: string;
  available: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  website_id: string;
  name: string;
  description?: string;
  order: number;
  language_code: string;
  created_at: string;
  updated_at: string;
}

export interface BookingService {
  id: string;
  website_id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image_url?: string;
  online_booking: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  website_id: string;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  source: string;
  service_interest?: string;
  created_at: string;
  updated_at: string;
}

export interface PageData {
  content: SiteContent[];
  settings: SiteSettings | null;
  testimonials: Testimonial[];
  services: Service[];
  blog_posts?: BlogPost[];
  menu_items?: MenuItem[];
  booking_services?: BookingService[];
  available_languages: string[];
}

export interface CMSConfig {
  tenantId: string;
  siteUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}
