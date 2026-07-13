import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchPageData, getBlogPosts } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/blog', 'es');

  return {
    title: 'Blog | Beauty By Nat',
    description: 'Porady o przedłużaniu rzęs, laminacji brwi, fryzurach okolicznościowych i makijażu. Praktyczne tipy od Natalii Dominiak.',
  };
}

// Helper: convierte un título en un slug URL-safe
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const defaultArticles = [
  {
    title: 'Jak dbać o przedłużane rzęsy — 7 zasad',
    excerpt: 'Przedłużane rzęsy mogą wyglądać pięknie nawet 4–5 tygodni. Wystarczy trzymać się kilku prostych zasad pielęgnacji.',
    image: '/demo servicios/extensiones-pestanas-1.jpg',
    date: '20 maja 2026',
    category: 'Pielęgnacja rzęs',
  },
  {
    title: 'Klasyka, Volume czy Kim Kardashian — którą metodę wybrać?',
    excerpt: 'Każdy typ oka lubi coś innego. Podpowiadam, jak dobrać metodę przedłużania do kształtu, stylu i okazji.',
    image: '/demo servicios/volume-light-medium-mega.jpg',
    date: '5 maja 2026',
    category: 'Rzęsy',
  },
  {
    title: 'Laminacja brwi krok po kroku — co warto wiedzieć',
    excerpt: 'Laminacja to nie tylko podkręcenie włosków. To także odżywienie i ułożenie ich w jednym, spójnym kierunku.',
    image: '/demo servicios/laminacja-i-geometria-brwi.jpg',
    date: '18 kwietnia 2026',
    category: 'Brwi',
  },
  {
    title: 'Fryzura na wesele — jak przygotować włosy',
    excerpt: 'Kilka prostych kroków przed wizytą sprawi, że fryzura będzie trwalsza i będzie wyglądać jeszcze lepiej.',
    image: '/demo servicios/fryzury-okolicznosciowe.jpg',
    date: '2 kwietnia 2026',
    category: 'Fryzury',
  },
  {
    title: 'Makijaż na sesję zdjęciową — co się zmienia',
    excerpt: 'Inny makijaż na co dzień, inny na sesję. Podpowiadam, jak przygotować cerę i oczy przed obiektywem.',
    image: '/demo servicios/makijaz-okolicznosciowy.jpg',
    date: '15 marca 2026',
    category: 'Makijaż',
  },
  {
    title: 'Efekt Eyeliner — komu pasuje i jak go nosić',
    excerpt: 'Jeśli marzysz o mocnym, graficznym spojrzeniu bez codziennego rysowania kreski — Efekt Eyeliner jest dla Ciebie.',
    image: '/demo servicios/efekt-kim-kardashian-eyeliner.jpg',
    date: '1 marca 2026',
    category: 'Rzęsy',
  },
];

export default async function BlogPage() {
  const [pageData, blogPosts] = await Promise.all([
    fetchPageData('/blog', 'es'),
    getBlogPosts('es', 20),
  ]);

  const articles = (blogPosts.length > 0
    ? blogPosts.map((p: any) => ({
        title: p.title,
        excerpt: p.excerpt || p.description || '',
        image: p.image_url || '',
        date: p.created_at ? new Date(p.created_at).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
        category: p.category || 'Ogólne',
        slug: p.slug || slugify(p.title),
      }))
    : defaultArticles
  ).map((a: any) => ({ ...a, slug: a.slug || slugify(a.title) }));

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Porady i inspiracje';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Wszystko o przedłużaniu rzęs, laminacji brwi, fryzurach okolicznościowych i makijażu. Praktyczne tipy i historie z gabinetu.';

  return (
    <>
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">Blog</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 mb-4 sm:mb-6" data-cms-section="blog_title">
            {pageTitle}
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed" data-cms-section="blog_description">
            {pageDescription}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {articles.map((article: any, index) => (
              <Link
                key={index}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-stone-400">{article.date}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif text-stone-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-stone-900 group-hover:text-rose-600 transition-colors">
                    Czytaj więcej <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}