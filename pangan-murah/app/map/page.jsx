import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
              Peta <span className="text-gradient text-amber-400 animate-pulse">Penyelamatan</span>
            </h1>
            <p className="text-slate-400">Temukan titik penyelamatan makanan terdekat</p>
          </div>
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-white transition-colors hover:scale-105 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span>←</span> Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Simulasi Area Peta */}
          <div className="lg:col-span-2 h-80 sm:h-[420px] glass-card rounded-[2.5rem] border border-white/5 relative overflow-hidden flex items-center justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_30%)]"></div>
             <div className="relative z-10 text-center p-8 sm:p-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-bounce">
                  📍
                </div>
                <p className="font-bold text-white text-lg sm:text-xl mb-2">Mencari titik terdekat...</p>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">Sistem kami sedang memindai lokasi penyelamatan aktif di sekitar Anda</p>

                {/* Loading Animation */}
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
             </div>
          </div>

          {/* Daftar Toko Terdekat */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Tersedia Sekarang</h3>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">3 lokasi</span>
            </div>

            {[
              { name: 'Bakery Indah', dist: '0.8 km', stock: '5 Bag', rating: 4.8, time: 'Buka sampai 20:00', icon: '🥖' },
              { name: 'Warung Barokah', dist: '1.2 km', stock: '2 Porsi', rating: 4.6, time: 'Buka sampai 22:00', icon: '🍜' },
              { name: 'Fruit Fresh', dist: '2.5 km', stock: '8 Pack', rating: 4.9, time: 'Buka sampai 18:00', icon: '🍎' },
            ].map((shop, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl hover:border-amber-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{animationDelay: `${0.6 + index * 0.2}s`}}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-500 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      {shop.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors duration-300">{shop.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">⭐ {shop.rating}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{shop.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-md font-black uppercase tracking-widest">
                    {shop.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-amber-400">📍</span> {shop.dist} dari lokasimu
                  </p>
                  <button className="text-xs bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-bold hover:bg-amber-400 transition-colors duration-300">
                    Arahkan
                  </button>
                </div>
              </div>
            ))}

            {/* Search More */}
            <div className="glass-card p-4 rounded-2xl border-dashed border-white/20 animate-fade-in" style={{animationDelay: '1.2s'}}>
              <div className="text-center">
                <div className="w-8 h-8 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm">🔍</div>
                <p className="text-xs text-slate-500">Cari lebih banyak lokasi</p>
                <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors duration-300 mt-1">
                  Perluas radius →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: '1.4s'}}>
          {[
            { title: 'Filter Kategori', desc: 'Cari berdasarkan jenis makanan', icon: '🏷️', action: 'Filter' },
            { title: 'Lokasi Saya', desc: 'Update posisi GPS Anda', icon: '📱', action: 'Update' },
            { title: 'Riwayat', desc: 'Lihat penjemputan sebelumnya', icon: '📋', action: 'Lihat' },
          ].map((action, index) => (
            <div key={action.title} className="glass-card p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{animationDelay: `${1.6 + index * 0.2}s`}}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-amber-500 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">{action.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{action.desc}</p>
                  <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium">
                    {action.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}