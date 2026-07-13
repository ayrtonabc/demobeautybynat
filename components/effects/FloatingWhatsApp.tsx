'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-3 safe-bottom">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl p-5 w-72 border border-slate-100"
          >
            <p className="font-semibold text-slate-900 mb-1">Porozmawiajmy?</p>
            <p className="text-slate-600 text-sm mb-4">
              Napisz na WhatsApp, odpowiemy od razu.
            </p>
            <a
              href="https://wa.me/48600000000?text=Cześć!%20Chciałabym%20dowiedzieć%20się%20więcej%20o%20usługach%20Beauty%20By%20Nat."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Otwórz WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
