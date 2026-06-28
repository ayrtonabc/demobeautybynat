import type { Metadata } from 'next';
import Philosophy from '@/components/sections/Philosophy';
import Image from 'next/image';
import { Shield, Heart, Sparkles, Award } from 'lucide-react';
import { fetchPageData } from '@/lib/cms';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/nosotros', 'es');

  return {
    title: 'O nas | Valiente Studio Urody',
    description: 'Poznaj misję, wizję i wartości Valiente Studio Urody w Warszawie.',
  };
}

const defaultValues = [
  {
    icon: Shield,
    title: 'Profesjonalizm i doskonałość techniczna',
    description: 'Traktujemy pielęgnację skóry i ciała bardzo poważnie. Pracujemy według rygorystycznych protokołów, z kosmetykami najwyższej jakości i specjalistkami w każdym obszarze, by zapewnić bezpieczne i widoczne efekty.',
  },
  {
    icon: Heart,
    title: 'Indywidualne podejście',
    description: 'Wierzymy w wyjątkowość każdej osoby. Nie standaryzujemy piękna — traktujemy każdą skórę, sylwetkę i spojrzenie jako osobny wszechświat, oferując indywidualne zabiegi i diagnozy dopasowane do prawdziwych potrzeb.',
  },
  {
    icon: Sparkles,
    title: 'Spokój i troska',
    description: 'Nasze miejsce zaprojektowaliśmy jako oazę w codziennej rutynie. Zapewniamy bliską, empatyczną i pełną ciepła obsługę, by każda wizyta była chwilą absolutnego odprężenia.',
  },
  {
    icon: Award,
    title: 'Innowacja i nowoczesność',
    description: 'Stale się rozwijamy, włączając najnowsze światowe trendy w estetyce, technologię regeneracyjną i terapie holistyczne, które wspierają kompleksową pielęgnację.',
  },
];

export default async function NosotrosPage() {
  const pageData = await fetchPageData('/nosotros', 'es');

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Valiente Studio Urody';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Kompleksowa przestrzeń estetyki, zdrowia skóry i dobrostanu, w której każdy znajdzie spersonalizowaną diagnozę i nowoczesne zabiegi.';
  const mission = pageData.content.find(c => c.section_key === 'mission')?.content_value || 'Tworzymy integralną przestrzeń estetyki, zdrowia skóry i dobrostanu, w której każda osoba otrzymuje spersonalizowaną diagnozę i nowoczesne zabiegi. Podkreślamy naturalne piękno i oferujemy transformujące doświadczenia relaksu, łącząc wysokie kwalifikacje zespołu, zaawansowaną technologię i dbałość o każdy detal — by pomóc naszym klientkom odzyskać własną istotę i pewność siebie.';
  const vision = pageData.content.find(c => c.section_key === 'vision')?.content_value || 'Stać się referencyjnym studiem urody w regionie, rozpoznawalnym dzięki doskonałości technicznej zespołu, ciągłej innowacji w protokołach dermokosmetycznych i obsłudze premium na specjalne okazje. Pragniemy być wybranym schronieniem dla osób, które szukają nie tylko zmiany estetycznej, lecz przestrzeni absolutnego spokoju i odnowy ciała oraz umysłu.';

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">O nas</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 mb-4 sm:mb-6" data-cms-section="nosotros_title">
            {pageTitle}
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed" data-cms-section="nosotros_description">
            {pageDescription}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
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

      <section className="py-12 sm:py-16 md:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
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