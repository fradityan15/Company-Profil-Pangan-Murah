'use client';

import { useAuth } from '@/lib/AuthContext';

export default function BuyerPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Memuat profil...</p>
      </div>
    );
  }

  if (!user || user.role !== 'buyer') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-xl shadow-black/20">
          <h1 className="text-3xl font-black mb-4">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6">Halaman ini khusus untuk pembeli. Silakan masuk dengan akun pembeli untuk melihat dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-4xl border border-white/10 bg-slate-900/85 p-10 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Dashboard Pembeli
              </span>
              <h1 className="mt-6 text-4xl font-black text-white md:text-5xl">Halo, {user.full_name || user.email}!</h1>
              <p className="mt-5 text-slate-300 leading-relaxed text-lg sm:text-xl">
                Temukan penjual terdekat, dapatkan penawaran hemat, dan belanja pangan berkualitas dengan mudah di setiap kunjungan.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/live-data" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
                  Telusuri Katalog
                </a>
                <a href="/map" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-300">
                  Cari Lokasi
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:max-w-md">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Penjual Aktif</p>
                <p className="mt-4 text-4xl font-black text-cyan-300">24+</p>
                <p className="mt-2 text-sm text-slate-400">Partner pilihan siap melayani kebutuhanmu.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Diskon Hari Ini</p>
                <p className="mt-4 text-4xl font-black text-emerald-300">7%</p>
                <p className="mt-2 text-sm text-slate-400">Harga khusus untuk produk pilihan setiap hari.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-4xl border border-white/10 bg-slate-900/85 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
              <span className="text-xl">🔎</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Jelajahi Penjual</h2>
            <p className="text-slate-400 leading-relaxed">Cari penjual berdasarkan lokasi, jenis produk, dan penawaran terbaru agar belanja lebih cepat.</p>
          </article>
          <article className="rounded-4xl border border-white/10 bg-slate-900/85 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/20">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <span className="text-xl">💸</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Penawaran Hemat</h2>
            <p className="text-slate-400 leading-relaxed">Dapatkan paket murah dan stok cadangan untuk kebutuhan harian tanpa mengorbankan kualitas.</p>
          </article>
          <article className="rounded-4xl border border-white/10 bg-slate-900/85 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-blue-400/20">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <span className="text-xl">⚡</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Akses Cepat</h2>
            <p className="text-slate-400 leading-relaxed">Simpan penjual favorit dan kembali ke penawaran sebelumnya dengan lebih mudah.</p>
          </article>
        </section>

        <section className="rounded-4xl border border-white/10 bg-slate-900/85 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Rekomendasi</p>
              <h2 className="mt-4 text-3xl font-black text-white">Pilihan paling populer untuk pembeli</h2>
            </div>
            <a href="/live-data" className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300 lg:w-auto">
              Lihat Semua Penawaran
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
