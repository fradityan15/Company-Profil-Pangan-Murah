import Link from 'next/link';

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),transparent_30%)]" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <section className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center pb-20 border-b border-white/10">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
              Profil Perusahaan • Pangan Murah
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
                Memimpin Gerakan <span className="text-emerald-400">Pangan Terjangkau</span> dengan dampak sosial nyata.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
                Kami membantu menghubungkan produk makanan berkualitas dengan pelanggan setia, menurunkan limbah pangan, dan memperkuat ekonomi lokal. Perjalanan kami adalah tentang kualitas, transparansi, dan keberlanjutan.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/map" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-105">
                Lihat Mitra
              </Link>
              <Link href="/live-data" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-10 py-4 text-base font-black text-slate-100 transition-all duration-300 hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:scale-105">
                Lihat Data Live
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-card rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Statistik Kunci</p>
              <div className="mt-8 grid gap-5">
                {[
                  { value: '12K+', label: 'Paket Diselamatkan' },
                  { value: '500+', label: 'Mitra UMKM' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-900/80 p-5">
                    <p className="text-3xl font-black text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 shadow-xl shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Komitmen Kami</p>
              <h2 className="mt-6 text-3xl font-black text-white leading-tight">Transparan, adil, dan berdampak untuk komunitas lokal.</h2>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            { title: 'Visi', desc: 'Indonesia bebas limbah pangan dengan akses pangan yang lebih merata.', icon: '🌟' },
            { title: 'Misi', desc: 'Menghubungkan makanan surplus berkualitas dengan konsumen yang memerlukan.', icon: '🤝' },
            { title: 'Nilai', desc: 'Praktis, lokal, dan berkelanjutan dalam setiap transaksi.', icon: '🌱' },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl text-white mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-8">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-2 items-start border-t border-white/10 pt-20">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Layanan Kami</p>
            <h2 className="text-4xl font-black text-white leading-tight">Solusi yang dirancang untuk pasar lokal dan kebutuhan masyarakat.</h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              Kami menyediakan platform yang mudah digunakan untuk menemukan penawaran makanan hemat sekaligus membantu penjual mengurangi limbah. Setiap produk terverifikasi dan tersedia dalam radius terdekat untuk kenyamanan Anda.
            </p>
          </div>
          <div className="grid gap-6">
            {[
              { title: 'Platform Mitra', desc: 'Peta lokasi, daftar penjual, dan paket harian siap ambil dalam satu tampilan.', color: 'from-blue-500 to-indigo-500' },
              { title: 'Penawaran Cepat', desc: 'Promo dinamis setiap hari sesuai stok dan waktu terbaik.', color: 'from-emerald-500 to-teal-500' },
              { title: 'Dukungan Lokasi', desc: 'Kemitraan dengan UMKM lokal untuk jaringan pangan yang lebih kuat.', color: 'from-orange-500 to-rose-500' },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30">
                <div className={`inline-flex items-center gap-3 rounded-3xl bg-gradient-to-br ${item.color} px-4 py-3 text-white text-sm font-semibold mb-4`}>
                  {item.title}
                </div>
                <p className="text-slate-400 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 animate-fade-in">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: '📍', title: 'Indonesia', detail: 'Berdiri di lokal, berdampak nasional' },
              { icon: '⚡', title: 'Responsif', detail: 'Update cepat untuk stok dan promosi' },
              { icon: '💚', title: 'Berkelanjutan', detail: 'Solusi rendah limbah dalam setiap transaksi' },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-slate-950/30">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-3xl text-emerald-400">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.9)]">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Bersama untuk perubahan</p>
              <h2 className="mt-4 text-4xl font-black text-white leading-tight">Berkolaborasi dengan komunitas, UMKM, dan pelanggan untuk masa depan pangan yang lebih baik.</h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p className="leading-8">Kami percaya setiap transaksi adalah kesempatan untuk membantu sesama dan menggerakkan ekonomi yang lebih sehat. Mari bertumbuh bersama melalui platform yang transparan dan penuh empati.</p>
              <Link href="/map" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-105">
                Jelajahi Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
