import type { Metadata } from 'next';
import GiftCard from '@/components/sections/GiftCard';
import { fetchPageData, getServices } from '@/lib/cms';
import ServicesGrid, { type FilterableService } from './ServicesGrid';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchPageData('/uslugi', 'es');

  return {
    title: 'Usługi | Beauty By Nat · Rzęsy, brwi, fryzury i makijaż',
    description: 'Pełna oferta Beauty By Nat: przedłużanie rzęs, laminacja i geometria brwi, fryzury okolicznościowe, makijaż na wydarzenia oraz warsztaty.',
  };
}

const demoImages = [
  '/demo servicios/extensiones-pestanas-1.jpg',
  '/demo servicios/volume-light-medium-mega.jpg',
  '/demo servicios/efekt-kim-kardashian-eyeliner.jpg',
  '/demo servicios/laminacja-i-geometria-brwi.jpg',
  '/demo servicios/fryzury-okolicznosciowe.jpg',
  '/demo servicios/makijaz-okolicznosciowy.jpg',
];

// Asigna imagen rotando entre las 6 del demo, evitando repetir la misma
// en cards consecutivas (look-and-feel alternado en toda la grilla).
function pickImage(i: number, category?: string): string {
  if (category) {
    const map: Record<string, number> = {
      'rzęsy': 0,
      'brwi': 3,
      'fryzury': 4,
      'makijaż': 5,
      'szkolenia': 4,
    };
    const base = map[category.toLowerCase()] ?? 0;
    return demoImages[(base + i) % demoImages.length];
  }
  return demoImages[i % demoImages.length];
}

// Categorías para los filtros de la UI
export const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'rzęsy', label: 'Rzęsy' },
  { id: 'brwi', label: 'Brwi' },
  { id: 'fryzury', label: 'Fryzury' },
  { id: 'makijaż', label: 'Makijaż' },
  { id: 'szkolenia', label: 'Szkolenia' },
] as const;

const defaultServices = [
  // Rzęsy
  {
    category: 'rzęsy',
    name: 'Konsultacja (pierwsza wizyta rzęsy)',
    description: 'Bezpłatna konsultacja, na której dobieram długość, objętość i kierunek rzęs do Twojego kształtu oka.',
    duration: '15 min',
    imageUrl: pickImage(0, 'rzęsy'),
    price: 'Gratis',
    popular: false,
  },
  {
    category: 'rzęsy',
    name: 'Przedłużanie rzęs 1:1 (klasyka)',
    description: 'Jedna syntetyczna rzęsa na każdą naturalną. Elegancki, naturalny efekt na co dzień.',
    duration: '2 h 30',
    imageUrl: pickImage(1, 'rzęsy'),
    price: 'od 180 zł',
    popular: true,
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie 1:1 (do 3 tygodni)',
    description: 'Odświeżenie aplikacji 1:1 w cyklu do trzech tygodni od ostatniej wizyty.',
    duration: '1 h 30',
    imageUrl: pickImage(2, 'rzęsy'),
    price: 'od 150 zł',
  },
  {
    category: 'rzęsy',
    name: 'Light Volume',
    description: 'Delikatna objętość dla efektu "mam cudowne rzęsy, ale nie wiem, czemu".',
    duration: '3 h',
    imageUrl: pickImage(3, 'rzęsy'),
    price: 'od 210 zł',
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Light Volume',
    description: 'Odświeżenie Light Volume do trzech tygodni od ostatniej aplikacji.',
    duration: '2 h',
    imageUrl: pickImage(4, 'rzęsy'),
    price: 'od 180 zł',
  },
  {
    category: 'rzęsy',
    name: 'Medium Volume',
    description: 'Wyraźna objętość z zachowaniem naturalnego wyglądu — bestseller na co dzień.',
    duration: '3 h',
    imageUrl: pickImage(5, 'rzęsy'),
    price: 'od 230 zł',
    popular: true,
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Medium Volume',
    description: 'Odświeżenie Medium Volume w cyklu do trzech tygodni.',
    duration: '2 h',
    imageUrl: pickImage(0, 'rzęsy'),
    price: 'od 200 zł',
  },
  {
    category: 'rzęsy',
    name: 'Mega Volume',
    description: 'Mocna, dramatyczna objętość dla miłośniczek spektakularnego efektu WOW.',
    duration: '3 h',
    imageUrl: pickImage(1, 'rzęsy'),
    price: 'od 240 zł',
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Mega Volume',
    description: 'Odświeżenie Mega Volume do trzech tygodni od ostatniej wizyty.',
    duration: '2 h',
    imageUrl: pickImage(2, 'rzęsy'),
    price: 'od 220 zł',
  },
  {
    category: 'rzęsy',
    name: 'Wet Effect',
    description: 'Efekt mokrych, błyszczących rzęs inspirowany lookiem z pokazów mody.',
    duration: '3 h',
    imageUrl: pickImage(3, 'rzęsy'),
    price: 'od 230 zł',
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Wet Effect',
    description: 'Odświeżenie Wet Effect w cyklu do trzech tygodni.',
    duration: '2 h',
    imageUrl: pickImage(4, 'rzęsy'),
    price: 'od 210 zł',
  },
  {
    category: 'rzęsy',
    name: 'Kim Kardashian Light',
    description: 'Mocno podkręcone, pełne objętości rzęsy w stylu Kim K. Delikatniejsza wersja.',
    duration: '3 h',
    imageUrl: pickImage(5, 'rzęsy'),
    price: 'od 220 zł',
    popular: true,
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Kim Kardashian Light',
    description: 'Odświeżenie aplikacji Kim K Light w cyklu do trzech tygodni.',
    duration: '2 h',
    imageUrl: pickImage(0, 'rzęsy'),
    price: 'od 190 zł',
  },
  {
    category: 'rzęsy',
    name: 'Kim Kardashian Medium',
    description: 'Intensywna wersja kultowego looku Kim K. Wyraziste, miękkie i pełne objętości.',
    duration: '3 h',
    imageUrl: pickImage(1, 'rzęsy'),
    price: 'od 240 zł',
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Kim Kardashian Medium',
    description: 'Odświeżenie Kim K Medium w cyklu do trzech tygodni.',
    duration: '2 h',
    imageUrl: pickImage(2, 'rzęsy'),
    price: 'od 210 zł',
  },
  {
    category: 'rzęsy',
    name: 'Efekt Eyeliner',
    description: 'Liner wyrysowany rzęsami wzdłuż linii rzęs — graficzne, mocne spojrzenie bez makijażu.',
    duration: '3 h',
    imageUrl: pickImage(3, 'rzęsy'),
    price: 'od 240 zł',
  },
  {
    category: 'rzęsy',
    name: 'Uzupełnienie Efekt Eyeliner',
    description: 'Odświeżenie efektu Eyeliner w cyklu do trzech tygodni.',
    duration: '2 h',
    imageUrl: pickImage(4, 'rzęsy'),
    price: 'od 210 zł',
  },
  {
    category: 'rzęsy',
    name: 'Usunięcie starej aplikacji',
    description: 'Bezpieczne usunięcie przedłużanych rzęs z odżywieniem naturalnych.',
    duration: '30 min',
    imageUrl: pickImage(5, 'rzęsy'),
    price: 'od 50 zł',
  },
  {
    category: 'rzęsy',
    name: 'Henna rzęs',
    description: 'Delikatne podkreślenie koloru rzęs — świetne na co dzień i na wakacje.',
    duration: '20 min',
    imageUrl: pickImage(0, 'rzęsy'),
    price: 'od 30 zł',
  },
  // Brwi
  {
    category: 'brwi',
    name: 'Henna pudrowa + geometria brwi',
    description: 'Trwała koloryzacja henną pudrową i precyzyjne wymodelowanie kształtu brwi.',
    duration: '60 min',
    imageUrl: pickImage(0, 'brwi'),
    price: 'od 110 zł',
    popular: true,
  },
  {
    category: 'brwi',
    name: 'Laminacja brwi',
    description: 'Uniesienie, ułożenie i odżywienie włosków — brwi wyglądają na grubsze i bardziej wyraziste.',
    duration: '60 min',
    imageUrl: pickImage(1, 'brwi'),
    price: 'od 120 zł',
  },
  {
    category: 'brwi',
    name: 'Laminacja + koloryzacja + geometria',
    description: 'Pełna metamorfoza brwi: laminacja, tinte i dopasowanie kształtu do rysów twarzy.',
    duration: '75 min',
    imageUrl: pickImage(2, 'brwi'),
    price: 'od 150 zł',
  },
  {
    category: 'brwi',
    name: 'Henna klasyczna + geometria',
    description: 'Klasyczna koloryzacja henną z wymodelowaniem kształtu brwi.',
    duration: '45 min',
    imageUrl: pickImage(3, 'brwi'),
    price: 'od 50 zł',
  },
  {
    category: 'brwi',
    name: 'Geometria / regulacja pęsetą',
    description: 'Precyzyjne wymodelowanie kształtu brwi zgodnie z morfologią twarzy.',
    duration: '20 min',
    imageUrl: pickImage(4, 'brwi'),
    price: 'od 30 zł',
  },
  // Fryzury
  {
    category: 'fryzury',
    name: 'Fryzura okolicznościowa — włosy do ramion',
    description: 'Upięcie lub fale dla włosów krótkich i średnich. Idealne na wesela, komunie i przyjęcia.',
    duration: 'od 60 min',
    imageUrl: pickImage(0, 'fryzury'),
    price: 'od 250 zł',
    popular: true,
  },
  {
    category: 'fryzury',
    name: 'Fryzura okolicznościowa — włosy długie / z doczepami',
    description: 'Upięcie, fale lub półupięcie dla długich włosów i włosów z doczepami clip-in.',
    duration: 'od 90 min',
    imageUrl: pickImage(1, 'fryzury'),
    price: 'od 300 zł',
  },
  // Makijaż
  {
    category: 'makijaż',
    name: 'Makijaż okolicznościowy',
    description: 'Spersonalizowany makijaż na wesele, przyjęcie, sesję zdjęciową lub każde wielkie wyjście.',
    duration: '60 min',
    imageUrl: pickImage(0, 'makijaż'),
    price: 'od 250 zł',
    popular: true,
  },
  // Szkolenia
  {
    category: 'szkolenia',
    name: 'Warsztaty automakijażu',
    description: 'Indywidualne warsztaty doboru podkładu, korekty, konturowania i makijażu dziennego.',
    duration: '3 h',
    imageUrl: pickImage(0, 'szkolenia'),
    price: 'od 400 zł',
  },
  {
    category: 'szkolenia',
    name: 'Indywidualna lekcja makijażu',
    description: 'Lekcja 1:1 dopasowana do Twojego stylu, kształtu twarzy i okazji.',
    duration: '2 h',
    imageUrl: pickImage(1, 'szkolenia'),
    price: 'od 600 zł',
  },
  {
    category: 'szkolenia',
    name: 'Warsztaty doczepiania clip-in',
    description: 'Naucz się sama doczepiać clip-iny — objętość i długość w 5 minut.',
    duration: '1 h 30',
    imageUrl: pickImage(2, 'szkolenia'),
    price: 'od 400 zł',
  },
  {
    category: 'szkolenia',
    name: 'Warsztat kucyk / ponytail',
    description: 'Idealny kucyk na wielkie wyjście — technika, doczep, objętość i trwałość.',
    duration: '1 h 30',
    imageUrl: pickImage(3, 'szkolenia'),
    price: 'od 300 zł',
  },
];

export default async function ServiciosPage() {
  const [pageData, cmsServices] = await Promise.all([
    fetchPageData('/uslugi', 'es'),
    getServices(),
  ]);

  const services: FilterableService[] = cmsServices.length > 0
    ? cmsServices.map((s: any, i: number) => ({
        category: (s.category || 'rzęsy').toLowerCase(),
        name: s.name,
        description: s.description || '',
        duration: s.duration || '',
        imageUrl: s.image_url || pickImage(i, s.category),
        price: s.price || 'Na zapytanie',
        popular: s.featured || false,
      }))
    : defaultServices;

  const pageTitle = pageData.content.find(c => c.section_key === 'page_title')?.content_value || 'Usługi i cennik';
  const pageDescription = pageData.content.find(c => c.section_key === 'page_description')?.content_value || 'Pełna oferta Beauty By Nat: rzęsy, brwi, fryzury okolicznościowe, makijaż i szkolenia.';

  return (
    <>
      {/* Header + Filters + Grid — todo en una sola sección para que el filtro quede pegado al título */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 lg:pb-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <span className="text-rose-500 font-medium text-sm">Usługi</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-3" data-cms-section="servicios_title">
              {pageTitle}
            </h1>
            <p className="text-slate-600 max-w-xl text-sm sm:text-base" data-cms-section="servicios_description">
              {pageDescription}
            </p>
          </div>

          {/* Services Grid with filter */}
          <ServicesGrid services={services} />
        </div>
      </section>

      <GiftCard pageData={pageData} />
    </>
  );
}