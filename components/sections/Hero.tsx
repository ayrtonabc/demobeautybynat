'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface PageDataShape {
  content: Array<{ section_key: string; content_value: string }>;
  settings?: {
    phone?: string;
    email?: string;
    address?: string;
    whatsapp?: string;
    instagram?: string;
  } | null;
  available_languages: string[];
}

interface HeroProps {
  pageData?: PageDataShape;
}

// Imagen sobria: detalle de producto/spa, sin modelo. Pexels photographer BrianWiedkinsopp.
const heroImage =
  'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function Hero({ pageData }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getContent = (key: string, fallback: string) => {
    if (!pageData?.content) return fallback;
    const item = pageData.content.find((c) => c.section_key === key);
    return item?.content_value || fallback;
  };

  const kicker = getContent('hero_kicker', 'Studio urody · Warszawa');
  const titleLine1 = getContent('hero_title_line1', 'Cisza,');
  const titleLine2 = getContent('hero_title_line2', 'światło');
  const titleLine3 = getContent('hero_title_line3', 'i dotyk.');
  const description = getContent(
    'hero_description',
    'Valiente to kameralne studio urody w sercu Mokotowa. Zabiegi zaprojektowane wokół Ciebie — bez pośpiechu, bez szablonów.'
  );
  const primaryCta = getContent('hero_button_primary', 'Zarezerwuj wizytę');
  const meta = getContent('hero_meta', 'ul. Mokotowska 12  ·  Pon–Sob');

  return (
    <section
      ref={ref}
      className="relative bg-stone-50 overflow-hidden"
      data-section="hero"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 md:px-12 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-10 xl:gap-12">
          {/* ───── COLUMNA IZQUIERDA: TEXTO ───── */}
          <div className="lg:flex-1 lg:max-w-[520px]">
            {/* Kicker — etiqueta pequeña, sin badge pulsante */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.28em] text-stone-500 mb-7 sm:mb-9"
              data-cms-role="kicker"
            >
              {kicker}
            </motion.p>

            {/* Título — 3 líneas, tipografía editorial controlada, NO gigante */}
            <h1 className="font-serif text-stone-900 leading-[1.05] tracking-[-0.02em] text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] xl:text-[76px]">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
                data-cms-role="title_line1"
              >
                {titleLine1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-stone-500"
                data-cms-role="title_line2"
              >
                {titleLine2}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block"
                data-cms-role="title_line3"
              >
                {titleLine3}
              </motion.span>
            </h1>

            {/* Descripción — ancho generoso, breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 sm:mt-9 text-[15px] sm:text-base text-stone-600 leading-[1.65] max-w-[38ch]"
              data-cms-role="description"
            >
              {description}
            </motion.p>

            {/* CTA — uno solo, sólido, sin animación interna */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 sm:mt-11 flex items-center gap-5"
            >
              <Link
                href="/reservas"
                className="group inline-flex items-center gap-2.5 bg-stone-900 text-white pl-6 pr-5 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors duration-300"
                data-cms-role="button"
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/servicios"
                className="text-sm text-stone-600 hover:text-stone-900 tracking-wide transition-colors duration-300 underline underline-offset-[6px] decoration-stone-300 hover:decoration-stone-900"
              >
                Zobacz usługi
              </Link>
            </motion.div>

            {/* Meta — línea fina inferior */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-12 lg:mt-20 text-[11px] uppercase tracking-[0.22em] text-stone-400"
              data-cms-role="meta"
            >
              {meta}
            </motion.p>
          </div>

          {/* ───── COLUMNA DERECHA: IMAGEN ───── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:flex-shrink-0 w-full sm:w-[460px] lg:w-[400px] xl:w-[440px]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200">
              <Image
                src={heroImage}
                alt="Studio Valiente — wnętrze gabinetu w Warszawie"
                fill
                priority
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 640px) 460px, 100vw"
                className="object-cover"
              />
              {/* Hairline corners sobrios, solo en la esquina superior izquierda y la inferior derecha */}
              <div className="absolute top-3 left-3 w-6 h-px bg-white/70" />
              <div className="absolute top-3 left-3 h-6 w-px bg-white/70" />
              <div className="absolute bottom-3 right-3 w-6 h-px bg-white/70" />
              <div className="absolute bottom-3 right-3 h-6 w-px bg-white/70" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hairline inferior — el sitio "respira" con una línea fina, no con gradientes */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200" />
    </section>
  );
}
