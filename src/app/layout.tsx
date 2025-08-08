import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';

export const metadata: Metadata = {
  title: 'Sonidos Selectos | Portfolio de DJ',
  description: 'Portfolio de DJ, musica, eventos y mas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground flex flex-col">
        <AppHeader />
        <main className="flex-grow">
          {children}
        </main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}
