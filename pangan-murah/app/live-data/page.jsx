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

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-8 md:p-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Halaman */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Katalog <span className="text-green-500 italic">Langsung.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Daftar di bawah ini adalah simulasi stok makanan surplus yang tersedia di berbagai mitra Pangan Murah. Data diperbarui secara otomatis dari sistem pusat.
          </p>
        </div>

        {/* Grid Kartu Makanan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <div key={item.id} className="group bg-[#1E293B] border border-white/5 p-8 rounded-[2.5rem] hover:border-green-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] bg-green-500/20 text-green-500 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                    Kelompok #{item.id}
                  </span>
                  <span className="text-slate-500 text-xs font-bold">Tersedia</span>
                </div>
                
                {/* Judul & Deskripsi dalam Bahasa Indonesia */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-500 transition capitalize">
                  Paket Hemat Penyelamatan {item.id}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Dapatkan berbagai macam pilihan makanan berkualitas tinggi yang masih sangat layak konsumsi dengan harga jauh lebih terjangkau.
                </p>
              </div>
              
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-green-600 hover:border-green-600 transition-all">
                Ambil Paket Ini
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="text-slate-500 hover:text-green-500 transition font-bold text-xs uppercase tracking-[0.2em]">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}