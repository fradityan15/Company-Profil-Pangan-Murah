'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function LiveData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getKatalogData() {
      const { data: items, error } = await supabase
        .from('products')
        .select('id,name,description,price,stock,category,seller_email')
        .gt('stock', 0)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal memuat katalog dari Supabase:', error?.message ?? error);
      } else {
        setData(items || []);
      }
      setLoading(false);
    }

    getKatalogData();

    // Berlangganan (subscribe) ke perubahan data tabel products secara real-time
    const channel = supabase
      .channel('public:products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          // Ambil ulang data ketika ada yang checkout (update stok / hapus produk)
          getKatalogData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fallbackItems = [
    { id: 1, name: 'Roti', desc: 'Koleksi roti dan kue segar dari bakery ternama', price: 'Rp 25.000', discount: '70%', icon: '🥖', category: 'Bakery' },
    { id: 2, name: 'Nasi Box', desc: 'Porsi nasi lengkap dengan lauk-pauk spesial', price: 'Rp 15.000', discount: '60%', icon: '🍱', category: 'Restaurant' },
    { id: 3, name: 'Buah Segar Mix', desc: 'Paket buah-buahan organik siap santap', price: 'Rp 12.000', discount: '50%', icon: '🍎', category: 'Fresh' },
    { id: 4, name: 'Camilan Sehat', desc: 'Kue kering dan snack berkualitas tinggi', price: 'Rp 18.000', discount: '65%', icon: '🍪', category: 'Snacks' },
    { id: 5, name: 'Sayur Organik', desc: 'Paket sayuran segar untuk memasak', price: 'Rp 8.000', discount: '55%', icon: '🥬', category: 'Vegetables' },
    { id: 6, name: 'Minuman Segar', desc: 'Jus dan minuman sehat dalam kemasan', price: 'Rp 10.000', discount: '45%', icon: '🥤', category: 'Beverages' },
  ];

  const foodItems = !loading && data && data.length > 0
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
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-6 md:p-12 lg:p-20 font-sans relative overflow-hidden">
      {/* Subtle background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Halaman */}
        <div className="mb-16 animate-fade-in text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight pb-2">
            Katalog Makanan
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed mx-auto text-lg">
            Temukan dan selamatkan porsi makanan berkualitas dari mitra kami. Stok diperbarui secara instan.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 animate-fade-in" style={{animationDelay: '0.2s'}}>
          {['Semua', 'Bakery', 'Restaurant', 'Fresh', 'Snacks'].map((filter, idx) => (
            <button key={filter} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${idx === 0 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Kartu Makanan */}
        {loading ? (
           <div className="py-20 flex flex-col items-center justify-center gap-4">
             <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
             <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Memuat katalog...</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {foodItems.map((item, index) => {
              // Calculate dynamic progress bar width (max 100%, let's say 20 is max stock visual)
              const stockPercentage = Math.min(100, ((item.stock || 0) / 20) * 100);
              
              return (
              <div key={item.id} className="group flex flex-col bg-white/[0.02] p-6 lg:p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-emerald-500/10 animate-fade-in" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                      {item.discount}
                    </span>
                  </div>
                </div>

                {/* Judul & Deskripsi */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 capitalize leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Price & Button */}
                <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/5 mb-5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Harga Khusus</p>
                    <p className="text-2xl font-black text-emerald-400 tracking-tight">{item.price}</p>
                  </div>
                  <Link
                    href={`/checkout?productId=${encodeURIComponent(item.id)}`}
                    className="px-6 py-3 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                  >
                    Ambil
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>

                {/* Stock Indicator */}
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between text-xs mb-2 uppercase tracking-widest">
                    <span className="font-bold text-slate-300">{item.stock ? `${item.stock} porsi tersedia` : 'Stok terbatas'}</span>
                    <span className="text-slate-500">{item.category}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${stockPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* Load More Button */}
        {!loading && (
          <div className="mt-16 text-center animate-fade-in" style={{animationDelay: '1.0s'}}>
            <button className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105">
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-400 transition-all font-bold text-xs uppercase tracking-[0.2em] group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}