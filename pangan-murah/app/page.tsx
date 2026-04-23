import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] text-slate-200 overflow-x-hidden font-sans">
      
      {/* 1. Background Decor (Glow Effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
        
        {/* Badge Info - Update Lokasi Cipatat */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-sm shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">12 Titik Penyelamatan Baru di Seluruh Indonesia</span>
        </div>

        {/* Hero Content */}
        <section className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-white">
            Makan Enak <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent italic">
              Hemat Kantong.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Hentikan <span className="text-white font-semibold">food waste</span> hari ini. Temukan ribuan paket makanan surplus berkualitas dengan harga yang jauh lebih murah.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <Link href="/map" className="px-10 py-5 bg-green-600 rounded-2xl font-black text-white hover:bg-green-500 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-900/30 text-center">
              Mulai Berburu Makanan
            </Link>
            <Link href="/live-data" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-white hover:bg-white/10 transition-all text-center">
               Lihat Katalog Live
            </Link>
          </div>
        </section>

        {/* Featured Section (Card Grid) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Mystery Bag', icon: '🛍️', desc: 'Paket kejutan berisi aneka roti dan kue segar.' },
            { label: 'Porsi Resto', icon: '🍱', desc: 'Makanan berat kualitas restoran diskon 50%++.' },
            { label: 'Bahan Segar', icon: '🥗', desc: 'Sayur dan buah surplus layak konsumsi.' },
          ].map((item, i) => (
            <div key={i} className="group bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-green-500/50 transition-all">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-500 transition">{item.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}