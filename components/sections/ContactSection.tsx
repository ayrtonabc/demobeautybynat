'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import type { PageData } from '@/lib/cms';

interface ContactSectionProps {
  pageData?: PageData;
}

export default function ContactSection({ pageData }: ContactSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const phone = pageData?.settings?.phone || '+48 600 000 000';
  const email = pageData?.settings?.email || 'nat@beautybynat.pl';
  const address = pageData?.settings?.address || 'ul. Kasztanowa 1A, 62-090 Rokietnica';
  const whatsapp = pageData?.settings?.whatsapp || '48600000000';

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'contact_title')?.content_value || 'Odwiedź Beauty By Nat w Rokietnicy'
    : 'Odwiedź Beauty By Nat w Rokietnicy';

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-stone-50" data-section="contact">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">
              Kontakt
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight mb-6 sm:mb-8" data-cms-role="title">
              {title}
            </h2>

            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10" data-cms-role="contact_info">
              {[
                { icon: MapPin, label: 'Adres', value: address },
                { icon: Phone, label: 'Telefon', value: phone, href: `tel:+${phone.replace(/\D/g, '') }` },
                { icon: Mail, label: 'E-mail', value: email, href: `mailto:${email}` },
                { icon: Clock, label: 'Godziny', value: 'Pon - Pt: 9:00 - 20:00 · Sob: 9:00 - 16:00' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-stone-500 mb-0.5 sm:mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm sm:text-base text-stone-900 font-medium hover:text-stone-600 transition-colors" data-cms-role={label.toLowerCase()}>
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm sm:text-base text-stone-900 font-medium" data-cms-role={label.toLowerCase()}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              href={`https://wa.me/${whatsapp}?text=Cześć!%20Chciałbym%20dowiedzieć%20się%20więcej.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-stone-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm font-medium hover:bg-stone-800 transition-all duration-300 w-full sm:w-auto justify-center"
              data-cms-role="whatsapp_button"
            >
              <MessageCircle className="w-5 h-5" />
              Napisz do nas na WhatsApp
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps?q=Kasztanowa+1A,+62-090+Rokietnica&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Beauty By Nat — ul. Kasztanowa 1A, Rokietnica"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}