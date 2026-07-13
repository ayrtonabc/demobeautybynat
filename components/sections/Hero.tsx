'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Carrusel interno del Hero: crossfade automático entre 4 imágenes + Ken Burns
function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden bg-stone-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroImages.map((img, i) => {
        const isActive = active === i;
        // Each slide cycles: enter from below with zoom, hold, then exit upward
        // to the next. We use key + animate so the entrance animation fires
        // every time the slide becomes active.
        return (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 60, scale: 1.12 }}
            animate={
              isActive
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -40, scale: 1.05 }
            }
            transition={{
              opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: SLIDE_DURATION / 1000, ease: 'linear' },
            }}
            className="absolute inset-0"
            style={{ zIndex: isActive ? 2 : 1 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 640px) 460px, 100vw"
              className="object-cover"
            />
            {/* Glow overlay on entrance — adds the "WOW" highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.18 : 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-tr from-rose-200/40 via-transparent to-amber-100/30 mix-blend-soft-light pointer-events-none"
            />
          </motion.div>
        );
      })}

      {/* Hairline corners sobrios */}
      <div className="absolute top-3 left-3 w-6 h-px bg-white/70 z-10" />
      <div className="absolute top-3 left-3 h-6 w-px bg-white/70 z-10" />
      <div className="absolute bottom-3 right-3 w-6 h-px bg-white/70 z-10" />
      <div className="absolute bottom-3 right-3 h-6 w-px bg-white/70 z-10" />

      {/* Indicadores de slide (puntitos) abajo a la izquierda */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              active === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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

// Imagen principal del hero — Beauty By Nat (primer slide del carrusel)
const heroImages = [
  { src: '/hero.webp', alt: 'Beauty By Nat — studio urody w Rokietnicy' },
  { src: '/demo servicios/extensiones-pestanas-1.jpg', alt: 'Przedłużanie rzęs 1:1' },
  { src: '/demo servicios/volume-light-medium-mega.jpg', alt: 'Volume Light, Medium i Mega' },
  { src: '/demo servicios/makijaz-okolicznosciowy.jpg', alt: 'Makijaż okolicznościowy' },
];
const SLIDE_DURATION = 5000; // ms que cada imagen permanece visible

export default function Hero({ pageData }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getContent = (key: string, fallback: string) => {
    if (!pageData?.content) return fallback;
    const item = pageData.content.find((c) => c.section_key === key);
    return item?.content_value || fallback;
  };

  const kicker = getContent('hero_kicker', 'Beauty By Nat · Rokietnica / Poznań');
  const titleLine1 = getContent('hero_title_line1', 'Rzęsy,');
  const titleLine2 = getContent('hero_title_line2', 'fryzury');
  const titleLine3 = getContent('hero_title_line3', 'i efekt WOW.');
  const description = getContent(
    'hero_description',
    'Beauty By Nat to kameralne studio urody Natalii Dominiak w Rokietnicy. Przedłużanie i stylizacja rzęs, geometria i laminacja brwi, fryzury okolicznościowe oraz makijaż — naturalnie, glam lub na wielkie wyjście.'
  );
  const primaryCta = getContent('hero_button_primary', 'Zarezerwuj wizytę');
  const meta = getContent('hero_meta', 'ul. Kasztanowa 1A  ·  Rokietnica k. Poznania');

  return (
    <section
      ref={ref}
      className="relative bg-stone-50 overflow-hidden"
      data-section="hero"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-10 lg:px-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* ───── COLUMNA IZQUIERDA: TEXTO ───── */}
          <div className="lg:flex-1 lg:max-w-[520px]">
            {/* Kicker — etiqueta pequeña, sin badge pulsante */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-stone-500 mb-5 sm:mb-7 md:mb-9"
              data-cms-role="kicker"
            >
              {kicker}
            </motion.p>

            {/* Título — 3 líneas, tipografía editorial controlada */}
            <h1 className="font-serif text-stone-900 leading-[1.05] tracking-[-0.02em] text-[34px] sm:text-[44px] md:text-[56px] lg:text-[64px] xl:text-[72px]">
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

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 sm:mt-7 md:mt-9 text-[15px] sm:text-base text-stone-600 leading-[1.6] sm:leading-[1.65] max-w-[42ch]"
              data-cms-role="description"
            >
              {description}
            </motion.p>

            {/* CTA — stack vertical en mobile, horizontal en desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 sm:mt-9 md:mt-11 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-5"
            >
              <Link
                href="/rezerwacje"
                className="group inline-flex items-center justify-center gap-2.5 bg-stone-900 text-white pl-6 pr-5 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-stone-800 active:bg-stone-950 transition-colors duration-300 w-full sm:w-auto"
                data-cms-role="button"
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/uslugi"
                className="inline-flex items-center justify-center text-sm text-stone-600 hover:text-stone-900 tracking-wide transition-colors duration-300 underline underline-offset-[6px] decoration-stone-300 hover:decoration-stone-900 py-2"
              >
                Zobacz usługi
              </Link>
            </motion.div>

            {/* Meta — línea fina inferior */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-[11px] uppercase tracking-[0.22em] text-stone-400"
              data-cms-role="meta"
            >
              {meta}
            </motion.p>
          </div>

          {/* ───── COLUMNA DERECHA: IMAGEN (carrusel crossfade) ───── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:flex-shrink-0 w-full sm:w-[460px] lg:w-[400px] xl:w-[440px] lg:-mt-2"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </div>

      {/* Hairline inferior — el sitio "respira" con una línea fina, no con gradientes */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200" />
    </section>
  );
}
