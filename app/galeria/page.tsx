import type { Metadata } from 'next';
import GaleriaClient from './GaleriaClient';
import { fetchPageData, getProjects } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/galeria', 'es');

  return {
    title: 'Galeria | Valiente Studio Urody',
    description: 'Prawdziwe efekty u prawdziwych klientek. Zobacz metamorfozy.',
  };
}

export default async function GaleriaPage() {
  const [pageData, projects] = await Promise.all([
    fetchPageData('/galeria', 'es'),
    getProjects('es'),
  ]);

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Nasze realizacje';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Prawdziwe efekty u prawdziwych klientek. Zobacz metamorfozy.';

  const galleryImages = projects.length > 0
    ? projects.map((p: any) => ({
        src: p.image_url || p.cover_image || '',
        label: p.title || p.name || '',
      }))
    : undefined;

  return (
    <GaleriaClient 
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      galleryImages={galleryImages}
    />
  );
}