'use client';

import { useAuth } from '@/lib/AuthContext';

export default function BuyerPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-500"></div>
          <p className="text-sm font-medium tracking-widest text-slate-400 uppercase">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'buyer') {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-100 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-lg w-full rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">Halaman ini eksklusif untuk pembeli. Silakan masuk dengan identitas pembeli untuk mengakses katalog dan penawaran.</p>
          <a href="/login" className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold transition hover:bg-slate-200">
            Menuju Halaman Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 px-6 py-20 relative overflow-hidden selection:bg-cyan-500/30">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-10 md:p-14 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Dashboard Pembeli
              </span>
              <h1 className="mt-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 md:text-6xl tracking-tight leading-tight">
                Halo, {user.full_name?.split(' ')[0] || user.email.split('@')[0]}!
              </h1>
              <p className="mt-5 text-slate-400 leading-relaxed text-lg font-light max-w-xl">
                Temukan penjual terdekat, dapatkan penawaran super hemat, dan penuhi kebutuhan pangan berkualitas Anda dengan cerdas hari ini.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/live-data" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-bold text-slate-950 transition-transform hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative flex items-center gap-2">
                    Telusuri Katalog
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </a>
                <a href="/map" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Cari Lokasi
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:w-[400px] shrink-0">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/20 blur-2xl rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-slate-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Penjual Aktif</span>
                  </div>
                  <p className="text-4xl font-black text-white">24<span className="text-cyan-400">+</span></p>
                  <p className="mt-2 text-xs text-slate-500 font-light">Partner siap melayani.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-slate-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Diskon Hari Ini</span>
                  </div>
                  <p className="text-4xl font-black text-white">7<span className="text-emerald-400">%</span></p>
                  <p className="mt-2 text-xs text-slate-500 font-light">Harga khusus terbaik.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-inner shadow-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Jelajahi Penjual</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Cari penjual berdasarkan lokasi, jenis produk, dan penawaran terbaru agar belanja lebih cepat.</p>
            </div>
          </article>
          
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 shadow-inner shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Penawaran Hemat</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Dapatkan paket murah dan stok cadangan untuk kebutuhan harian tanpa mengorbankan kualitas.</p>
            </div>
          </article>
          
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 shadow-inner shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Akses Cepat</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Simpan penjual favorit dan kembali ke penawaran sebelumnya dengan fitur peta terintegrasi.</p>
            </div>
          </article>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]/80 p-10 md:p-12 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-cyan-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rekomendasi Utama</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Eksplorasi penawaran terpopuler</h2>
            <p className="mt-2 text-slate-400 font-light">Produk segar dengan harga terbaik dari mitra tepercaya kami.</p>
          </div>
          
          <a href="/live-data" className="relative z-10 w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition hover:bg-slate-200">
            Lihat Semua Penawaran
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </section>
      </div>
    </div>
  );
}
