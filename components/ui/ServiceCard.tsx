'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  duration: string;
  index: number;
  imageUrl: string;
  price?: string;
  popular?: boolean;
}

export default function ServiceCard({ name, description, duration, index, imageUrl, price, popular }: ServiceCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  // Stagger the first 8 cards only — beyond that, all appear at once to keep
  // the grid snappy on /uslugi (31 services × 0.1s = 3s would be too slow).
  const stagger = Math.min(index, 8) * 0.04;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: stagger, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden bg-stone-50">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {popular && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-rose-500 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
            Popular
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm min-w-0">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{duration}</span>
          </span>
          {price && (
            <span className="text-base sm:text-xl font-semibold text-slate-900 shrink-0">{price}</span>
          )}
        </div>

        <h3 className="text-base sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2 leading-snug">{name}</h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{description}</p>

        <a
          href={`/rezerwacje?service=${encodeURIComponent(name)}`}
          className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 sm:py-3 rounded-lg font-medium hover:bg-slate-800 active:bg-slate-950 transition-colors text-sm"
        >
          Zarezerwuj
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
    </motion.div>
  );
}