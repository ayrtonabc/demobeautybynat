'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle } from 'lucide-react';

// Imágenes reales del demo servicios con datos enriquecidos (likes/comments)
// para dar sensación de feed de Instagram.
const defaultGallery = [
  { src: '/demo servicios/extensiones-pestanas-1.jpg', label: 'Przedłużanie rzęs 1:1', category: 'Rzęsy', aspect: 'tall', likes: 142, comments: 8 },
  { src: '/demo servicios/volume-light-medium-mega.jpg', label: 'Volume Light / Medium / Mega', category: 'Rzęsy', aspect: 'square', likes: 218, comments: 14 },
  { src: '/demo servicios/efekt-kim-kardashian-eyeliner.jpg', label: 'Efekt Kim Kardashian / Eyeliner', category: 'Rzęsy', aspect: 'square', likes: 305, comments: 21 },
  { src: '/demo servicios/laminacja-i-geometria-brwi.jpg', label: 'Laminacja i geometria brwi', category: 'Brwi', aspect: 'tall', likes: 189, comments: 11 },
  { src: '/demo servicios/fryzury-okolicznosciowe.jpg', label: 'Fryzura okolicznościowa', category: 'Fryzury', aspect: 'tall', likes: 256, comments: 17 },
  { src: '/demo servicios/makijaz-okolicznosciowy.jpg', label: 'Makijaż okolicznościowy', category: 'Makijaż', aspect: 'square', likes: 198, comments: 9 },
  { src: '/demo servicios/extensiones-pestanas-1.jpg', label: 'Mega Volume — efekt WOW', category: 'Rzęsy', aspect: 'square', likes: 167, comments: 6 },
  { src: '/demo servicios/fryzury-okolicznosciowe.jpg', label: 'Upięcie na wesele', category: 'Fryzury', aspect: 'tall', likes: 234, comments: 13 },
  { src: '/demo servicios/makijaz-okolicznosciowy.jpg', label: 'Makijaż na osiemnastkę', category: 'Makijaż', aspect: 'square', likes: 178, comments: 10 },
  { src: '/demo servicios/laminacja-i-geometria-brwi.jpg', label: 'Henna pudrowa + geometria', category: 'Brwi', aspect: 'square', likes: 145, comments: 5 },
];

interface GaleriaClientProps {
  pageTitle?: string;
  pageDescription?: string;
  galleryImages?: Array<{ src: string; label: string }>;
}

const aspectClass: Record<string, string> = {
  tall: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[4/3]',
};

export default function GaleriaClient({
  pageTitle = 'Realizacje Beauty By Nat',
  pageDescription = 'Prawdziwe efekty rzęs, brwi, fryzur i makijażu u moich klientek.',
  galleryImages,
}: GaleriaClientProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Si el CMS trae imágenes, las uso; si no, uso el grid local
  const items: any[] = galleryImages && galleryImages.length > 0
    ? galleryImages.map((img, i) => ({
        ...img,
        category: '',
        aspect: 'square',
        likes: 0,
        comments: 0,
      }))
    : defaultGallery;

  return (
    <>
      {/* Header */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-stone-300" />
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.28em] text-stone-500 uppercase">
              Galeria
            </p>
            <div className="h-px w-8 bg-stone-300" />
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-5"
            data-cms-section="galeria_title"
          >
            {pageTitle}
          </h1>
          <p
            className="text-stone-600 max-w-xl text-sm sm:text-base"
            data-cms-section="galeria_description"
          >
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-2 sm:gap-3 md:gap-4 [column-fill:_balance]">
            {items.map((img: any, i) => (
              <motion.button
                key={`${img.src}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 6) * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(i)}
                className={`relative mb-3 sm:mb-4 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-stone-200 group cursor-pointer break-inside-avoid ${
                  aspectClass[img.aspect] || 'aspect-square'
                }`}
                aria-label={img.label}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay con datos estilo Instagram */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                  {img.category && (
                    <p className="text-white/80 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5">
                      {img.category}
                    </p>
                  )}
                  <p className="text-white text-sm sm:text-base font-medium leading-snug mb-3 text-left">
                    {img.label}
                  </p>
                  {img.likes > 0 && (
                    <div className="flex items-center gap-4 text-white/90 text-xs sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                        {img.likes}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {img.comments}
                      </span>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9990] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              aria-label="Zamknij"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full"
            >
              <img
                src={items[lightbox]?.src}
                alt={items[lightbox]?.label}
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg text-center">
                {items[lightbox]?.category && (
                  <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                    {items[lightbox].category}
                  </p>
                )}
                <p className="text-white text-sm sm:text-lg font-medium">
                  {items[lightbox]?.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Variable local duplicada (movida al inicio del archivo)
// Mantener este bloque vacío previene errores por declaraciones duplicadas
// si por algún motivo el archivo se regenera con la versión anterior.
