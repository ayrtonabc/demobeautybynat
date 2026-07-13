'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Strona główna' },
  { href: '/uslugi', label: 'Usługi' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-nas', label: 'O nas' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center py-0.5 shrink-0">
            <img src="/logo.webp" alt="Beauty By Nat" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-300 ${
                  pathname === link.href ? 'text-stone-900 font-medium' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+48600000000" className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors">
              <Phone className="w-4 h-4" />
              +48 600 000 000
            </a>
            <Link
              href="/rezerwacje"
              className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-all duration-300"
            >
              Zarezerwuj
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 -mr-2 text-stone-900 touch-target flex items-center justify-center"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — slide-down from top, no full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-14 sm:top-16 z-[99] bg-white border-b border-stone-200 shadow-lg max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto safe-bottom"
          >
            <nav className="flex flex-col px-5 sm:px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-3.5 border-b border-stone-100 text-base ${
                      pathname === link.href
                        ? 'text-stone-900 font-semibold'
                        : 'text-stone-700 font-medium'
                    }`}
                  >
                    <span>{link.label}</span>
                    {pathname === link.href && (
                      <span className="text-xs text-stone-400">●</span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-5 space-y-3">
                <a
                  href="tel:+48600000000"
                  className="flex items-center justify-center gap-2 w-full border border-stone-200 text-stone-900 py-3.5 rounded-full text-sm font-medium hover:bg-stone-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Llámanos: +48 600 000 000
                </a>
                <Link
                  href="/rezerwacje"
                  className="flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-3.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
                >
                  Zarezerwuj wizytę
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
