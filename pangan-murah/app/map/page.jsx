import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-white">Peta <span className="text-green-500">Penyelamatan</span></h1>
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-white">← Kembali</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Simulasi Area Peta */}
          <div className="lg:col-span-2 h-[500px] bg-[#1E293B] rounded-[2.5rem] border border-white/5 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2456!3i1645!2m3!1e0!2sm!3i633140934!3m8!2sid!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1f2!10b1!12b1')] bg-cover"></div>
             <div className="relative z-10 text-center p-10">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 animate-ping opacity-20 absolute left-1/2 -ml-8"></div>
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 relative flex items-center justify-center text-2xl">📍</div>
                <p className="font-bold text-white">Mencari titik terdekat di Cipatat...</p>
             </div>
          </div>

          {/* Daftar Toko Terdekat */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs">Tersedia Sekarang</h3>
            {[
              { name: 'Bakery Indah', dist: '0.8 km', stock: '5 Bag' },
              { name: 'Warung Barokah', dist: '1.2 km', stock: '2 Porsi' },
              { name: 'Fruit Fresh', dist: '2.5 km', stock: '8 Pack' },
            ].map((shop, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-green-500/50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{shop.name}</h4>
                  <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded-md font-black">{shop.stock}</span>
                </div>
                <p className="text-xs text-slate-500">📍 {shop.dist} dari lokasimu</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}