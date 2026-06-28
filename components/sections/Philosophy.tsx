'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import type { PageData } from '@/lib/cms';

interface PhilosophyProps {
  pageData?: PageData;
}

export default function Philosophy({ pageData }: PhilosophyProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stat1Number = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat1_number')?.content_value || '15+'
    : '15+';

  const stat1Label = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat1_label')?.content_value || 'Lat doświadczenia'
    : 'Lat doświadczenia';

  const stat2Number = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat2_number')?.content_value || '5000+'
    : '5000+';

  const stat2Label = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat2_label')?.content_value || 'Zadowolonych klientek'
    : 'Zadowolonych klientek';

  const stat3Number = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat3_number')?.content_value || '30+'
    : '30+';

  const stat3Label = pageData
    ? pageData.content.find(c => c.section_key === 'philosophy_stat3_label')?.content_value || 'Dostępnych zabiegów'
    : 'Dostępnych zabiegów';

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white overflow-hidden" data-section="philosophy">
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Zabieg na twarz w Valiente"
                fill
                className="object-cover"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 max-w-[160px] sm:max-w-[200px]"
            >
              <div className="text-3xl sm:text-4xl font-serif text-stone-900 mb-1">{stat1Number}</div>
              <div className="text-xs sm:text-sm text-stone-500 leading-relaxed">{stat1Label}</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">
              Nasza filozofia
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight mb-6 sm:mb-8" data-cms-role="title">
              Każda wizyta to chwila tylko dla Ciebie
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 sm:mb-8" data-cms-role="description">
              W Valiente tworzymy spersonalizowane protokoły, które szanują Twoją naturalność i podkreślają Twoje piękno. Setki osób wybierają nas co roku dzięki efektom i indywidualnemu podejściu.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {[
                'Konsultacja bez zobowiązań',
                'Spersonalizowane plany zabiegów',
                'Opieka pozabiegowa',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-stone-900 shrink-0" />
                  <span className="text-sm sm:text-base text-stone-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-10 border-t border-stone-100">
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-stone-900 mb-1">{stat2Number}</div>
                <div className="text-xs sm:text-sm text-stone-500">{stat2Label}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif text-stone-900 mb-1">{stat3Number}</div>
                <div className="text-xs sm:text-sm text-stone-500">{stat3Label}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}