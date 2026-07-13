'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Update scroll indicators (mobile only)
  const updateScrollIndicators = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollIndicators();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollIndicators, { passive: true });
    window.addEventListener('resize', updateScrollIndicators);
    return () => {
      el.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', updateScrollIndicators);
    };
  }, []);

  // Scroll the chip into view when selected
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    const btn = chipRefs.current[active];
    if (btn && scrollRef.current) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <>
      {/* Category chips */}
      <div className="relative mb-6 sm:mb-8 -mx-5 sm:mx-0">
        {/* Mobile scroll arrows + fade gradients */}
        <div className="sm:hidden">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollBy(-120)}
              aria-label="Przewiń filtry w lewo"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-stone-200 rounded-full shadow-md flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-4 h-4 text-stone-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy(120)}
              aria-label="Przewiń filtry w prawo"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/95 border border-stone-200 rounded-full shadow-md flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronRight className="w-4 h-4 text-stone-700" />
            </button>
          )}

          {/* Left edge fade */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-[1]" />
          )}
          {/* Right edge fade */}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-[1]" />
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex sm:flex-wrap gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-x-visible no-scrollbar px-5 sm:px-0 py-1"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] || 0;
            const disabled = count === 0;
            return (
              <button
                key={cat.id}
                ref={(el) => { chipRefs.current[cat.id] = el; }}
                onClick={() => !disabled && setActive(cat.id)}
                disabled={disabled}
                className={`group shrink-0 sm:shrink inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 touch-target ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-md scale-[1.02]'
                    : disabled
                    ? 'bg-stone-50 text-stone-300 cursor-not-allowed'
                    : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 hover:border-stone-300 active:scale-95'
                }`}
              >
                <span className="whitespace-nowrap">{cat.label}</span>
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
            className="text-stone-500 hover:text-stone-900 transition-colors touch-target"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
