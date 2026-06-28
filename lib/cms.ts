import { pb, getTenantFilter, normalizeImageUrl, PB_URL } from './pocketbase';

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

export interface PageData {
    content: SiteContent[];
    settings: SiteSettings | null;
    available_languages: string[];
}

export async function getPageContent(
    pagePath: string,
    languageCode: string = 'es'
): Promise<SiteContent[]> {
    try {
        const filter = `(${getTenantFilter()}) && (page_path = "${pagePath}") && (language_code = "${languageCode}")`;
        
        const records = await pb.collection('site_content').getFullList({
            filter,
            $autoCancel: false,
        });
        
        return records as unknown as SiteContent[];
    } catch (error) {
        console.error('Error fetching page content:', error);
        return [];
    }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const filter = getTenantFilter();
        
        const records = await pb.collection('site_settings').getFullList({
            filter,
            $autoCancel: false,
        });
        
        if (records.length === 0) {
            return null;
        }
        
        const settings = records[0] as unknown as SiteSettings;
        
        if (settings.logo_url && !settings.logo_url.startsWith('http')) {
            settings.logo_url = normalizeImageUrl(
                settings.logo_url,
                'site_settings',
                settings.id
            );
        }
        
        return settings;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return null;
    }
}

export async function getAvailableLanguages(): Promise<string[]> {
    try {
        const filter = getTenantFilter();
        
        const records = await pb.collection('website_languages').getFullList({
            filter,
            $autoCancel: false,
        });
        
        const codes = records
            .map((r: any) => r.expand?.language_id?.code)
            .filter(Boolean) as string[];
        
        if (!codes.includes('es')) {
            codes.unshift('es');
        }
        
        return codes;
    } catch (error) {
        console.error('Error fetching available languages:', error);
        return ['es'];
    }
}

export async function fetchPageData(
    pagePath: string,
    languageCode: string = 'es'
): Promise<PageData> {
    const [content, settings, available_languages] = await Promise.all([
        getPageContent(pagePath, languageCode),
        getSiteSettings(),
        getAvailableLanguages(),
    ]);
    
    return {
        content,
        settings,
        available_languages,
    };
}

export function getContentValue(
    pageData: PageData,
    sectionKey: string,
    fallback: string = ''
): string {
    const item = pageData.content.find((c) => c.section_key === sectionKey);
    return item?.content_value || fallback;
}

export function getContentJson<T = any>(
    pageData: PageData,
    sectionKey: string,
    fallback: T
): T {
    const item = pageData.content.find((c) => c.section_key === sectionKey);
    if (!item?.content_value) return fallback;
    
    try {
        return JSON.parse(item.content_value) as T;
    } catch {
        return fallback;
    }
}

export async function getTestimonials(): Promise<any[]> {
    try {
        const filter = getTenantFilter();
        
        const records = await pb.collection('testimonials').getFullList({
            filter,
            sort: '-created',
            $autoCancel: false,
        });
        
        return records.map((r: any) => ({
            ...r,
            profile_image: normalizeImageUrl(r.profile_image, 'testimonials', r.id),
        }));
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
}

export async function getServices(category?: string): Promise<any[]> {
    try {
        let filter = getTenantFilter();
        
        if (category) {
            filter = `(${filter}) && (category = "${category}")`;
        }
        
        const records = await pb.collection('shop_products').getFullList({
            filter,
            sort: 'name',
            $autoCancel: false,
        });
        
        return records.map((r: any) => ({
            ...r,
            image_url: normalizeImageUrl(r.image_url, 'shop_products', r.id),
        }));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getBlogPosts(
    languageCode: string = 'es',
    limit: number = 10
): Promise<any[]> {
    try {
        const filter = `(${getTenantFilter()}) && (language_code = "${languageCode}")`;
        
        const records = await pb.collection('blog_posts').getFullList({
            filter,
            sort: '-created',
            perPage: limit,
            $autoCancel: false,
        });
        
        return records.map((r: any) => ({
            ...r,
            image_url: normalizeImageUrl(r.image_url, 'blog_posts', r.id),
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getProjects(
    languageCode: string = 'es'
): Promise<any[]> {
    try {
        const filter = `(${getTenantFilter()}) && (language_code = "${languageCode}")`;
        
        const records = await pb.collection('projects').getFullList({
            filter,
            sort: '-created',
            $autoCancel: false,
        });
        
        return records.map((r: any) => ({
            ...r,
            image_url: normalizeImageUrl(r.image_url, 'projects', r.id),
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export { PB_URL };