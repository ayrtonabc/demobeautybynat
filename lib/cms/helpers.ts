import { supabase, getTenantFilter, getContentFilter, TENANT_ID } from './supabase';
import type { SiteContent, SiteSettings, Testimonial, Service, BlogPost, BookingService, Lead } from './types';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('website_id', TENANT_ID)
    .single();
  
  if (error || !data) {
    console.error('Error fetching site settings:', error);
    return null;
  }
  
  return data;
}

export async function getPageContent(pagePath: string, languageCode: string = 'es'): Promise<SiteContent[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .filter('website_id', 'eq', TENANT_ID)
    .filter('page_path', 'eq', pagePath)
    .filter('language_code', 'eq', languageCode);
  
  if (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
  
  return data || [];
}

export function getContentValue(content: SiteContent[], sectionKey: string, fallback: string = ''): string {
  const item = content.find(c => c.section_key === sectionKey);
  return item?.content_value || fallback;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('website_id', TENANT_ID)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data || [];
}

export async function getServices(category?: string): Promise<Service[]> {
  if (!supabase) return [];
  
  let query = supabase
    .from('services')
    .select('*')
    .eq('website_id', TENANT_ID)
    .order('name');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
}

export async function getServiceCategories(): Promise<string[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('services')
    .select('category')
    .eq('website_id', TENANT_ID);
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  const categories = [...new Set(data?.map(s => s.category) || [])];
  return categories;
}

export async function getBlogPosts(languageCode: string = 'es', limit: number = 10): Promise<BlogPost[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('website_id', TENANT_ID)
    .eq('published', true)
    .eq('language_code', languageCode)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data || [];
}

export async function getBookingServices(): Promise<BookingService[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('booking_services')
    .select('*')
    .eq('website_id', TENANT_ID)
    .eq('online_booking', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching booking services:', error);
    return [];
  }
  
  return data || [];
}

export async function createLead(lead: Omit<Lead, 'id' | 'website_id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...lead, website_id: TENANT_ID }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating lead:', error);
    return null;
  }
  
  return data;
}

export async function createBooking(booking: {
  service_id: string;
  service_name: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
}): Promise<boolean> {
  if (!supabase) return false;
  
  const { error } = await supabase
    .from('booking_appointments')
    .insert([{
      ...booking,
      website_id: TENANT_ID,
      status: 'pending',
    }]);
  
  if (error) {
    console.error('Error creating booking:', error);
    return false;
  }
  
  return true;
}

export { TENANT_ID };
