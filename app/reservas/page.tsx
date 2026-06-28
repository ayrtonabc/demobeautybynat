'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, CreditCard, Phone } from 'lucide-react';

const serviceCategories = [
  {
    name: 'Twarz',
    services: [
      { name: 'Oczyszczanie głębokie Premium', price: 500, duration: '1 h 30' },
      { name: 'Mikrodermabrazja diamentowa', price: 550, duration: '1 h 30' },
      { name: 'Mikronakłuwanie z egzosomami', price: 700, duration: '1 h 30' },
      { name: 'Terapia anti-aging: witalność i jędrność', price: 550, duration: '1 h 30' },
      { name: 'Leczenie przebarwień (melasma)', price: 500, duration: 'Na zapytanie' },
      { name: 'Osocze bogatopłytkowe (PRP)', price: 1500, duration: '60 min' },
      { name: 'Mezoterapia', price: 650, duration: '60 min' },
    ],
  },
  {
    name: 'Oczy i brwi',
    services: [
      { name: 'Laminacja rzęs + odżywienie', price: 350, duration: '60 min' },
      { name: 'Laminacja brwi + botoks', price: 250, duration: '60 min' },
      { name: 'Regulacja brwi pęsetą', price: 250, duration: '60 min' },
      { name: 'Microblading / mikropigmentacja', price: 2200, duration: '2 h 30' },
      { name: 'Nawilżanie ust', price: 1900, duration: '1 h 30' },
    ],
  },
  {
    name: 'Manicure i pedicure',
    services: [
      { name: 'Manicure hybrydowy', price: 350, duration: '2 godz.' },
      { name: 'Kapping żelowy', price: 400, duration: '2 godz.' },
      { name: 'Soft gel', price: 450, duration: '2 godz.' },
    ],
  },
  {
    name: 'Masaże',
    services: [
      { name: 'Gorące kamienie', price: 600, duration: '60 min' },
      { name: 'Relaksacyjny', price: 700, duration: '90 min' },
      { name: 'Ulgowy', price: 600, duration: '60 min' },
      { name: 'Wyciszający', price: 600, duration: '60 min' },
      { name: 'Miejscowy', price: 450, duration: '45 min' },
      { name: 'Stopy na ziemi', price: 500, duration: '45 min' },
      { name: 'Gniazdo (dla kobiet w ciąży)', price: 550, duration: '90 min' },
      { name: 'Alchemia (Reiki + masaż)', price: 650, duration: '90 min' },
      { name: 'Drenaż limfatyczny', price: 450, duration: '60 min' },
      { name: 'Modelujący i ujędrniający', price: 450, duration: '60 min' },
      { name: 'Odrodzenie', price: 650, duration: '60 min' },
    ],
  },
  {
    name: 'Makijaż okolicznościowy',
    services: [
      { name: 'Pakiet Panna Młoda (komplet)', price: 4500, duration: 'Do uzgodnienia' },
      { name: 'Pakiet Pan Młody', price: 3500, duration: 'Do uzgodnienia' },
      { name: 'Makijaż Panny Młodej', price: 2100, duration: 'Na zapytanie' },
      { name: 'Makijaż Pana Młodego', price: 1900, duration: 'Na zapytanie' },
      { name: 'Makijaż imprezowy (np. osiemnastka)', price: 1900, duration: 'Na zapytanie' },
      { name: 'Makijaż dzienny', price: 1500, duration: 'Na zapytanie' },
    ],
  },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<{name: string, price: number, duration: string} | null>(null);
  const [form, setForm] = useState({
    date: '', time: '', name: '', phone: ''
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setLoading(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          serviceDuration: selectedService.duration,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Coś poszło nie tak. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 2) * 100;
  const currentCategory = serviceCategories.find(c => c.name === selectedCategory);

  return (
    <>
      <section className="pt-28 pb-8 bg-gradient-to-br from-stone-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm font-medium tracking-widest text-stone-500 uppercase">Rezerwacje online</span>
          <h1 className="text-4xl font-serif text-stone-900 mt-2 mb-4">
            Zarezerwuj wizytę
          </h1>
          <p className="text-stone-600">
            Wybierz zabieg, zapłać i potwierdź wizytę w kilka sekund.
          </p>

          <div className="flex justify-center gap-6 mt-6 text-sm text-stone-500">
            {['Bezpieczna płatność', 'Natychmiastowe potwierdzenie', 'Przypomnienie SMS'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full bg-rose-500 rounded-full transition-all duration-300"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-stone-400">
              <span>1. Zabieg</span>
              <span>2. Dane i płatność</span>
            </div>
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-6">
                <h2 className="text-xl font-serif text-stone-900 mb-4">Wybierz zabieg</h2>

                {!selectedCategory ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {serviceCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className="p-4 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 rounded-xl text-center transition-all"
                      >
                        <span className="font-medium text-stone-700 text-sm">{category.name}</span>
                        <span className="block text-xs text-stone-400 mt-1">{category.services.length} usług</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-4"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Wszystkie kategorie
                    </button>

                    <h3 className="text-lg font-medium text-stone-900 mb-4">{currentCategory?.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentCategory?.services.map((service) => (
                        <button
                          key={service.name}
                          onClick={() => {
                            setSelectedService(service);
                            setStep(2);
                          }}
                          className="p-4 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 rounded-xl text-left transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-stone-900 text-sm group-hover:text-rose-600">{service.name}</span>
                            <span className="text-rose-500 font-semibold text-sm">{service.price} zł</span>
                          </div>
                          <span className="text-xs text-stone-400">{service.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedService && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Zmień zabieg
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-serif text-stone-900 mb-2">{selectedService.name}</h2>
                  <p className="text-2xl font-serif text-rose-500 mb-6">{selectedService.price} zł</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Data</label>
                        <input
                          type="date"
                          required
                          min={minDate}
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Godzina</label>
                        <select
                          required
                          value={form.time}
                          onChange={(e) => setForm({ ...form, time: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none bg-white"
                        >
                          <option value="">Wybierz godzinę</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Imię i nazwisko</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="Twoje imię i nazwisko"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Telefon (do SMS-a)</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                          placeholder="+48 XXX XXX XXX"
                        />
                      </div>
                    </div>

                    <div className="bg-stone-50 rounded-xl p-4 mt-6">
                      <h3 className="font-medium text-stone-900 mb-3">Podsumowanie</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Zabieg</span>
                          <span className="text-stone-900">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Data</span>
                          <span className="text-stone-900">{form.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Godzina</span>
                          <span className="text-stone-900">{form.time}</span>
                        </div>
                        <div className="flex justify-between border-t border-stone-200 pt-2 mt-2">
                          <span className="text-stone-700 font-medium">Razem</span>
                          <span className="text-rose-500 font-semibold text-lg">{selectedService.price} zł</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !form.date || !form.time || !form.name || !form.phone}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-4 rounded-xl font-medium hover:from-rose-600 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/25"
                    >
                      {loading ? (
                        'Przetwarzanie...'
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Zapłać i zarezerwuj
                        </>
                      )}
                    </button>

                    <p className="text-xs text-stone-400 text-center">
                      Otrzymasz SMS z potwierdzeniem oraz przypomnienie dzień przed wizytą.
                    </p>
                  </form>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-rose-50 rounded-2xl p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <Phone className="w-6 h-6 text-rose-500" />
                      <h3 className="text-lg font-serif text-stone-900">Jak to działa?</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-medium shrink-0">1</div>
                        <p className="text-sm text-stone-600">Wybierz zabieg i dogodny termin</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-medium shrink-0">2</div>
                        <p className="text-sm text-stone-600">Zapłać bezpiecznie online</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-medium shrink-0">3</div>
                        <p className="text-sm text-stone-600">Otrzymasz SMS z potwierdzeniem</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-medium shrink-0">4</div>
                        <p className="text-sm text-stone-600">Wyślemy przypomnienie dzień wcześniej</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}