'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/cms/types';

interface TestimonialsProps {
  cmsTestimonials?: Testimonial[] | null;
}

const defaultTestimonials = [
  {
    name: 'Anna K.',
    time: '2 tygodnie temu',
    quote: 'Nat jest absolutną mistrzynią rzęs! Volume wygląda cudownie, mega naturalnie i utrzymuje się świetnie. Polecam z całego serca.',
  },
  {
    name: 'Magdalena W.',
    time: 'Miesiąc temu',
    quote: 'Fryzura na mój ślub była dokładnie taka, jaką sobie wymarzyłam. Spokój, profesjonalizm i zero stresu. Dziękuję!',
  },
  {
    name: 'Katarzyna P.',
    time: '3 tygodnie temu',
    quote: 'Efekt Kim Kardashian — rewelacja! Rzęsy wyglądają spektakularnie, ale jednocześnie lekko. Wreszcie czuję się WOW.',
  },
  {
    name: 'Joanna S.',
    time: 'Miesiąc temu',
    quote: 'Laminacja brwi zmieniła moją twarz. Nat dobrała kształt idealnie do moich rysów. Teraz nie maluję brwi wcale.',
  },
  {
    name: 'Aleksandra B.',
    time: '2 miesiące temu',
    quote: 'Makijaż na osiemnastkę córki — przepiękny, trwały i dobrany do jej stylu. Wszystkie koleżanki pytały o kontakt do Nat.',
  },
  {
    name: 'Paulina M.',
    time: 'Miesiąc temu',
    quote: 'Wreszcie ktoś, kto naprawdę słucha. Rzęsy dopasowane do mojego stylu życia — zero szablonów, sama jakość.',
  },
  {
    name: 'Natalia R.',
    time: '3 tygodnie temu',
    quote: 'Mega Volume utrzymał się 5 tygodni bez poprawek. Wyglądał jak pierwszego dnia. Najlepsza stylistka w okolicy!',
  },
  {
    name: 'Karolina D.',
    time: 'Miesiąc temu',
    quote: 'Henna pudrowa brwi + laminacja — mój nowy must have. Codziennie oszczędzam 15 minut na makijażu.',
  },
];

function TestimonialCard({ name, time, quote }: { name: string; time: string; quote: string }) {
  return (
    <div className="group flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] mr-5 sm:mr-6">
      <div className="relative h-full bg-stone-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-100 hover:border-stone-200 hover:bg-white hover:shadow-xl transition-all duration-500">
        {/* Quote mark decorativo */}
        <Quote className="absolute top-5 right-5 sm:top-6 sm:right-6 w-7 h-7 sm:w-9 sm:h-9 text-stone-200 group-hover:text-rose-200 transition-colors duration-500" strokeWidth={1.5} />

        {/* Stars */}
        <div className="flex gap-0.5 mb-4 sm:mb-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-stone-800 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 line-clamp-4">
          {quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-stone-200/70">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center text-white text-sm font-medium shrink-0">
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-stone-900 text-sm truncate">{name}</p>
            <p className="text-xs text-stone-400 mt-0.5">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ cmsTestimonials }: TestimonialsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = cmsTestimonials?.length
    ? cmsTestimonials.map(t => ({
        name: t.name,
        time: t.review_date || 'Ostatnio',
        quote: t.quote,
      }))
    : defaultTestimonials;

  // Split into two rows for a bicolor marquee
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);
  // Duplicate each row to make the loop seamless
  const row1Loop = [...row1, ...row1];
  const row2Loop = [...row2, ...row2];

  return (
    <section ref={ref} className="relative py-14 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden" data-section="testimonials">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 mb-10 sm:mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
            <div className="h-px w-8 sm:w-12 bg-stone-300" />
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.28em] text-stone-500 uppercase">
              Opinie
            </p>
            <div className="h-px w-8 sm:w-12 bg-stone-300" />
          </div>
          <h2 className="font-serif text-stone-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-5">
            5.0
            <span className="text-stone-400"> / 5</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-stone-500 text-sm sm:text-base">
            Co mówią osoby, które nas odwiedziły
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5 sm:space-y-6">
        {/* Row 1: scroll right -> left */}
        <div
          className="flex marquee-track"
          style={{ animation: 'marquee-left 50s linear infinite', willChange: 'transform' }}
        >
          {row1Loop.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>

        {/* Row 2: scroll left -> right */}
        <div
          className="flex marquee-track"
          style={{ animation: 'marquee-right 60s linear infinite', willChange: 'transform' }}
        >
          {row2Loop.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent" />

      {/* Local keyframes (scoped via emotion-free inline <style>) */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
