'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, CreditCard, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const servicePrices = [
  { name: 'Przedłużanie rzęs 1:1 (klasyka)', price: 180 },
  { name: 'Volume Light / Medium / Mega', price: 210 },
  { name: 'Efekt Kim Kardashian / Eyeliner', price: 220 },
  { name: 'Laminacja i geometria brwi', price: 120 },
  { name: 'Henna pudrowa brwi', price: 110 },
  { name: 'Fryzura okolicznościowa', price: 250 },
  { name: 'Makijaż okolicznościowy', price: 250 },
];

const PHYSICAL_FEE = 15; // zł
const MIN_OPEN_AMOUNT = 50; // zł

const formatPLN = (zl: number) => `${zl} zł`;

function GiftCardPageInner() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Step 1
  const [mode, setMode] = useState<'servicio' | 'abierta'>('servicio');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>('');
  const [montoPreset, setMontoPreset] = useState<number | null>(100);
  const [montoCustom, setMontoCustom] = useState<string>('');

  // Step 2
  const [tipoEntrega, setTipoEntrega] = useState<'digital' | 'fisica'>('digital');

  // Step 3
  const [formData, setFormData] = useState({
    nombreComprador: '',
    emailComprador: '',
    telefonoComprador: '',
    nombreDestinatario: '',
    emailDestinatario: '',
    mensaje: '',
  });

  const precioBase = (() => {
    if (mode === 'servicio' && servicioSeleccionado) {
      return servicePrices.find(s => s.name === servicioSeleccionado)?.price ?? 0;
    }
    if (mode === 'abierta') {
      const custom = Number(montoCustom);
      if (custom >= MIN_OPEN_AMOUNT) return custom;
      if (montoPreset) return montoPreset;
    }
    return 0;
  })();

  const precioTotal = precioBase + (tipoEntrega === 'fisica' ? PHYSICAL_FEE : 0);

  const canContinueStep1 = precioBase > 0;

  const canSubmit = !!(
    formData.nombreComprador &&
    formData.emailComprador &&
    formData.telefonoComprador &&
    formData.nombreDestinatario &&
    (tipoEntrega === 'digital' ? formData.emailDestinatario : true)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    try {
      const payload = {
        ...formData,
        servicio: mode === 'servicio' ? servicioSeleccionado : 'open',
        monto: mode === 'abierta' ? precioBase * 100 : undefined,
        tipoEntrega,
      };

      const response = await fetch('/api/giftcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <>
      {/* Header */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 bg-gradient-to-br from-stone-50 to-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <span className="text-xs sm:text-sm font-medium tracking-widest text-stone-500 uppercase">Gift Card</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2 mb-3 sm:mb-4">
            Zamów Gift Card
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Voucher na konkretny zabieg lub otwartą kwotę — digitalny lub fizyczny z odbiorem w salonie.
          </p>

          <div className="flex justify-center gap-x-5 sm:gap-6 gap-y-2 mt-5 sm:mt-6 text-xs sm:text-sm text-stone-500 flex-wrap">
            {['Bezpieczna płatność', 'Natychmiastowe potwierdzenie', 'Ważność 12 miesięcy'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
              {success ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-9 h-9 sm:w-10 sm:h-10 text-green-500" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-3">Gift Card zamówiona!</h2>
              <p className="text-sm sm:text-base text-stone-600 mb-6 max-w-md mx-auto">
                {tipoEntrega === 'digital'
                  ? 'Voucher wysyłamy na e-mail obdarowanej osoby w ciągu kilku minut.'
                  : 'Kartę możesz odebrać w salonie (Rokietnica k. Poznania) w ciągu 24h.'}
              </p>
              <div className="bg-stone-50 rounded-xl p-4 max-w-sm mx-auto mb-6 text-sm text-left">
                <p className="font-medium text-stone-900 mb-1">
                  {mode === 'servicio' ? servicioSeleccionado : `Voucher otwarty ${formatPLN(precioBase)}`}
                </p>
                <p className="text-stone-500">
                  Dla: {formData.nombreDestinatario}
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Wróć na stronę główną
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-rose-500 rounded-full transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-stone-400">
                  <span>1. Voucher</span>
                  <span>2. Dostawa</span>
                  <span>3. Dane i płatność</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* ─── STEP 1: Tipo de Gift Card ─── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-serif text-stone-900 mb-2">Co chcesz podarować?</h2>
                      <p className="text-sm text-stone-500">Wybierz konkretny zabieg lub otwartą kwotę.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 p-1 bg-stone-50 rounded-xl mb-6 max-w-md">
                      <button
                        type="button"
                        onClick={() => setMode('servicio')}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                          mode === 'servicio'
                            ? 'bg-white text-stone-900 shadow-sm'
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                      >
                        Konkretny zabieg
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('abierta')}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                          mode === 'abierta'
                            ? 'bg-white text-stone-900 shadow-sm'
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                      >
                        Otwarta kwota
                      </button>
                    </div>

                    {mode === 'servicio' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {servicePrices.map((s) => (
                          <button
                            key={s.name}
                            type="button"
                            onClick={() => setServicioSeleccionado(s.name)}
                            className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                              servicioSeleccionado === s.name
                                ? 'border-stone-900 bg-stone-50'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <span className="text-sm text-stone-800 min-w-0 pr-3">{s.name}</span>
                            <span className="text-sm font-semibold text-stone-900 shrink-0">
                              {formatPLN(s.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {mode === 'abierta' && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-stone-500 mb-2">Wybierz kwotę:</p>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {[100, 150, 200, 300, 500].map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => {
                                  setMontoPreset(m);
                                  setMontoCustom('');
                                }}
                                className={`py-3 rounded-lg text-sm font-medium border transition-all ${
                                  montoPreset === m && !montoCustom
                                    ? 'border-stone-900 bg-stone-900 text-white'
                                    : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-white'
                                }`}
                              >
                                {formatPLN(m)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-stone-500 mb-1.5">
                            lub wpisz własną kwotę (min. {MIN_OPEN_AMOUNT} zł):
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min={MIN_OPEN_AMOUNT}
                              value={montoCustom}
                              onChange={(e) => {
                                setMontoCustom(e.target.value);
                                if (e.target.value) setMontoPreset(null);
                              }}
                              placeholder="np. 200"
                              className="w-full pl-4 pr-12 py-3 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">zł</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Wstecz
                      </Link>
                      <button
                        type="button"
                        onClick={() => canContinueStep1 && setStep(2)}
                        disabled={!canContinueStep1}
                        className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Dalej
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 2: Tipo de entrega ─── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-serif text-stone-900 mb-2">Jak dostarczyć?</h2>
                      <p className="text-sm text-stone-500">Cyfrowo na e-mail lub fizycznie do odbioru w salonie.</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <button
                        type="button"
                        onClick={() => setTipoEntrega('digital')}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                          tipoEntrega === 'digital'
                            ? 'border-stone-900 bg-stone-50'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          tipoEntrega === 'digital' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'
                        }`}>
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-stone-900">Digitalna (e-mail)</p>
                            <span className="text-sm font-semibold text-green-600">Gratis</span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">Voucher PDF na e-mail w kilka minut po płatności.</p>
                        </div>
                        {tipoEntrega === 'digital' && <CheckCircle className="w-5 h-5 text-stone-900 shrink-0 mt-1" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setTipoEntrega('fisica')}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                          tipoEntrega === 'fisica'
                            ? 'border-stone-900 bg-stone-50'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          tipoEntrega === 'fisica' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'
                        }`}>
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-stone-900">Fizyczna (odbiór w salonie)</p>
                            <span className="text-sm font-semibold text-stone-900">+{formatPLN(PHYSICAL_FEE)}</span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            Piękna karta z kopertą, odbiór w salonie (Rokietnica k. Poznania) w ciągu 24h.
                          </p>
                        </div>
                        {tipoEntrega === 'fisica' && <CheckCircle className="w-5 h-5 text-stone-900 shrink-0 mt-1" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Wstecz
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
                      >
                        Dalej
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: Datos + pago ─── */}
                {step === 3 && (
                  <motion.form
                    key="step3"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-serif text-stone-900 mb-2">Dane i płatność</h2>
                      <p className="text-sm text-stone-500">
                        Wypełnij dane —{' '}
                        {tipoEntrega === 'digital'
                          ? 'voucher wysyłamy na e-mail obdarowanej osoby.'
                          : 'kartę odbierzesz w salonie.'}
                      </p>
                    </div>

                    {/* Resumen */}
                      <div className="bg-stone-50 rounded-xl p-4 mb-6 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-stone-500">
                          {mode === 'servicio' ? servicioSeleccionado : `Voucher otwarty`}
                        </span>
                        <span className="text-stone-900 font-medium">{formatPLN(precioBase)}</span>
                      </div>
                      {tipoEntrega === 'fisica' && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-stone-500">Karta fizyczna</span>
                          <span className="text-stone-900 font-medium">{formatPLN(PHYSICAL_FEE)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                        <span className="font-medium text-stone-900">Razem</span>
                        <span className="font-serif text-xl text-stone-900">{formatPLN(precioTotal)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Twoje dane</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">Imię i nazwisko *</label>
                        <input
                          type="text"
                          required
                          value={formData.nombreComprador}
                          onChange={(e) => setFormData({ ...formData, nombreComprador: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">E-mail *</label>
                        <input
                          type="email"
                          required
                          value={formData.emailComprador}
                          onChange={(e) => setFormData({ ...formData, emailComprador: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={formData.telefonoComprador}
                          onChange={(e) => setFormData({ ...formData, telefonoComprador: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                          placeholder="+48 600 000 000"
                        />
                      </div>

                      <div className="sm:col-span-2 mt-3">
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Dane osoby obdarowanej</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">Imię obdarowanej osoby *</label>
                        <input
                          type="text"
                          required
                          value={formData.nombreDestinatario}
                          onChange={(e) => setFormData({ ...formData, nombreDestinatario: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                          placeholder="Imię osoby obdarowanej"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          E-mail {tipoEntrega === 'digital' ? '*' : '(opcjonalnie)'}
                        </label>
                        <input
                          type="email"
                          required={tipoEntrega === 'digital'}
                          value={formData.emailDestinatario}
                          onChange={(e) => setFormData({ ...formData, emailDestinatario: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm"
                          placeholder={tipoEntrega === 'digital' ? 'email@obdarowanej.com' : 'opcjonalnie'}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          Wiadomość (opcjonalnie)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-100 outline-none transition-all text-sm resize-none"
                          placeholder="Dodaj osobistą wiadomość, która zostanie dołączona do vouchera..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={loading}
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Wstecz
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-rose-500/25"
                      >
                        {loading ? (
                          'Przetwarzanie...'
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            Zapłać {formatPLN(precioTotal)}
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 text-center mt-4">
                      Płatność obsługiwana przez Mercado Pago. Wysyłając formularz, akceptujesz kontakt w sprawie zamówienia.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default function GiftCardPage() {
  return (
    <Suspense fallback={null}>
      <GiftCardPageInner />
    </Suspense>
  );
}
