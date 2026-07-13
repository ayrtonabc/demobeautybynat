import type { Metadata } from 'next';
import Philosophy from '@/components/sections/Philosophy';
import Image from 'next/image';
import { Shield, Heart, Sparkles, Award } from 'lucide-react';
import { fetchPageData } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/o-nas', 'es');

  return {
    title: 'O nas | Beauty By Nat · Natalia Dominiak',
    description: 'Poznaj historię, misję i wartości Beauty By Nat — kameralnego studia urody w Rokietnicy k. Poznania.',
  };
}

const defaultValues = [
  {
    icon: Shield,
    title: 'Profesjonalizm',
    description: 'Stale szkolę się u najlepszych w branży, pracuję na certyfikowanych materiałach i sterylnych narzędziach. Twoje bezpieczeństwo i komfort są dla mnie najważniejsze.',
  },
  {
    icon: Heart,
    title: 'Indywidualne podejście',
    description: 'Nie ma dwóch takich samych oczu, brwi czy fryzur. Zawsze słucham, doradzam i dobieram styl do Twojej urody oraz trybu życia — zero szablonów.',
  },
  {
    icon: Sparkles,
    title: 'Efekt WOW bez przerysowania',
    description: 'Lubię piękno, które wygląda naturalnie. Rzęsy, brwi, fryzury i makijaż mają podkreślać Twoją urodę, a nie ją przysłaniać.',
  },
  {
    icon: Award,
    title: 'Doświadczenie i pasja',
    description: 'Rzęsy, brwi, fryzury i makijaż to nie tylko mój zawód, ale i pasja. Każda aplikacja i każda fryzura to dla mnie osobna historia.',
  },
];

export default async function NosotrosPage() {
  const pageData = await fetchPageData('/o-nas', 'es');

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Beauty By Nat — Natalia Dominiak';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Cześć, jestem Nat. Tworzę kameralne studio urody w Rokietnicy, w którym rzęsy, brwi, fryzury i makijaż łączą się w jedno: efekt WOW bez przerysowania.';
  const mission = pageData.content.find(c => c.section_key === 'mission')?.content_value || 'Pomagam kobietom czuć się pięknie i pewnie niezależnie od okazji. Specjalizuję się w przedłużaniu i stylizacji rzęs, geometrii i laminacji brwi, fryzurach okolicznościowych oraz makijażu na wydarzenia. Łączę precyzję, doświadczenie i ciepłą atmosferę kameralnego studia, by każda wizyta była chwilą tylko dla Ciebie.';
  const vision = pageData.content.find(c => c.section_key === 'vision')?.content_value || 'Chcę, by Beauty By Nat było pierwszym miejscem, o którym myślisz, planując wielkie wyjście — wesele, komunię, osiemnastkę, sesję zdjęciową. Miejscem, w którym naturalnie piękno spotyka się z profesjonalizmem, a każda kobieta wychodzi z uśmiechem i efektem, który ją zachwyca.';

  return (
    <>
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">O nas</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 mb-4 sm:mb-6" data-cms-section="nosotros_title">
            {pageTitle}
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed" data-cms-section="nosotros_description">
            {pageDescription}
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
            <div className="bg-stone-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10" data-cms-section="nosotros_mision">
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4">Misja</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {mission}
              </p>
            </div>
            <div className="bg-stone-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10" data-cms-section="nosotros_vision">
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4">Wizja</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8 sm:mb-12 text-center">Nasze wartości</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {defaultValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-stone-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Philosophy pageData={pageData} />
    </>
  );
}