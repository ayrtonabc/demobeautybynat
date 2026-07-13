import type { Metadata } from 'next';
import GaleriaClient from './GaleriaClient';
import { fetchPageData, getProjects } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/galeria', 'es');

  return {
    title: 'Galeria | Beauty By Nat',
    description: 'Prawdziwe efekty rzęs, brwi, fryzur i makijażu u klientek Beauty By Nat w Rokietnicy.',
  };
}

export default async function GaleriaPage() {
  const [pageData, projects] = await Promise.all([
    fetchPageData('/galeria', 'es'),
    getProjects('es'),
  ]);

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Realizacje Beauty By Nat';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Zobacz efekty przedłużania rzęs, laminacji brwi, fryzur i makijażu u moich klientek.';

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