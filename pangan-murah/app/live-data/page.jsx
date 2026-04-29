import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

// Fungsi ambil data produk dari Supabase
async function getKatalogData() {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,stock,category,seller_email')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Gagal memuat katalog dari Supabase:', error?.message ?? error);
    return [];
  }

  return data ?? [];
}

export default async function LiveData() {
  const data = await getKatalogData();

  const fallbackItems = [
    { id: 1, name: 'Roti', desc: 'Koleksi roti dan kue segar dari bakery ternama', price: 'Rp 25.000', discount: '70%', icon: '🥖', category: 'Bakery' },
    { id: 2, name: 'Nasi Box', desc: 'Porsi nasi lengkap dengan lauk-pauk spesial', price: 'Rp 15.000', discount: '60%', icon: '🍱', category: 'Restaurant' },
    { id: 3, name: 'Buah Segar Mix', desc: 'Paket buah-buahan organik siap santap', price: 'Rp 12.000', discount: '50%', icon: '🍎', category: 'Fresh' },
    { id: 4, name: 'Camilan Sehat', desc: 'Kue kering dan snack berkualitas tinggi', price: 'Rp 18.000', discount: '65%', icon: '🍪', category: 'Snacks' },
    { id: 5, name: 'Sayur Organik', desc: 'Paket sayuran segar untuk memasak', price: 'Rp 8.000', discount: '55%', icon: '🥬', category: 'Vegetables' },
    { id: 6, name: 'Minuman Segar', desc: 'Jus dan minuman sehat dalam kemasan', price: 'Rp 10.000', discount: '45%', icon: '🥤', category: 'Beverages' },
  ];

  const foodItems = data && data.length > 0
    ? data.map((item) => ({
        id: item.id,
        name: item.name,
        desc: item.description,
        price: typeof item.price === 'number' ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price) : item.price,
        discount: 'TERBARU',
        icon: '🍽',
        category: item.category || 'Lainnya',
        stock: item.stock,
        seller: item.seller_email,
      }))
    : fallbackItems;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-8 md:p-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Halaman */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-center">
            Katalog
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed text-center mx-auto">
            Daftar di bawah ini adalah stok makanan surplus terbaru dari mitra Pangan Murah. Data diperbarui secara real-time setiap 5 menit.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
          {['Semua', 'Bakery', 'Restaurant', 'Fresh', 'Snacks'].map((filter) => (
            <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-slate-500/20 hover:border-slate-500/50 transition-all duration-300 hover:scale-105">
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Kartu Makanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <div key={item.id} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 hover:border-slate-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
              <div className="flex justify-between items-start mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-500 text-2xl group-hover:scale-110 transition-transform duration-300`}>
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
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white-400 transition-colors duration-300 capitalize">
                {item.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
                {item.desc}
              </p>

              {/* Price & Button */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-black text-white-400">{item.price}</p>
                  <p className="text-xs text-slate-500 line-through">Rp 50.000</p>
                </div>
                <Link
                  href={`/checkout?productId=${encodeURIComponent(item.id)}`}
                  className="px-6 py-3 bg-green-500 text-slate-950 font-black rounded-2xl hover:bg-green-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25"
                >
                  Ambil
                </Link>
              </div>

              {/* Stock Indicator */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400 uppercase tracking-[0.2em]">
                  <span>{item.stock ? `${item.stock} stok tersedia` : 'Stok terbatas'}</span>
                  <span className="rounded-full bg-slate-800/70 px-3 py-1 text-[10px] text-slate-300">{item.category}</span>
                </div>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center animate-fade-in" style={{animationDelay: '1.0s'}}>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-slate-500/20 hover:border-slate-500/50 transition-all duration-300 hover:scale-105">
            Muat Lebih Banyak 📦
          </button>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-500 transition-all font-bold text-xs uppercase tracking-[0.2em] hover:gap-4">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}