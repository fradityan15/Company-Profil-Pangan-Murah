import './globals.css'
import Link from 'next/link'
import React from 'react'

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
        <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform">
              Pangan<span className="text-emerald-500 italic">Murah</span>
            </Link>

            {/* Navigasi Desktop */}
            <div className="hidden md:flex gap-10 items-center text-sm font-extrabold uppercase tracking-widest">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
              <Link href="/live-data" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Live Data
              </Link>
              <Link href="/map" className="bg-emerald-600 px-6 py-2.5 rounded-xl text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                Cari Lokasi
              </Link>
            </div>

            {/* Indikator Mobile (Opsional) */}
            <div className="md:hidden">
               <span className="text-emerald-500">☰</span>
            </div>
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
              <div className="text-2xl font-black mb-6">Pangan<span className="text-emerald-500">Murah</span></div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Membantu warga Cipatat mendapatkan makanan berkualitas dengan harga hemat sambil mengurangi limbah lingkungan.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-2">Navigasi Jalur Cepat</h4>
              <Link href="/about" className="text-sm text-slate-500 hover:text-emerald-400 transition">Tentang Gerakan Kami</Link>
              <Link href="/live-data" className="text-sm text-slate-500 hover:text-emerald-400 transition">Katalog Pangan Live</Link>
              <Link href="/map" className="text-sm text-slate-500 hover:text-emerald-400 transition">Peta Mitra Terdekat</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-2">Hubungi Kami</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Jl. Raya Cipatat, Kab. Bandung Barat<br />
                Jawa Barat, Indonesia
              </p>
              <div className="flex gap-4 mt-2">
                {/* Placeholder icon social media */}
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/50 transition cursor-pointer"></div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/50 transition cursor-pointer"></div>
              </div>
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