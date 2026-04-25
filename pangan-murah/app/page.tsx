import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-full flex-col px-6 py-28 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex flex-col items-center text-center animate-fade-in space-y-10">
          <span className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-xs uppercase tracking-[0.35em] text-slate-300 shadow-xl shadow-slate-950/20 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            12 titik penyelamatan baru di seluruh Indonesia
          </span>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
            Makan Enak, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Hemat Kantong.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
            Temukan makanan surplus berkualitas dengan harga murah sambil membantu mengurangi limbah pangan. Aksi kecilmu berarti manfaat besar bagi komunitas dan lingkungan.
          </p>

          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link href="/map" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-10 py-5 text-base font-black text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_20px_60px_-30px_rgba(16,185,129,0.8)] hover:scale-105 active:scale-95">
              🚀 Mulai Berburu Makanan
            </Link>
            <Link href="/live-data" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-10 py-5 text-base font-black text-slate-100 transition-all duration-300 hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:scale-105">
              📊 Lihat Katalog Live
            </Link>
          </div>
        </div>

        <section className="mt-24 grid gap-8 md:grid-cols-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
          {[
            { label: 'Mystery Bag', icon: '🛍️', desc: 'Paket kejutan dengan roti, kue, dan camilan premium.', color: 'from-purple-500 to-pink-500' },
            { label: 'Porsi Resto', icon: '🍱', desc: 'Makanan berat dari resto dan warung dengan diskon besar.', color: 'from-orange-500 to-red-500' },
            { label: 'Bahan Segar', icon: '🥗', desc: 'Sayur, buah, dan bahan masak segar siap diolah.', color: 'from-green-500 to-emerald-500' },
          ].map((item, index) => (
            <article key={item.label} className="glass-card group flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: `${0.8 + index * 0.2}s`}}>
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{item.desc}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-24 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-800/70 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.9)] animate-fade-in" style={{animationDelay: '1.4s'}}>
          <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Kenapa Pangan Murah?</p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl leading-tight">
                Solusi hemat saat kamu butuh <span className="text-emerald-400">makanan cepat saji</span>.
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p className="leading-8 text-base">Cari paket siap ambil dekatmu, pilih penjual terpercaya, dan bantu lingkungan sekaligus isi perut.</p>
              <p className="font-semibold text-emerald-300 flex items-center gap-3 text-lg">
                <span>⚡</span> Lebih cepat. Lebih murah. Lebih bertanggung jawab.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 animate-fade-in" style={{animationDelay: '1.6s'}}>
          {[
            { number: '12K+', label: 'Paket Diselamatkan', icon: '📦' },
            { number: '500+', label: 'Mitra UMKM', icon: '🤝' },
            { number: '98%', label: 'Kepuasan Pengguna', icon: '⭐' },
            { number: '2.5T', label: 'CO2 Terhindar', icon: '🌱' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300" style={{animationDelay: `${1.8 + index * 0.1}s`}}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-emerald-400 mb-1">{stat.number}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}