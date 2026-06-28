import { createClient } from '@supabase/supabase-js';
import type { CMSConfig } from './types';

const config: CMSConfig = {
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || 'valiente-estetica',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://valiente-estetica.com',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};

export const supabase = config.supabaseUrl && config.supabaseAnonKey
  ? createClient(config.supabaseUrl, config.supabaseAnonKey)
  : null;

export const TENANT_ID = config.tenantId;

export function getTenantFilter(): string {
  return `website_id = "${TENANT_ID}"`;
}

export function getContentFilter(pagePath: string, languageCode: string = 'es'): string {
  return `${getTenantFilter()} AND page_path = '${pagePath}' AND language_code = '${languageCode}'`;
}

export { config as cmsConfig };
