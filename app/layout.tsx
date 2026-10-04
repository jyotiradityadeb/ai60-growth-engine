import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

export const metadata: Metadata = {
  title: 'AI60 Growth Engine | Build Your First AI Project in 60 Minutes',
  description: 'NxtWave Growth Challenge Round 1 Submission. Viral acquisition & attribution system for engineering students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#06090e] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <MobileStickyCTA />
        <Footer />
      </body>
    </html>
  );
}
