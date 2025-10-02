import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import { Bodoni_Moda_SC } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
});

const bodoniModaSC = Bodoni_Moda_SC({ 
  subsets: ['latin'],
  variable: '--font-bodoni-moda-sc',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Vanguard Homes - Luxury Custom Home Builder & Remodeler in Texas',
  description: 'Texas premier luxury home builder and remodeler. Crafting architectural excellence with custom homes, renovations, and luxury remodeling services since 2010.',
  keywords: 'luxury homes Texas, custom home builder, home remodeling, renovations, Austin home builder',
  authors: [{ name: 'C&L Innovations', url: 'https://candl-innovations.net' }],
  openGraph: {
    title: 'Vanguard Homes - Luxury Custom Home Builder Texas',
    description: 'Where visionary design meets uncompromising craftsmanship. Creating bespoke luxury homes that define generations.',
    url: 'https://vanguardhomes.com',
    siteName: 'Vanguard Homes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanguard Homes - Luxury Custom Home Builder Texas',
    description: 'Where visionary design meets uncompromising craftsmanship. Creating bespoke luxury homes that define generations.',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${raleway.variable} ${bodoniModaSC.variable} font-sans`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}