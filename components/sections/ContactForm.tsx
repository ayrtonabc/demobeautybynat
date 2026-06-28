'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send } from 'lucide-react';
import LuxuryButton from '@/components/ui/LuxuryButton';

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const services = [
    'Oczyszczanie twarzy',
    'Botoks',
    'Wypełniacze',
    'Pielęgnacja Premium',
    'Depilacja laserowa',
    'Zabiegi na ciało',
    'Mezoterapia',
    'Peeling chemiczny',
    'Mikropigmentacja',
    'Inne',
  ];

  return (
    <section className="py-20 md:py-28 section-divider bg-[#fafafa]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="font-serif text-black text-3xl mb-4">Dziękujemy za wiadomość</p>
              <p className="text-black/60 text-sm font-sans">Odezwiemy się najszybciej jak to możliwe.</p>
            </motion.div>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-[10px] tracking-[0.5em] uppercase font-sans text-black/40 mb-4 text-center"
              >
                Napisz do nas
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-display-md text-black text-center mb-12"
              >
                Wyślij wiadomość
              </motion.h2>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.4em] uppercase font-sans text-black/40 mb-2">
                      Imię
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Twoje imię i nazwisko"
                      className="w-full bg-transparent border border-black/10 text-black text-sm font-sans px-4 py-3 placeholder-black/30 focus:outline-none focus:border-black/30 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.4em] uppercase font-sans text-black/40 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="twoj@email.com"
                      className="w-full bg-transparent border border-black/10 text-black text-sm font-sans px-4 py-3 placeholder-black/30 focus:outline-none focus:border-black/30 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.4em] uppercase font-sans text-black/40 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+48 22..."
                      className="w-full bg-transparent border border-black/10 text-black text-sm font-sans px-4 py-3 placeholder-black/30 focus:outline-none focus:border-black/30 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.4em] uppercase font-sans text-black/40 mb-2">
                      Rodzaj zabiegu
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-white border border-black/10 text-black text-sm font-sans px-4 py-3 focus:outline-none focus:border-black/30 transition-colors duration-300 appearance-none"
                    >
                      <option value="" className="bg-white text-black/40">Wybierz...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-white">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.4em] uppercase font-sans text-black/40 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Powiedz nam, w czym możemy pomóc..."
                    className="w-full bg-transparent border border-black/10 text-black text-sm font-sans px-4 py-3 placeholder-black/30 focus:outline-none focus:border-black/30 transition-colors duration-300 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <LuxuryButton type="submit" size="lg">
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Wyślij wiadomość
                  </LuxuryButton>
                </div>
              </motion.form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
