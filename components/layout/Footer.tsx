import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16 safe-bottom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4 sm:gap-5 mb-6">
              <Link href="/" className="inline-block shrink-0">
                <img src="/logo.webp" alt="Beauty By Nat" className="h-12 sm:h-16 w-auto brightness-0 invert" />
              </Link>
              <p className="text-stone-400 text-sm leading-relaxed">
                Rzęsy, brwi, fryzury i makijaż w Rokietnicy k. Poznania. Naturalnie · Glam · Okolicznościowo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/beautybynatnataliadominiak/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Booksy */}
              <a
                href="https://beautybynatnataliadominiak.booksy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors overflow-hidden"
                aria-label="Booksy"
              >
                <img
                  src="/booksy.png"
                  alt="Booksy"
                  className="w-[130%] h-[130%] max-w-none object-contain"
                />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/BeautybynatNataliaKedziora/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@beautybynathaliedominiak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.62a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-1.05z"/>
                </svg>
              </a>

              {/* Google Maps */}
              <a
                href="https://maps.app.goo.gl/AojaBzcgk6LXR7zm9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6">Nawigacja</h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              {[
                { label: 'Strona główna', href: '/' },
                { label: 'Usługi', href: '/uslugi' },
                { label: 'Blog', href: '/blog' },
                { label: 'O nas', href: '/o-nas' },
                { label: 'Galeria', href: '/galeria' },
                { label: 'Kontakt', href: '/kontakt' },
                { label: 'Rezerwacje', href: '/rezerwacje' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6">Usługi</h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              <li>Przedłużanie rzęs 1:1</li>
              <li>Volume Light / Medium / Mega</li>
              <li>Efekt Kim Kardashian i Eyeliner</li>
              <li>Laminacja i geometria brwi</li>
              <li>Henna rzęs i brwi</li>
              <li>Fryzury okolicznościowe</li>
              <li>Makijaż na wydarzenia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6">Kontakt</h4>
            <ul className="space-y-3 sm:space-y-4 text-stone-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>ul. Kasztanowa 1A<br />62-090 Rokietnica</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+48600000000" className="hover:text-white transition-colors">+48 600 000 000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:nat@beautybynat.pl" className="hover:text-white transition-colors text-xs sm:text-sm">nat@beautybynat.pl</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 sm:mt-10 md:mt-12 pt-5 sm:pt-6 md:pt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center text-stone-500 text-xs sm:text-sm gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Beauty By Nat · Natalia Dominiak</p>
          <a
            href="https://seogrow.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-stone-500"
            aria-label="Designed by SeoGrow"
          >
            <span>Designed by</span>
            <img src="/logoseogrow.webp" alt="SeoGrow" className="h-5 w-auto" />
          </a>
          <p>Rokietnica / Poznań</p>
        </div>
      </div>
    </footer>
  );
}