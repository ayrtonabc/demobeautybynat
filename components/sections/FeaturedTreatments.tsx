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
    name: 'Oczyszczanie głębokie Premium',
    description: 'Spersonalizowany zabieg, który odżywia, odnawia i przywraca skórze blask oraz zdrowy wygląd.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
    popular: true,
  },
  {
    name: 'Mikrodermabrazja diamentowa',
    description: 'Głęboka eksfoliacja i odnowa komórkowa dla gładkiej, promiennej cery.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
    popular: true,
  },
  {
    name: 'Mikronakłuwanie z egzosomami',
    description: 'Stymulacja kolagenu dla poprawy tekstury skóry, redukcji zmarszczek i blizn.',
    duration: '1 h 30',
    imageUrl: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
  },
  {
    name: 'Laminacja rzęs',
    description: 'Naturalne podkręcenie i definicja rzęs od samej nasady.',
    duration: '60 min',
    imageUrl: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
  },
  {
    name: 'Laminacja brwi',
    description: 'Idealny kształt, porządek i objętość brwi dla wyrazistego spojrzenia.',
    duration: '60 min',
    imageUrl: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
  },
  {
    name: 'Masaż relaksacyjny',
    description: 'Transformujące doświadczenie od stóp do głów z aromaterapią.',
    duration: '90 min',
    imageUrl: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Cena na zapytanie',
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
      imageUrl: s.image_url || 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: s.price || 'Consultar',
      popular: s.featured || false,
    }))
    : defaultServices;

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase mb-3 sm:mb-4">
            Nasze usługi
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900">
            Wyróżnione zabiegi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
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