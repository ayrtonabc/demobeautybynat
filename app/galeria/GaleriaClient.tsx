'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const defaultImages = [
  { src: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Zabieg na twarz' },
  { src: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Oczyszczanie głębokie' },
  { src: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Pielęgnacja' },
  { src: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Zabieg na ciało' },
  { src: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Mezoterapia' },
  { src: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Depilacja' },
  { src: 'https://images.pexels.com/photos/3985335/pexels-photo-3985355.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Laser' },
  { src: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Nasze wnętrze' },
  { src: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Peeling' },
  { src: 'https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compact&cs=tinysrgb&w=1200', label: 'Atmosfera' },
];

interface GaleriaClientProps {
  pageTitle?: string;
  pageDescription?: string;
  galleryImages?: Array<{ src: string; label: string }>;
}

export default function GaleriaClient({
  pageTitle = 'Nasze realizacje',
  pageDescription = 'Prawdziwe efekty u prawdziwych klientek. Zobacz metamorfozy.',
  galleryImages = defaultImages
}: GaleriaClientProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
          <span className="text-rose-500 font-medium text-sm">Galeria</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4" data-cms-section="galeria_title">
            {pageTitle}
          </h1>
          <p className="text-slate-600 max-w-xl text-sm sm:text-base" data-cms-section="galeria_description">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(img.src)}
                className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs sm:text-sm">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Galeria"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}