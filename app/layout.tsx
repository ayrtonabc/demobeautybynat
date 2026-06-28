import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/effects/LoadingScreen';
import FloatingWhatsApp from '@/components/effects/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Valiente Studio Urody | Premium Beauty & Estetyka w Warszawie',
  description:
    'Valiente — kameralne studio urody w Warszawie. Profesjonalne zabiegi pielęgnacyjne dla kobiet i mężczyzn: oczyszczanie twarzy, mikronakłuwanie, laminacja rzęs, makijaż, masaże i więcej.',
  keywords:
    'studio urody Warszawa, estetyka Warszawa, beauty premium, zabiegi na twarz, mikronakłuwanie, laminacja rzęs, laminacja brwi, makijaż, masaże, oczyszczanie twarzy, mikropigmentacja',
  authors: [{ name: 'Valiente Studio Urody' }],
  creator: 'Valiente Studio Urody',
  publisher: 'Valiente Studio Urody',
  metadataBase: new URL('https://valientebelleza.com.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://valientebelleza.com.pl',
    title: 'Valiente Studio Urody | Premium Beauty & Estetyka w Warszawie',
    description:
      'Kameralne studio urody w Warszawie. Profesjonalne zabiegi pielęgnacyjne dla kobiet i mężczyzn.',
    siteName: 'Valiente Studio Urody',
    images: [
      {
        url: '/logovaliente.webp',
        width: 1200,
        height: 630,
        alt: 'Valiente Studio Urody',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valiente Studio Urody | Premium Beauty & Estetyka w Warszawie',
    description: 'Kameralne studio urody w Warszawie. Profesjonalne zabiegi pielęgnacyjne dla kobiet i mężczyzn.',
    images: ['/logovaliente.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-white text-black font-sans antialiased">
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
