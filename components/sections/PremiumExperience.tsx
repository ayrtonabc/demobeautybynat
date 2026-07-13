'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Award, Heart, Sparkles } from 'lucide-react';
import type { PageData } from '@/lib/cms';

interface PremiumExperienceProps {
  pageData?: PageData;
}

const features = [
  { icon: Shield, title: 'Higiena i bezpieczeństwo', desc: 'Jednorazowe materiały, sterylizacja narzędzi i certyfikowane kosmetyki.' },
  { icon: Award, title: 'Doświadczenie', desc: 'Setki wykonanych aplikacji, szkolenia z najlepszymi markami w branży.' },
  { icon: Heart, title: 'Indywidualne podejście', desc: 'Dobieram długość, objętość i kształt do Twoich oczu oraz stylu życia.' },
  { icon: Sparkles, title: 'Naturalny efekt', desc: 'Lubię WOW bez przerysowania — efekt, który wygląda pięknie i zdrowo.' },
];

export default function PremiumExperience({ pageData }: PremiumExperienceProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'premium_title')?.content_value || 'Dlaczego Beauty By Nat'
    : 'Dlaczego Beauty By Nat';

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-stone-50" data-section="premium">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-2" data-cms-role="title">
            {title}
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-sm">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
              </div>
              <h3 className="font-medium text-stone-900 mb-1 sm:mb-2 text-sm sm:text-base">{f.title}</h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}