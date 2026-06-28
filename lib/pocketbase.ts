import PocketBase from 'pocketbase';

export const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.fullwork.pl';

export const pb = new PocketBase(PB_URL);

pb.autoCancellation(false);

export const DEFAULT_TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || 'valiente-estetica';

export const TENANT_ID = DEFAULT_TENANT_ID;

export function getTenantFilter(tenantId: string = TENANT_ID): string {
    return `website_id = "${tenantId}"`;
}

export function getCurrentTenant(): string {
    return TENANT_ID;
}

export function normalizeImageUrl(
    filename: string | undefined,
    collectionId: string = '',
    recordId: string = ''
): string {
    if (!filename) return '';
    if (filename.startsWith('http')) return filename;
    if (collectionId && recordId) {
        return `${PB_URL}/api/files/${collectionId}/${recordId}/${filename}`;
    }
    return filename;
}

export async function pbFetch<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${PB_URL}/api/${endpoint}`;
    
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`PocketBase fetch error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function getRecords<T = any>(
    collection: string,
    params: {
        filter?: string;
        expand?: string;
        sort?: string;
        page?: number;
        perPage?: number;
    } = {}
): Promise<{ items: T[]; totalItems: number; totalPages: number }> {
    const queryParams = new URLSearchParams();
    
    if (params.filter) {
        queryParams.append('filter', params.filter);
    }
    if (params.expand) {
        queryParams.append('expand', params.expand);
    }
    if (params.sort) {
        queryParams.append('sort', params.sort);
    }
    if (params.page) {
        queryParams.append('page', String(params.page));
    }
    if (params.perPage) {
        queryParams.append('perPage', String(params.perPage));
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return pbFetch(`${collection}/records${query}`);
}

export async function getRecord<T = any>(
    collection: string,
    id: string,
    params: { expand?: string } = {}
): Promise<T> {
    const queryParams = new URLSearchParams();
    if (params.expand) {
        queryParams.append('expand', params.expand);
    }
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return pbFetch(`${collection}/records/${id}${query}`);
}