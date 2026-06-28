'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/cms/types';

interface TestimonialsProps {
  cmsTestimonials?: Testimonial[] | null;
}

const defaultTestimonials = [
  {
    name: 'Milena Kowalska',
    time: '2 miesiące temu',
    quote: 'To miejsce jest niesamowicie piękne, wszystko w nim uspokaja. Idealne, żeby się zrelaksować i cieszyć chwilą. Moje rzęsy wyglądają cudownie, a skóra promiennie. Dziękuję za troskę!',
  },
  {
    name: 'Karolina Nowak',
    time: 'Tydzień temu',
    quote: 'Świetne doświadczenie! Czułam się komfortowo i zaopiekowana.',
  },
  {
    name: 'Sylwia Adamczyk',
    time: '2 tygodnie temu',
    quote: 'Przepiękne miejsce, przytulne, ciepłe i z indywidualnym podejściem. Rzęsy wyglądają bosko i bardzo naturalnie.',
  },
  {
    name: 'Róża Sokołowska',
    time: '2 tygodnie temu',
    quote: 'Doświadczenie 10/10 od wejścia aż do wyjścia. Cudowne miejsce, uprzejmość i profesjonalizm na najwyższym poziomie. Wrócę!',
  },
  {
    name: 'Valeria Haag',
    time: '2 tygodnie temu',
    quote: 'Wspaniała obsługa! Makijaż wieczorowy wyszedł nieskazitelny. Bardzo dziękuję za tak ciepłe przyjęcie.',
  },
  {
    name: 'Ladchmi',
    time: '2 tygodnie temu',
    quote: 'Poza najlepszą obsługą, dostaje się tu też miłość, zaufanie i czas poświęcony tylko Tobie.',
  },
];

export default function Testimonials({ cmsTestimonials }: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);

  const testimonials = cmsTestimonials?.length
    ? cmsTestimonials.map(t => ({
        name: t.name,
        time: t.review_date || 'Ostatnio',
        quote: t.quote,
      }))
    : defaultTestimonials;
  
  const displayedReviews = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">
            Opinie
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-xl sm:text-2xl font-serif text-stone-900">5.0</span>
          </div>
          <p className="text-stone-500 text-sm sm:text-base">Co mówią osoby, które nas odwiedziły</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-stone-50/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-stone-50 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285F4"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-stone-900 text-sm">{review.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">{review.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{review.quote}</p>
            </motion.div>
          ))}
        </div>

        {testimonials.length > 6 && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
            >
              {showAll ? 'Pokaż mniej' : `Pokaż więcej (${testimonials.length - 6})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}