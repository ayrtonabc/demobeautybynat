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
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {popular && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-rose-500 text-white text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
            Popular
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {duration}
          </span>
          {price && (
            <span className="text-lg sm:text-xl font-semibold text-slate-900">{price}</span>
          )}
        </div>

        <h3 className="text-base sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">{name}</h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">{description}</p>

        <a
          href="/reservas"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
        >
          Zarezerwuj
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
    </motion.div>
  );
}