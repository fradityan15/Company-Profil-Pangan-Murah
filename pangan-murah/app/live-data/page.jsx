import Link from 'next/link';

// Fungsi ambil data API
async function getKatalogData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Gagal memuat data');
  return res.json();
}

export default async function LiveData() {
  const data = await getKatalogData();

  // Mock data untuk makanan yang lebih realistis
  const foodItems = [
    { id: 1, name: 'Paket Roti Premium', desc: 'Koleksi roti dan kue segar dari bakery ternama', price: 'Rp 25.000', discount: '70%', icon: '🥖', category: 'Bakery' },
    { id: 2, name: 'Nasi Box Restoran', desc: 'Porsi nasi lengkap dengan lauk-pauk spesial', price: 'Rp 15.000', discount: '60%', icon: '🍱', category: 'Restaurant' },
    { id: 3, name: 'Buah Segar Mix', desc: 'Paket buah-buahan organik siap santap', price: 'Rp 12.000', discount: '50%', icon: '🍎', category: 'Fresh' },
    { id: 4, name: 'Camilan Premium', desc: 'Kue kering dan snack berkualitas tinggi', price: 'Rp 18.000', discount: '65%', icon: '🍪', category: 'Snacks' },
    { id: 5, name: 'Sayur Organik', desc: 'Paket sayuran segar untuk memasak', price: 'Rp 8.000', discount: '55%', icon: '🥬', category: 'Vegetables' },
    { id: 6, name: 'Minuman Segar', desc: 'Jus dan minuman sehat dalam kemasan', price: 'Rp 10.000', discount: '45%', icon: '🥤', category: 'Beverages' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-8 md:p-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Halaman */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Live Update</span>
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-center">
            Katalog <span className="text-gradient animate-pulse">Langsung.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed text-center mx-auto">
            Daftar di bawah ini adalah stok makanan surplus terbaru dari mitra Pangan Murah. Data diperbarui secara real-time setiap 5 menit.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
          {['Semua', 'Bakery', 'Restaurant', 'Fresh', 'Snacks'].map((filter) => (
            <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Kartu Makanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <div key={item.id} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
              <div className="flex justify-between items-start mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                    {item.discount} OFF
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                </div>
              </div>

              {/* Judul & Deskripsi */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 capitalize">
                {item.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
                {item.desc}
              </p>

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-emerald-400">{item.price}</p>
                  <p className="text-xs text-slate-500 line-through">Rp 50.000</p>
                </div>
                <button className="px-6 py-3 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25">
                  Ambil
                </button>
              </div>

              {/* Stock Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-xs text-slate-400">75% tersisa</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center animate-fade-in" style={{animationDelay: '1.0s'}}>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
            Muat Lebih Banyak 📦
          </button>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-500 transition-all font-bold text-xs uppercase tracking-[0.2em] hover:gap-4">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}