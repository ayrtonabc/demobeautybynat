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
  title: 'Beauty By Nat · Natalia Dominiak | Rzęsy, brwi, fryzury i makijaż w Rokietnicy',
  description:
    'Beauty By Nat — studio urody Natalii Dominiak w Rokietnicy k. Poznania. Przedłużanie i stylizacja rzęs, laminacja i geometria brwi, fryzury okolicznościowe oraz makijaż na wydarzenia. Efekt WOW bez przerysowania.',
  keywords:
    'rzęsy Rokietnica, przedłużanie rzęs Poznań, laminacja brwi Rokietnica, fryzury okolicznościowe Poznań, makijaż okolicznościowy Rokietnica, Beauty By Nat, Natalia Dominiak, salon urody Rokietnica',
  authors: [{ name: 'Beauty By Nat - Natalia Dominiak' }],
  creator: 'Beauty By Nat - Natalia Dominiak',
  publisher: 'Beauty By Nat - Natalia Dominiak',
  metadataBase: new URL('https://beautybynat.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://beautybynat.pl',
    title: 'Beauty By Nat · Natalia Dominiak | Rzęsy, brwi, fryzury i makijaż w Rokietnicy',
    description:
      'Studio urody w Rokietnicy k. Poznania. Przedłużanie rzęs, stylizacja brwi, fryzury okolicznościowe i makijaż.',
    siteName: 'Beauty By Nat',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Beauty By Nat - Natalia Dominiak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty By Nat · Natalia Dominiak | Rzęsy, brwi, fryzury i makijaż w Rokietnicy',
    description: 'Studio urody w Rokietnicy k. Poznania. Przedłużanie rzęs, stylizacja brwi, fryzury okolicznościowe i makijaż.',
    images: ['/logo.webp'],
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
