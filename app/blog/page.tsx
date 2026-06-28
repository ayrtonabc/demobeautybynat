import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { fetchPageData, getBlogPosts } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/blog', 'es');

  return {
    title: 'Blog | Valiente Studio Urody',
    description: 'Porady dotyczące pielęgnacji, trendy w estetyce i zabiegi podkreślające naturalne piękno.',
  };
}

const defaultArticles = [
  {
    title: 'Jak dbać o skórę w każdej porze roku',
    excerpt: 'Zmiany temperatury wpływają na naszą skórę na różne sposoby. Dzielimy się sekretami, by przez cały rok wyglądała promiennie.',
    image: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '15 maja 2026',
    category: 'Pielęgnacja skóry',
  },
  {
    title: 'Wszystko, co musisz wiedzieć o laminacji rzęs',
    excerpt: 'Laminacja rzęs to jeden z najczęściej wybieranych zabiegów. Sprawdź, jak działa i jakich efektów możesz oczekiwać.',
    image: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '28 kwietnia 2026',
    category: 'Zabiegi',
  },
  {
    title: 'Mikronakłuwanie: sekret odnowionej skóry',
    excerpt: 'Ten zabieg naturalnie stymuluje produkcję kolagenu. Opowiadamy o wszystkich jego korzyściach.',
    image: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '10 kwietnia 2026',
    category: 'Zabiegi',
  },
  {
    title: 'Rutyna pielęgnacyjna dopasowana do typu skóry',
    excerpt: 'Nie każda skóra jest taka sama. Naucz się rozpoznawać swoją i zbuduj skuteczną rutynę.',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '22 marca 2026',
    category: 'Pielęgnacja skóry',
  },
  {
    title: 'Trendy w makijażu na ten sezon',
    excerpt: 'Od naturalnych looków po odważniejsze stylizacje. Trendy, które teraz królują.',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '5 marca 2026',
    category: 'Makijaż',
  },
  {
    title: 'Korzyści głębokiego oczyszczania twarzy',
    excerpt: 'Profesjonalne oczyszczanie to nie tylko kwestia estetyki, ale realna korzyść dla zdrowia skóry.',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '18 lutego 2026',
    category: 'Zabiegi',
  },
];

export default async function BlogPage() {
  const [pageData, blogPosts] = await Promise.all([
    fetchPageData('/blog', 'es'),
    getBlogPosts('es', 20),
  ]);

  const articles = blogPosts.length > 0
    ? blogPosts.map((p: any) => ({
        title: p.title,
        excerpt: p.excerpt || p.description || '',
        image: p.image_url || '',
        date: p.created_at ? new Date(p.created_at).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
        category: p.category || 'Ogólne',
      }))
    : defaultArticles;

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Porady i trendy';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Informacje o pielęgnacji, zabiegach estetycznych i wszystkim, co warto wiedzieć, by dbać o skórę.';

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
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
            {articles.map((article, index) => (
              <article
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}