import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const defaultArticles: Record<string, { title: string; excerpt: string; image: string; date: string; category: string; content: string }> = {
  'jak-dbac-o-przedluzane-rzesy-7-zasad': {
    title: 'Jak dbać o przedłużane rzęsy — 7 zasad',
    excerpt: 'Przedłużane rzęsy mogą wyglądać pięknie nawet 4–5 tygodni. Wystarczy trzymać się kilku prostych zasad pielęgnacji.',
    image: '/demo servicios/extensiones-pestanas-1.jpg',
    date: '20 maja 2026',
    category: 'Pielęgnacja rzęs',
    content: `Przedłużane rzęsy to inwestycja — i wygoda, i piękno przez kilka tygodni. Ale żeby naprawdę cieszyć się nimi jak najdłużej, warto zadbać o kilka prostych nawyków.

**1. Nie mocz rzęs przez pierwsze 24 godziny.** Klej potrzebuje czasu, żeby w pełni związać. Po aplikacji unikaj sauny, basenu, mocnego deszczu, a nawet długiego prysznica.

**2. Myj rzęsy delikatnie.** Używaj beztłuszczowego cleansera lub specjalnej pianki do rzęs. Unikaj produktów na bazie oleju — rozpuszczają klej.

**3. Nie pocieraj oczu.** To nawyk, który skraca żywotność aplikacji. Zamiast palców, użyj czystej szczoteczki do rzęs.

**4. Czesz rzęsy codziennie.** Specjalna szczoteczka (dostaniesz ją po wizycie) utrzymuje rzęsy w jednym kierunku i zapobiega plątaniu.

**5. Śpij na plecach lub na boku z poduszką satynową.** Tarcie o poszewkę niszczy rzęsy. Satyna jest delikatniejsza niż bawełna.

**6. Unikaj wodoodpornych maskar.** Jeśli musisz coś nałożyć, użyj delikatnej, zmywalnej maskary tylko na końcówki.

**7. Przyjdź na uzupełnienie co 2–3 tygodnie.** Regularne uzupełnienia utrzymują efekt i są tańsze niż nowa pełna aplikacja.

Stosując te 7 zasad, Twoje rzęsy będą wyglądać świeżo przez 4–5 tygodni. A jeśli masz pytania — napisz do mnie, chętnie pomogę.`,
  },
  'klasyka-volume-czy-kim-kardashian-ktora-metode-wybrac': {
    title: 'Klasyka, Volume czy Kim Kardashian — którą metodę wybrać?',
    excerpt: 'Każdy typ oka lubi coś innego. Podpowiadam, jak dobrać metodę przedłużania do kształtu, stylu i okazji.',
    image: '/demo servicios/volume-light-medium-mega.jpg',
    date: '5 maja 2026',
    category: 'Rzęsy',
    content: `Wybór metody przedłużania rzęs to nie jest kwestia "co jest modne" — to kwestia Twojego stylu życia, kształtu oka i efektu, który chcesz osiągnąć. Oto krótki przewodnik po najpopularniejszych metodach w moim studio.

**Klasyka (1:1)** — jedna syntetyczna rzęsa na każdą naturalną. Najbardziej naturalny efekt. Idealna na co dzień, do biura, na uczelnię. Czas aplikacji: 2–2,5h.

**Light Volume** — 2–3 cienkie rzęsy na jedną naturalną. Subtelna objętość, prawie niezauważalna. Dla tych, które chcą wyglądać "mam cudne rzęsy" bez dramatu.

**Medium Volume** — 3–4 rzęsy. Wyraźna objętość, ale wciąż naturalnie. Bestseller w moim studio. Wygląda świetnie na zdjęciach i na żywo.

**Mega Volume** — 5–10 ultracienkich rzęs. Maksymalna objętość, dramatyczny efekt. Dla miłośniczek mocnego makijażu oczu.

**Kim Kardashian** — metoda łącząca długość, podkręwienie i objętość. Kultowy look "Kim K": mocno podkręcone, pełne, miękkie rzęsy. W wersji Light delikatniejsza, w wersji Medium pełniejsza.

**Efekt Eyeliner** — najgrubsze rzęsy idą wzdłuż linii rzęs, jakby były narysowane eyelinerem. Graficzne, mocne spojrzenie bez makijażu.

Przy pierwszej wizycie zawsze konsultuję — patrzę na kształt oka, gęstość naturalnych rzęs, tryb życia. Dobieramy razem metodę, która będzie dla Ciebie idealna.`,
  },
  'laminacja-brwi-krok-po-kroku-co-warto-wiedziec': {
    title: 'Laminacja brwi krok po kroku — co warto wiedzieć',
    excerpt: 'Laminacja to nie tylko podkręcenie włosków. To także odżywienie i ułożenie ich w jednym, spójnym kierunku.',
    image: '/demo servicios/laminacja-i-geometria-brwi.jpg',
    date: '18 kwietnia 2026',
    category: 'Brwi',
    content: `Laminacja brwi to zabieg, który w ostatnich latach zyskał ogromną popularność — i słusznie. To najprostszy sposób, żeby uzyskać efekt "mam idealne brwi bez wysiłku" przez 6–8 tygodni.

**Co robi laminacja?**
Zmienia kierunek wzrostu włosków, odżywia je i utrwala w nowej pozycji. Brwi stają się grubsze wizualnie (bo wszystkie włoski idą w jedną stronę), bardziej miękkie i "wychuchane".

**Kiedy warto?**
- Gdy Twoje brwi rosną w różnych kierunkach i trudno je ułożyć
- Gdy chcesz wyglądać naturalnie, ale bez codziennego żelu
- Po wakacjach, gdy brwi są przesuszone od słońca
- Przed ważnym wydarzeniem — zdjęcia, ślub, sesja

**Jak przebiega zabieg?**
1. Oczyszczenie brwi i demakijaż
2. Aplikacja preparatu, który delikatnie rozluźnia strukturę włosa (ok. 8–12 min)
3. Ułożenie włosków w pożądanym kierunku
4. Aplikacja preparatu utrwalającego (ok. 8–10 min)
5. Opcjonalnie: koloryzacja henną pudrową
6. Odżywienie serum z keratyną

**Czego nie robić po laminacji?**
- Nie mocz brwi przez 24h
- Nie używaj produktów na bazie oleju w okolicy brwi
- Nie stosuj mocnych pilingów na twarz przez 48h

Efekt utrzymuje się 6–8 tygodni — w zależności od cyklu wzrostu Twoich włosków.`,
  },
  'fryzura-na-wesele-jak-przygotowac-wlosy': {
    title: 'Fryzura na wesele — jak przygotować włosy',
    excerpt: 'Kilka prostych kroków przed wizytą sprawi, że fryzura będzie trwalsza i będzie wyglądać jeszcze lepiej.',
    image: '/demo servicios/fryzury-okolicznosciowe.jpg',
    date: '2 kwietnia 2026',
    category: 'Fryzury',
    content: `Fryzura ślubna albo na wielkie wyjście to nie tylko kwestia tego, co stylistka zrobi na miejscu. Odpowiednie przygotowanie w domu sprawi, że fryzura będzie trwalsza, lepiej się układała i dłużej wyglądała świeżo.

**Tydzień przed wizytą**
- Zrób maskę nawilżającą lub regenerującą. Suche końce nie układają się dobrze.
- Jeśli masz cienkie włosy — zafunduj im objętościowy szampon. Drobne włosy potrzebują tekstury.
- Nie farbuj włosów na 2 tygodnie przed. Świeża koloryzacja jest trudna do utrwalenia w upięciu.

**Dzień przed**
- Umyj włosy łagodnym szamponem (bez odżywki — odżywka wygładza włosy i utrudnia układanie).
- Wysusz włosy, ale nie prostuj. Naturalna tekstura pomaga w trzymaniu się fryzury.
- Nie używaj produktów stylizujących — żadnych olejów, serum, lakierów.

**Dzień wizyty**
- Włosy powinny być CAŁKOWICIE suche.
- Nie spinaj ich w kucyk ani kitkę — to zostawia ślady, które potem ciężko zakryć.
- Zjedz śniadanie! Zabieg trwa od 1h do 2,5h, w zależności od fryzury.
- Zdjęcia inspiracji są super — ale pokaż mi je przed wizytą, nie w trakcie. Muszę wiedzieć, do czego dążyć, zanim zacznę.

**Co zabrać na wizytę?**
- Spinki i wsuwki, jeśli masz swoje ulubione
- Welon lub inne dodatki, które chcesz wpiąć
- Luźne ubranie, które nie zdejmiesz przez głowę po fryzurze

Przy odpowiednim przygotowaniu fryzura przetrwa całą noc — od pierwszego tańca do ostatniego toastu.`,
  },
  'makijaz-na-sesje-zdjeciowa-co-sie-zmienia': {
    title: 'Makijaż na sesję zdjęciową — co się zmienia',
    excerpt: 'Inny makijaż na co dzień, inny na sesję. Podpowiadam, jak przygotować cerę i oczy przed obiektywem.',
    image: '/demo servicios/makijaz-okolicznosciowy.jpg',
    date: '15 marca 2026',
    category: 'Makijaż',
    content: `Aparat "kradnie" około 30% makijażu. To, co w lustrze wygląda dramatycznie, na zdjęciu wychodzi delikatnie. Dlatego makijaż do sesji wymaga innego podejścia.

**Baza jest wszystkim**
- Dobrze nawilżona skóra 24h przed sesją
- Baza wygładzająca + baza matująca w strefie T
- Primer do powiek — bez niego cienie zbierają się w załamaniach

**Konturowanie mocniejsze niż na co dzień**
- Kości policzkowe — cień o 1–2 tony ciemniejszy
- Linia szczęki — delikatnie, ale wyraźnie
- Nos — subtelna korekta, jeśli chcesz

**Oczy**
- Cienie: matowe bazowe + błyszczące w centrum powieki
- Eyeliner: grubszy niż zwykle, z wyraźnym "ogonkiem" w zewnętrznym kąciku
- Sztuczne rzęsy albo przedłużane — na zdjęciach robią OGROMNĄ różnicę
- Dolna linia wody: delikatny cień lub liner

**Usta**
- Konturówka — koniecznie, bo zjedzona szminka na zdjęciach wygląda źle
- Kolor: o ton cieplejszy niż zwykle, bo aparat wybiera ciepłe tony

**Co zabrać na sesję**
- Ulubione zdjęcie inspiracji
- Jeśli masz — swoje kosmetyki, których nie tolerujesz (np. alergik na konkretny składnik)
- Wygodne ubranie na zmianę po sesji

Sesja zdjęciowa to idealny moment, żeby poeksperymentować z makijażem. Na co dzień może nie nosisz tak mocnych oczu — ale na zdjęciach będą wyglądać pięknie.`,
  },
  'efekt-eyeliner-komu-pasuje-i-jak-go-nosic': {
    title: 'Efekt Eyeliner — komu pasuje i jak go nosić',
    excerpt: 'Jeśli marzysz o mocnym, graficznym spojrzeniu bez codziennego rysowania kreski — Efekt Eyeliner jest dla Ciebie.',
    image: '/demo servicios/efekt-kim-kardashian-eyeliner.jpg',
    date: '1 marca 2026',
    category: 'Rzęsy',
    content: `Efekt Eyeliner to jedna z najbardziej wyrazistych metod przedłużania rzęs. Daje wrażenie namalowanej kreski bez konieczności codziennego rysowania eyelinera. Wygląda graficznie, mocno i bardzo nowocześnie.

**Komu pasuje?**
- Osoby o głęboko osadzonych oczach — Eyeliner otwiera oko
- Miłośniczki mocnego, wyrazistego makijażu
- Panie, które nie mają czasu na makijaż rano, ale chcą wyglądać "zrobione"
- Klientki, które noszą dużo czerni i graficznych stylizacji

**Komu NIE pasuje?**
- Osoby o bardzo wypukłych oczach — Efekt Eyeliner może je jeszcze bardziej "wyłupić"
- Klientki preferujące miękki, dziewczęcy look
- Osoby z alergiami na cięższe metody przedłużania (Eyeliner to dość gęsta aplikacja)

**Jak nosić Efekt Eyeliner na co dzień?**
- Z minimalnym makijażem reszty twarzy — sama, krem BB, pomadka
- Z dużymi okularami przeciwsłonecznymi — graficzny look
- Z prostą, białą koszulą i jeansami — kontrast miękki vs mocny

**Kiedy NIE nosić?**
- Na plażę — Efekt Eyeliner wygląda sztucznie w mocno naturalnej stylizacji
- Na rodzinne obiady, gdzie oczekiwany jest delikatny look
- Jeśli masz cienie pod oczami, które chcesz zamaskować — Eyeliner przyciąga uwagę do oczu

**Utrzymanie**
Trwa 3–4 tygodnie z uzupełnieniem co 2,5–3 tygodnie. Wymaga nieco więcej uwagi przy demakijażu — olejowe płyny mogą rozpuszczać klej.

Jeśli kochasz mocne, graficzne spojrzenie — Efekt Eyeliner to Twoja metoda.`,
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Genera las rutas estáticas para los artículos del fallback
export function generateStaticParams() {
  return Object.keys(defaultArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = defaultArticles[params.slug];
  if (!article) return { title: 'Nie znaleziono artykułu | Beauty By Nat' };

  return {
    title: `${article.title} | Beauty By Nat Blog`,
    description: article.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = defaultArticles[params.slug];

  if (!article) {
    notFound();
  }

  // Convierte markdown simple (**bold**) en HTML
  const html = article.content
    .split('\n\n')
    .map((p) => {
      const trimmed = p.trim();
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return `<h2 class="text-xl sm:text-2xl font-serif text-stone-900 mt-10 mb-4">${trimmed.replace(/\*\*/g, '')}</h2>`;
      }
      return `<p class="text-base sm:text-lg text-stone-700 leading-relaxed mb-5">${trimmed.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-stone-900">$1</strong>')}</p>`;
    })
    .join('');

  return (
    <article className="bg-white">
      {/* Hero image */}
      <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] bg-stone-200">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 md:p-12 lg:p-14">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-5 text-sm">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-400">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8">
            {article.title}
          </h1>

          {/* Body */}
          <div
            className="prose prose-stone max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-stone-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do wszystkich artykułów
            </Link>
          </div>
        </div>
      </div>

      <div className="h-16 sm:h-24" />
    </article>
  );
}
