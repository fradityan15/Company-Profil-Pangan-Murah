import './globals.css'
import React from 'react'
import { AuthProvider } from '../lib/AuthContext'
import Header from '../components/Header'

export const metadata = {
  title: 'Pangan Murah | Penyelamat Makanan Indonesia',
  description: 'Marketplace makanan surplus nomor 1 di Indonesia. Hemat uang, selamatkan bumi.',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-[#020617] text-slate-200 font-sans min-h-screen flex flex-col antialiased">
        <AuthProvider>
          {/* --- GLOBAL HEADER --- */}
          <Header />

          {/* --- ISI HALAMAN --- */}
          <main className="flex-grow">
            {children}
          </main>

          {/* --- GLOBAL FOOTER --- */}
          <footer className="border-t border-white/5 bg-[#010409] py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-2xl font-black">Pangan<span className="text-green-400">Murah</span></div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                  Mendukung pembeli dan penjual dengan solusi pangan hemat serta berkelanjutan di Indonesia.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <a href="/live-data" className="transition hover:text-slate-300">Katalog</a>
                <a href="/map" className="transition hover:text-slate-300">Peta</a>
                <a href="/about" className="transition hover:text-slate-300">Tentang</a>
                <a href="/contact" className="transition hover:text-slate-300">Kontak</a>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10 border-t border-white/5 pt-6 text-center text-[11px] uppercase tracking-[0.3em] text-slate-600">
              © 2026 Pangan Murah • Semua hak cipta dilindungi
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
