export interface CMSRegistryItem {
    id: string;
    collection: string;
    field: string;
    recordId: string;
    selector: string;
    type: 'text' | 'image' | 'link' | 'html';
}

export const cmsRegistry: CMSRegistryItem[] = [
    {
        id: 'hero_subtitle',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_hero_subtitle',
        selector: '[data-section="hero"] [data-cms-role="subtitle"]',
        type: 'text',
    },
    {
        id: 'hero_title',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_hero_title',
        selector: '[data-section="hero"] [data-cms-role="title"]',
        type: 'text',
    },
    {
        id: 'hero_description',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_hero_description',
        selector: '[data-section="hero"] [data-cms-role="description"]',
        type: 'html',
    },
    {
        id: 'hero_image',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_hero_image',
        selector: '[data-section="hero"] [data-cms-role="image"]',
        type: 'image',
    },
    {
        id: 'featured_title',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_featured_title',
        selector: '[data-section="featured"] [data-cms-role="title"]',
        type: 'text',
    },
    {
        id: 'featured_description',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_featured_description',
        selector: '[data-section="featured"] [data-cms-role="description"]',
        type: 'html',
    },
    {
        id: 'philosophy_title',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_philosophy_title',
        selector: '[data-section="philosophy"] [data-cms-role="title"]',
        type: 'text',
    },
    {
        id: 'philosophy_description',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_philosophy_description',
        selector: '[data-section="philosophy"] [data-cms-role="description"]',
        type: 'html',
    },
    {
        id: 'contact_title',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_contact_title',
        selector: '[data-section="contact"] [data-cms-role="title"]',
        type: 'text',
    },
    {
        id: 'contact_description',
        collection: 'site_content',
        field: 'content_value',
        recordId: 'home_contact_description',
        selector: '[data-section="contact"] [data-cms-role="description"]',
        type: 'html',
    },
    {
        id: 'footer_address',
        collection: 'site_settings',
        field: 'address',
        recordId: 'site_address',
        selector: '[data-cms-role="address"]',
        type: 'text',
    },
    {
        id: 'footer_phone',
        collection: 'site_settings',
        field: 'phone',
        recordId: 'site_phone',
        selector: '[data-cms-role="phone"]',
        type: 'text',
    },
    {
        id: 'footer_email',
        collection: 'site_settings',
        field: 'email',
        recordId: 'site_email',
        selector: '[data-cms-role="email"]',
        type: 'text',
    },
    {
        id: 'footer_hours',
        collection: 'site_settings',
        field: 'opening_hours',
        recordId: 'site_hours',
        selector: '[data-cms-role="opening_hours"]',
        type: 'text',
    },
];

export function getCMSRegistryItem(cmsKey: string): CMSRegistryItem | undefined {
    return cmsRegistry.find((item) => item.id === cmsKey);
}

export function getCMSRegistryBySelector(selector: string): CMSRegistryItem | undefined {
    return cmsRegistry.find((item) => item.selector === selector);
}

export function getCMSRegistryByType(type: CMSRegistryItem['type']): CMSRegistryItem[] {
    return cmsRegistry.filter((item) => item.type === type);
}