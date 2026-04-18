'use client';

import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ReactLenis } from 'lenis/react';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          <ReactLenis root>
            <div className="app-wrapper flex flex-col" style={{ minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
            </div>
          </ReactLenis>
        </AuthProvider>
      </body>
    </html>
  );
}
