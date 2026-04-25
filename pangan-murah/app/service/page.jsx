import Link from 'next/link';

export default function Service() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_30%)]" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <section className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center pb-20 border-b border-white/10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight animate-pop-in animate-pop-in-delay-1">
                Solusi Lengkap untuk <span className="text-amber-400">Pangan Berkelanjutan</span>.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl animate-pop-in animate-pop-in-delay-2">
                Kami menyediakan platform komprehensif yang menghubungkan surplus makanan berkualitas dengan konsumen yang membutuhkan, sambil mendukung UMKM lokal dan mengurangi limbah pangan.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 animate-pop-in animate-pop-in-delay-3">
              <Link href="/live-data" className="inline-flex items-center justify-center rounded-full bg-amber-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-amber-400 hover:scale-105">
                Jelajahi Katalog
              </Link>
              <Link href="/map" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-10 py-4 text-base font-black text-slate-100 transition-all duration-300 hover:border-slate-400 hover:text-slate-300 hover:bg-slate-500/10 hover:scale-105">
                Cari Lokasi
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-card rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30 animate-pop-in-right animate-pop-in-delay-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white animate-pop-in-up">Platform Utama</p>
              <div className="mt-8 grid gap-5">
                {[
                  { value: '500+', label: 'Mitra UMKM' },
                  { value: '12K+', label: 'Paket Terselamatkan' },
                ].map((item, index) => (
                  <div key={item.label} className="rounded-3xl bg-cyan-900/80 p-5 animate-pop-in-bounce animate-pop-in-delay-2">
                    <p className="text-3xl font-black text-white animate-pop-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400 animate-pop-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-4xl border border-white/10 bg-linear-to-br from-slate-900/80 to-slate-800/80 p-8 shadow-xl shadow-slate-950/30 animate-pop-in-right animate-pop-in-delay-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white animate-pop-in-up">Komitmen Layanan</p>
              <h2 className="mt-6 text-3xl font-black text-white leading-tight animate-pop-in-up animate-pop-in-delay-1">Kualitas, kecepatan, dan keberlanjutan dalam setiap layanan.</h2>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            { title: 'Platform Digital', desc: 'Aplikasi web modern untuk pencarian dan pemesanan makanan surplus dengan mudah dan cepat.', icon: '💻', features: ['Pencarian Real-time', 'Pembayaran Aman', 'Tracking Pesanan'] },
            { title: 'Kemitraan UMKM', desc: 'Dukungan penuh untuk UMKM lokal dalam mengelola surplus makanan dan memperluas jangkauan pasar.', icon: '🤝', features: ['Onboarding Gratis', 'Dashboard Mitra', 'Dukungan Marketing'] },
            { title: 'Logistik & Distribusi', desc: 'Sistem pengiriman efisien untuk memastikan makanan sampai dalam kondisi prima ke pelanggan.', icon: '🚚', features: ['Pengiriman Cepat', 'Tracking Real-time', 'Packaging Aman'] },
          ].map((item, index) => (
            <div key={item.title} className={`glass-card rounded-4xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-pop-in animate-pop-in-delay-${index + 1}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-500 to-cyan-500 text-2xl text-white mb-6 animate-pop-in-bounce" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 animate-pop-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>{item.title}</h3>
              <p className="text-slate-400 leading-8 mb-6 animate-pop-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>{item.desc}</p>
              <div className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-300 animate-pop-in-left" style={{animationDelay: `${0.5 + index * 0.1 + featureIndex * 0.05}s`}}>
                    <span className="text-amber-400">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-2 items-start border-t border-white/10 pt-20">
          <div className="space-y-6 animate-pop-in-left">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 animate-pop-in-up">Proses Layanan</p>
            <h2 className="text-4xl font-black text-white leading-tight animate-pop-in-up animate-pop-in-delay-1">Cara Kerja Platform Kami</h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-400 animate-pop-in-up animate-pop-in-delay-2">
              Sistem kami dirancang untuk kemudahan pengguna, mulai dari pencarian hingga pengiriman. Setiap langkah dioptimalkan untuk pengalaman terbaik.
            </p>
          </div>
          <div className="grid gap-6 animate-pop-in-right animate-pop-in-delay-1">
            {[
              { step: '01', title: 'Pilih Kategori', desc: 'Jelajahi berbagai kategori makanan surplus dari mitra terpercaya.', color: 'from-blue-500 to-indigo-500' },
              { step: '02', title: 'Pesan & Bayar', desc: 'Lakukan pemesanan dengan sistem pembayaran yang aman dan terenkripsi.', color: 'from-purple-500 to-pink-500' },
              { step: '03', title: 'Pickup/Delivery', desc: 'Pilih opsi pengambilan sendiri atau pengiriman langsung ke lokasi Anda.', color: 'from-orange-500 to-rose-500' },
              { step: '04', title: 'Nikmati & Ulas', desc: 'Rasakan kualitas makanan dan berikan ulasan untuk membantu komunitas.', color: 'from-purple-500 to-pink-500' },
            ].map((item, index) => (
              <div key={item.title} className={`glass-card rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30 animate-pop-in animate-pop-in-delay-${index + 2}`}>
                <div className="flex items-center gap-4">
                  <div className={`inline-flex items-center justify-center rounded-3xl bg-linear-to-br ${item.color} px-4 py-2 text-white text-sm font-black min-w-12 animate-pop-in-bounce`} style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1 animate-pop-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-6 animate-pop-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 animate-fade-in">
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { icon: '⚡', title: 'Cepat', detail: 'Proses pemesanan dalam hitungan menit' },
              { icon: '🛡️', title: 'Aman', detail: 'Standar keamanan pangan terjamin' },
              { icon: '💚', title: 'Ramah Lingkungan', detail: 'Mengurangi limbah pangan secara signifikan' },
              { icon: '🤝', title: 'Berkelanjutan', detail: 'Mendukung UMKM lokal dan ekonomi' },
            ].map((item, index) => (
              <div key={item.title} className={`glass-card rounded-4xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-slate-950/30 animate-pop-in animate-pop-in-delay-${index + 3}`}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-2xl text-purple-400 animate-pop-in-bounce" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 animate-pop-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>{item.title}</h3>
                <p className="text-slate-400 leading-6 text-sm animate-pop-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-4xl border border-white/10 bg-linear-to-br from-slate-900/80 to-slate-800/80 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.9)] animate-pop-in animate-pop-in-delay-1">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 animate-pop-in-left">Siap Menggunakan Layanan?</p>
              <h2 className="mt-4 text-4xl font-black text-white leading-tight animate-pop-in-up animate-pop-in-delay-1">Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat platform kami.</h2>
            </div>
            <div className="space-y-4 text-slate-300 animate-pop-in-right animate-pop-in-delay-1">
              <p className="leading-8 animate-pop-in-up animate-pop-in-delay-2">Daftar sekarang dan dapatkan akses penuh ke semua fitur platform Pangan Murah. Mulai langkah Anda menuju konsumsi yang lebih hemat dan berkelanjutan.</p>
              <Link href="/live-data" className="inline-flex items-center justify-center rounded-full bg-amber-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-amber-400 hover:scale-105 animate-pop-in-bounce animate-pop-in-delay-3">
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}