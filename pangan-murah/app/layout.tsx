import './globals.css'
import Link from 'next/link'
import React from 'react'
import MobileMenu from '../components/MobileMenu'

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
        
        {/* --- GLOBAL HEADER --- */}
        <nav className="sticky top-0 z-[100] w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex h-20 items-center justify-between gap-6 px-6">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white transition-transform hover:scale-105">
              Pangan<span className="text-amber-400 italic">Murah</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.22em] text-slate-300">
              <Link href="/" className="transition-colors hover:text-amber-400">Home</Link>
              <Link href="/about" className="transition-colors hover:text-amber-400">About</Link>
              <Link href="/service" className="transition-colors hover:text-amber-400">Service</Link>
              <Link href="/live-data" className="inline-flex items-center gap-2 transition-colors hover:text-amber-400">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                Katalog
              </Link>
              <Link href="/contact" className="transition-colors hover:text-amber-400">Contact</Link>
            </div>

            <div className="hidden md:block">
              <Link href="/map" className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-black text-slate-950 transition hover:bg-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]">
                Cari Lokasi
              </Link>
            </div>

            <MobileMenu />
          </div>
        </nav>

        {/* --- ISI HALAMAN --- */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="border-t border-white/5 bg-[#010409] py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-2xl font-black mb-6">Pangan<span className="text-amber-500">Murah</span></div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Membantu warga Cipatat mendapatkan makanan berkualitas dengan harga hemat sambil mengurangi limbah lingkungan.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-2">Navigasi Jalur Cepat</h4>
              <Link href="/about" className="text-sm text-slate-500 hover:text-amber-400 transition">Tentang Gerakan Kami</Link>
              <Link href="/service" className="text-sm text-slate-500 hover:text-amber-400 transition">Layanan Kami</Link>
              <Link href="/live-data" className="text-sm text-slate-500 hover:text-amber-400 transition">Katalog</Link>
              <Link href="/map" className="text-sm text-slate-500 hover:text-amber-400 transition">Peta Mitra Terdekat</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-2">Hubungi Kami</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bandung<br />
                Jawa Barat, Indonesia
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
            <p>© 2026 PANGAN MURAH • PROJECT SISTEM INFORMASI</p>
            <p className="text-slate-700">DIBUAT DENGAN ❤️ DI INDONESIA</p>
          </div>
        </footer>

      </body>
    </html>
  )
}