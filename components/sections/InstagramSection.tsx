'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Heart } from 'lucide-react';
import type { PageData } from '@/lib/cms';

interface InstagramSectionProps {
  pageData?: PageData;
}

const images = [
  'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function InstagramSection({ pageData }: InstagramSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const instagramHandle = pageData?.settings?.instagram
    ? pageData.settings.instagram.replace('https://www.instagram.com/', '').replace('@', '')
    : 'valiente.warszawa';

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'instagram_title')?.content_value || 'Śledź nas na Instagramie'
    : 'Śledź nas na Instagramie';

  return (
    <section className="py-16 sm:py-20 bg-white" data-section="instagram">
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 text-rose-500 font-medium text-xs sm:text-sm mb-2"
          >
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
            @{instagramHandle}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif text-slate-900"
            data-cms-role="title"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {images.map((src, i) => (
            <motion.a
              key={i}
              href={pageData?.settings?.instagram || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group"
            >
              <img
                src={src}
                alt={`Instagram ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-8"
        >
          <a
            href={pageData?.settings?.instagram || 'https://instagram.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm sm:text-base"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            Zobacz więcej na Instagramie
          </a>
        </motion.div>
      </div>
    </section>
  );
}