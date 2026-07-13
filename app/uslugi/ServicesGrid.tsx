'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '@/components/ui/ServiceCard';

export interface FilterableService {
  category: string;
  name: string;
  description: string;
  duration: string;
  imageUrl: string;
  price: string;
  popular?: boolean;
}

export const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'rzęsy', label: 'Rzęsy' },
  { id: 'brwi', label: 'Brwi' },
  { id: 'fryzury', label: 'Fryzury' },
  { id: 'makijaż', label: 'Makijaż' },
  { id: 'szkolenia', label: 'Szkolenia' },
] as const;

export default function ServicesGrid({ services }: { services: FilterableService[] }) {
  const [active, setActive] = useState<string>('all');

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: services.length };
    for (const s of services) {
      map[s.category] = (map[s.category] || 0) + 1;
    }
    return map;
  }, [services]);

  const filtered = useMemo(() => {
    return services.filter((s) => active === 'all' || s.category === active);
  }, [services, active]);

  return (
    <>
      {/* Category chips — horizontal scroll en mobile, wrap en desktop */}
      <div className="mb-6 sm:mb-8 -mx-5 sm:mx-0">
        <div className="flex sm:flex-wrap gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-x-visible no-scrollbar px-5 sm:px-0 pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] || 0;
            const disabled = count === 0;
            return (
              <button
                key={cat.id}
                onClick={() => !disabled && setActive(cat.id)}
                disabled={disabled}
                className={`group shrink-0 sm:shrink inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 touch-target ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-md'
                    : disabled
                    ? 'bg-stone-50 text-stone-300 cursor-not-allowed'
                    : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 text-sm text-stone-500">
        <p>
          {filtered.length === services.length
            ? `Wszystkie usługi (${services.length})`
            : `${filtered.length} z ${services.length} usług`}
        </p>
        {active !== 'all' && (
          <button
            onClick={() => setActive('all')}
            className="text-stone-500 hover:text-stone-900 transition-colors"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {filtered.length === 0 ? (
            <div className="py-16 sm:py-20 text-center">
              <p className="text-stone-500 text-base sm:text-lg mb-4 px-4">
                Nie znaleziono usług spełniających Twoje kryteria.
              </p>
              <button
                onClick={() => setActive('all')}
                className="text-sm text-stone-900 underline underline-offset-4 hover:text-stone-600 transition-colors"
              >
                Wyczyść filtry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filtered.map((service, i) => (
                <ServiceCard
                  key={`${active}-${service.name}`}
                  name={service.name}
                  description={service.description}
                  duration={service.duration}
                  imageUrl={service.imageUrl}
                  price={service.price}
                  popular={service.popular}
                  index={i}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
