'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gift, Heart, Sparkles, CreditCard } from 'lucide-react';
import type { PageData } from '@/lib/cms';

interface GiftCardProps {
  pageData?: PageData;
}

const services = [
  'Oczyszczanie głębokie Premium',
  'Mikrodermabrazja diamentowa',
  'Mikronakłuwanie z egzosomami',
  'Terapia anti-aging',
  'Laminacja rzęs + odżywienie',
  'Laminacja brwi + botoks',
  'Microblading / mikropigmentacja',
  'Makijaż ślubny',
  'Makijaż wieczorowy',
  'Masaż relaksacyjny',
  'Masaż gorącymi kamieniami',
  'Manicure hybrydowy',
  'Inne (zapytaj)',
];

export default function GiftCard({ pageData }: GiftCardProps) {
  const [formData, setFormData] = useState({
    nombreComprador: '',
    telefonoComprador: '',
    nombreDestinatario: '',
    servicio: '',
  });
  const [loading, setLoading] = useState(false);

  const title = pageData
    ? pageData.content.find(c => c.section_key === 'gift_title')?.content_value || 'Podaruj chwilę relaksu'
    : 'Podaruj chwilę relaksu';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/giftcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-rose-50 to-white" data-section="gift">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
            Gift Card
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-2 sm:mb-3" data-cms-role="title">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto px-4">
            Idealny prezent dla wyjątkowej osoby. To znacznie więcej niż podarunek — to chwila czystego relaksu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-serif text-stone-900 mb-4 sm:mb-6">Jak to działa?</h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: Heart, text: 'Wybierz zabieg, który najbardziej spodoba się obdarowanej osobie' },
                { icon: CreditCard, text: 'Zapłać bezpiecznie kartą lub przelewem' },
                { icon: Sparkles, text: 'Otrzymaj Gift Card na e-mail w kilka sekund' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  </div>
                  <p className="text-sm sm:text-base text-stone-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4 sm:space-y-5"
          >
            <h3 className="text-lg sm:text-xl font-serif text-stone-900 mb-4 sm:mb-6">Zamów Gift Card</h3>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-700 mb-1.5 sm:mb-2">
                Twoje imię
              </label>
              <input
                type="text"
                required
                value={formData.nombreComprador}
                onChange={(e) => setFormData({ ...formData, nombreComprador: e.target.value })}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="Twoje imię i nazwisko"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-700 mb-1.5 sm:mb-2">
                Twój telefon / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={formData.telefonoComprador}
                onChange={(e) => setFormData({ ...formData, telefonoComprador: e.target.value })}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="+48 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-700 mb-1.5 sm:mb-2">
                Imię osoby obdarowanej
              </label>
              <input
                type="text"
                required
                value={formData.nombreDestinatario}
                onChange={(e) => setFormData({ ...formData, nombreDestinatario: e.target.value })}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="Imię osoby, która otrzyma prezent"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-stone-700 mb-1.5 sm:mb-2">
                Wybrany zabieg
              </label>
              <select
                required
                value={formData.servicio}
                onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all bg-white text-sm"
              >
                <option value="">Wybierz zabieg</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}