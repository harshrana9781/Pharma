import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PharmaPlus | Modern Pharmacy & Healthcare',
  description: 'Your trusted partner in healthcare, providing medicines and wellness products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`} suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Toaster position="bottom-right" />
        <Chatbot />
      </body>
    </html>
  );
}
