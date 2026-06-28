import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image src="/logovaliente.webp" alt="Valiente" width={120} height={40} className="h-10 sm:h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Naturalne piękno. Realne efekty. Kameralne studio urody premium w sercu Warszawy.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://www.instagram.com/valienteestudiodebelleza/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://www.facebook.com/p/Valiente-Estudio-de-Belleza-61587077702119/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://www.youtube.com/playlist?list=PLXzSMlGeO0vt4WxgUdqSYkPG6d6teTBp8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://share.google/VTPf29WQjzm5UF4id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
                aria-label="Google Business"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6">Nawigacja</h4>
            <ul className="space-y-2 sm:space-y-3 text-stone-400 text-sm">
              {[
                { label: 'Strona główna', href: '/' },
                { label: 'Usługi', href: '/servicios' },
                { label: 'Blog', href: '/blog' },
                { label: 'O nas', href: '/nosotros' },
                { label: 'Galeria', href: '/galeria' },
                { label: 'Kontakt', href: '/contacto' },
                { label: 'Rezerwacje', href: '/reservas' },
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
              <li>Oczyszczanie głębokie</li>
              <li>Mikronakłuwanie</li>
              <li>Laminacja rzęs</li>
              <li>Laminacja brwi</li>
              <li>Mikropigmentacja</li>
              <li>Masaże</li>
              <li>Makijaż</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6">Kontakt</h4>
            <ul className="space-y-3 sm:space-y-4 text-stone-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>ul. Mokotowska 12<br />00-561 Warszawa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+48226001234" className="hover:text-white transition-colors">+48 22 600 12 34</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:hola@valientebelleza.com.pl" className="hover:text-white transition-colors text-xs sm:text-sm">hola@valientebelleza.com.pl</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between text-stone-500 text-xs sm:text-sm gap-2">
          <p>© {new Date().getFullYear()} Valiente Studio Urody</p>
          <p>Warszawa</p>
        </div>
      </div>
    </footer>
  );
}