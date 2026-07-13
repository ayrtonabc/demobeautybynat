'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import Script from 'next/script';
import type { PageData } from '@/lib/cms';

interface InstagramSectionProps {
  pageData?: PageData;
}

const INSTAGRAM_URL = 'https://www.instagram.com/beautybynatnataliadominiak/';
const INSTAGRAM_HANDLE = 'beautybynatnataliadominiak';

export default function InstagramSection({ pageData }: InstagramSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const instagramUrl = pageData?.settings?.instagram || INSTAGRAM_URL;
  const handle = instagramUrl
    .replace('https://www.instagram.com/', '')
    .replace('@', '');

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'instagram_title')?.content_value || 'Zajrzyj na Instagram'
    : 'Zajrzyj na Instagram';

  // After the Instagram embed script loads, it scans the DOM and replaces
  // <blockquote class="instagram-media"> with the actual widget. We trigger a
  // re-process when the component mounts.
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.instgrm?.Embeds?.process) {
      // @ts-ignore
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-white" data-section="instagram">
      {/* Load Instagram's official embed script */}
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        async
        onLoad={() => {
          // @ts-ignore
          if (window.instgrm?.Embeds?.process) {
            // @ts-ignore
            window.instgrm.Embeds.process();
          }
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 text-rose-500 font-medium text-xs sm:text-sm mb-2"
          >
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
            @{handle}
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

        {/* Instagram profile embed — muestra el grid completo del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center"
        >
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '12px',
              margin: '0 auto',
              maxWidth: '1000px',
              minWidth: '320px',
              padding: 0,
              width: '100%',
            }}
          >
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Zobacz posty na Instagramie
            </a>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-8"
        >
          <a
            href={instagramUrl}
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
