'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import type { Service } from '@/lib/cms/types';

interface FeaturedTreatmentsProps {
  cmsServices?: Service[] | null;
}

const defaultServices = [
  {
    name: 'Przedłużanie rzęs 1:1 (klasyka)',
    description: 'Naturalny, elegancki efekt — jedna syntetyczna rzęsa na każdą naturalną. Idealne na co dzień.',
    duration: '2 h 30',
    imageUrl: '/demo servicios/extensiones-pestanas-1.jpg',
    price: 'od 180 zł',
    popular: true,
  },
  {
    name: 'Volume Light / Medium / Mega',
    description: 'Lekka, średnia lub mocna objętość dopasowana do kształtu oka i stylu — od delikatnego do spektakularnego efektu.',
    duration: '3 h',
    imageUrl: '/demo servicios/volume-light-medium-mega.jpg',
    price: 'od 210 zł',
    popular: true,
  },
  {
    name: 'Efekt Kim Kardashian / Eyeliner',
    description: 'Dramatyczne, mocno podkręcone i pogrubione rzęsy dla miłośniczek intensywnego spojrzenia.',
    duration: '3 h',
    imageUrl: '/demo servicios/efekt-kim-kardashian-eyeliner.jpg',
    price: 'od 220 zł',
  },
  {
    name: 'Laminacja i geometria brwi',
    description: 'Ułożenie, odżywienie i precyzyjne wymodelowanie kształtu brwi zgodnie z morfologią twarzy.',
    duration: '60 min',
    imageUrl: '/demo servicios/laminacja-i-geometria-brwi.jpg',
    price: 'od 120 zł',
    popular: true,
  },
  {
    name: 'Fryzury okolicznościowe',
    description: 'Upięcia i fale na wesela, komunie, osiemnastki i sesje zdjęciowe — włosy krótkie, średnie, długie i z doczepami.',
    duration: 'od 60 min',
    imageUrl: '/demo servicios/fryzury-okolicznosciowe.jpg',
    price: 'od 250 zł',
  },
  {
    name: 'Makijaż okolicznościowy',
    description: 'Spersonalizowany makijaż na wesela, przyjęcia, sesje i każdą chwilę, w której chcesz wyglądać olśniewająco.',
    duration: '60 min',
    imageUrl: '/demo servicios/makijaz-okolicznosciowy.jpg',
    price: '250 zł',
  },
];

export default function FeaturedTreatments({ cmsServices }: FeaturedTreatmentsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  const services = cmsServices?.length 
    ? cmsServices.map(s => ({
      name: s.name,
      description: s.description || '',
      duration: s.duration || '',
      imageUrl: s.image_url || 'https://images.pexels.com/photos/6724389/pexels-photo-6724389.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: s.price || 'Na zapytanie',
      popular: s.featured || false,
    }))
    : defaultServices;

  return (
    <section ref={ref} className="py-14 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">
            Nasze usługi
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900">
            Nasze specjalizacje
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <ServiceCard {...service} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}