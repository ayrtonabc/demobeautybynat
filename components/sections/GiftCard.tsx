'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Heart, Sparkles, CreditCard, ArrowRight } from 'lucide-react';
import type { PageData } from '@/lib/cms';

interface GiftCardProps {
  pageData?: PageData;
}

const steps = [
  { icon: Heart, text: 'Wybierz kwotę lub konkretny zabieg' },
  { icon: CreditCard, text: 'Digitalna (e-mail) lub fizyczna (odbiór w salonie)' },
  { icon: Sparkles, text: 'Bezpieczna płatność i natychmiastowe potwierdzenie' },
];

// Imagen del voucher
const giftImage = '/demo servicios/voucher.jpg';

export default function GiftCard({ pageData }: GiftCardProps) {
  const title = pageData
    ? pageData.content.find(c => c.section_key === 'gift_title')?.content_value || 'Podaruj chwilę piękna'
    : 'Podaruj chwilę piękna';

  return (
    <section className="relative bg-stone-50 overflow-hidden" data-section="gift">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-10 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* ───── COLUMNA IZQUIERDA: IMAGEN ───── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="lg:flex-shrink-0 w-full sm:w-[460px] lg:w-[400px] xl:w-[440px] order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200">
              <Image
                src={giftImage}
                alt="Voucher Gift Card Beauty By Nat"
                fill
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 640px) 460px, 100vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 w-6 h-px bg-white/70" />
              <div className="absolute top-3 left-3 h-6 w-px bg-white/70" />
              <div className="absolute bottom-3 right-3 w-6 h-px bg-white/70" />
              <div className="absolute bottom-3 right-3 h-6 w-px bg-white/70" />
            </div>
          </motion.div>

          {/* ───── COLUMNA DERECHA: TEXTO ───── */}
          <div className="lg:flex-1 lg:max-w-[520px] order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-stone-500 mb-5 sm:mb-7 md:mb-9"
            >
              Gift Card Beauty By Nat
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-stone-900 leading-[1.05] tracking-[-0.02em] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] mb-5 sm:mb-6 md:mb-8"
              data-cms-role="title"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] sm:text-base text-stone-600 leading-[1.6] sm:leading-[1.65] max-w-[42ch] mb-6 sm:mb-8 md:mb-10"
            >
              Idealny prezent dla wyjątkowej osoby. Voucher na konkretny zabieg lub otwartą kwotę — digitalny lub fizyczny z odbiorem w salonie.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 sm:space-y-4 mb-7 sm:mb-8 md:mb-10"
            >
              {steps.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed pt-1.5">{text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/giftcard"
                className="group inline-flex items-center gap-2.5 bg-stone-900 text-white pl-6 pr-5 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors duration-300"
              >
                Zamów Gift Card
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200" />
    </section>
  );
}
