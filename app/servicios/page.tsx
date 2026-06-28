import type { Metadata } from 'next';
import ServiceCard from '@/components/ui/ServiceCard';
import GiftCard from '@/components/sections/GiftCard';
import { fetchPageData, getServices } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/servicios', 'es');

  return {
    title: 'Usługi | Valiente Studio Urody',
    description: 'Pielęgnacja i zabiegi dla kobiet i mężczyzn. Zabiegi na twarz, manicure, makijaż, masaże i więcej.',
  };
}

const defaultServices = [
  {
    name: 'Oczyszczanie głębokie Premium',
    description: 'Głęboka higiena skóry, usunięcie martwych komórek i oczyszczenie porów, by przywrócić cerze naturalną świeżość i blask.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 500 zł',
    popular: true,
  },
  {
    name: 'Mikrodermabrazja diamentowa',
    description: 'Kontrolowana mikrodermabrazja mechaniczna, która wygładza skórę, redukuje drobne zmarszczki i poprawia ogólną teksturę cery.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 550 zł',
    popular: true,
  },
  {
    name: 'Mikronakłuwanie z egzosomami',
    description: 'Terapia indukująca kolagen przez mikronakłuwanie w połączeniu z zaawansowaną regeneracją komórkową (egzosomy) — redukuje blizny, rozszerzone pory i oznaki starzenia.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 700 zł',
  },
  {
    name: 'Terapia anti-aging: witalność i jędrność',
    description: 'Stymulacja napięcia mięśni twarzy, pobudzenie mikrokrążenia i aplikacja składników liftingujących dla natychmiastowego efektu odmłodzenia.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 550 zł',
  },
  {
    name: 'Leczenie przebarwień (melasma)',
    description: 'Stopniowa, kontrolowana redukcja przebarwień hormonalnych i słonecznych, wyrównanie kolorytu i zahamowanie nadprodukcji melaniny.',
    duration: 'Na zapytanie',
    imageUrl: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 500 zł',
  },
  {
    name: 'Laminacja rzęs + odżywienie',
    description: 'Uniesienie, podkręcenie i wydłużenie naturalnych rzęs od nasady, w połączeniu z głębokim odżywieniem.',
    duration: '60 min',
    imageUrl: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 350 zł',
  },
  {
    name: 'Laminacja brwi + botoks',
    description: 'Ukierunkowanie, wygładzenie i ułożenie niesfornych włosków brwi dla uzyskania efektu większej objętości i wyrazistości.',
    duration: '60 min',
    imageUrl: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 250 zł',
  },
  {
    name: 'Regulacja brwi pęsetą',
    description: 'Precyzyjne wymodelowanie kształtu brwi zgodnie z morfologią twarzy — z dokładnością co do milimetra.',
    duration: '60 min',
    imageUrl: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 250 zł',
  },
  {
    name: 'Microblading / mikropigmentacja',
    description: 'Ręczne rysowanie i cieniowanie brwi włosek po włosku za pomocą półtrwałego makijażu — dla naturalnego efektu na długie miesiące.',
    duration: '2 h 30',
    imageUrl: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 2200 zł',
  },
  {
    name: 'Nawilżanie ust',
    description: 'Rewitalizacja i subtelne wypełnienie drobnych linii ust dzięki ultra-głębokiemu nawilżeniu — idealne dla suchych i spękanych ust.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 450 zł',
  },
  {
    name: 'Makijaż profesjonalny',
    description: 'Spersonalizowany makijaż na specjalne okazje — przyjęcia, wesela, sesje zdjęciowe i każdą chwilę, w której chcesz wyglądać olśniewająco.',
    duration: '90 min',
    imageUrl: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 800 zł',
  },
  {
    name: 'Masaż relaksacyjny',
    description: 'Transformujące doświadczenie od stóp do głów z aromaterapią. Łagodzi napięcie i stres w atmosferze absolutnego spokoju.',
    duration: '90 min',
    imageUrl: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'od 600 zł',
  },
];

export default async function ServiciosPage() {
  const [pageData, cmsServices] = await Promise.all([
    fetchPageData('/servicios', 'es'),
    getServices(),
  ]);

  const services = cmsServices.length > 0
    ? cmsServices.map((s: any) => ({
        name: s.name,
        description: s.description || '',
        duration: s.duration || '',
        imageUrl: s.image_url || 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: s.price || 'Na zapytanie',
        popular: s.featured || false,
      }))
    : defaultServices;

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Usługi';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Zabiegi na twarz, ciało, manicure, makijaż i więcej.';

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="text-rose-500 font-medium text-sm">Usługi</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4" data-cms-section="servicios_title">
            {pageTitle}
          </h1>
          <p className="text-slate-600 max-w-xl text-sm sm:text-base" data-cms-section="servicios_description">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.name} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <GiftCard pageData={pageData} />
    </>
  );
}