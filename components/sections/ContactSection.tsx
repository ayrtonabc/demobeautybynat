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

  const phone = pageData?.settings?.phone || '+48 22 600 12 34';
  const email = pageData?.settings?.email || 'hola@valientebelleza.com.pl';
  const address = pageData?.settings?.address || 'ul. Mokotowska 12, 00-561 Warszawa';
  const whatsapp = pageData?.settings?.whatsapp || '48226001234';

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'contact_title')?.content_value || 'Odwiedź nas w Warszawie'
    : 'Odwiedź nas w Warszawie';

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-stone-50" data-section="contact">
      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
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
                { icon: Clock, label: 'Godziny', value: 'Pon - Pt: 9:00 - 20:00 · Sob: 9:00 - 14:00' },
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.1234!2d21.0123!3d52.2156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEyJzU2LjAiTiAyMcKwMDEnNDMuMyJF!5e0!3m2!1spl!2spl!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Valiente Studio Urody"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}