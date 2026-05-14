import Link from 'next/link';
import { getSupabase } from '@/lib/supabaseClient';
import SearchBar from '@/components/SearchBar';

export default async function LiveData({ searchParams }: { searchParams: Promise<{ query?: string, category?: string }> }) {
  const params = await searchParams;
  const query = params?.query || '';
  const category = params?.category || 'Semua';
  const supabase = getSupabase();

  // Query Supabase dengan filter .ilike() jika ada parameter pencarian
  let supabaseQuery = supabase
    .from('products')
    .select('*')
    .gt('stock', 0)
    .order('created_at', { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
  }
  
  if (category !== 'Semua') {
    supabaseQuery = supabaseQuery.eq('category', category);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    console.error('Gagal memuat katalog dari Supabase:', error.message);
  }
  const CATEGORY_MAP: Record<string, string> = {
    'roti': 'Roti & Bakery',
    'kue': 'Kue & Jajanan',
    'camilan': 'Camilan Ringan',
    'makanan': 'Makanan Berat / Lauk',
    'Semua': 'Semua'
  };

  const fallbackItems = [
    { id: 1, name: 'Roti Tawar Premium', description: 'Koleksi roti dan kue segar dari bakery ternama', price: 25000, stock: 10, category: 'roti', icon: '🥖' },
    { id: 2, name: 'Nasi Box', description: 'Porsi nasi lengkap dengan lauk-pauk spesial', price: 15000, stock: 15, category: 'makanan', icon: '🍱' },
    { id: 3, name: 'Kue Basah Mix', description: 'Paket kue tradisional siap santap', price: 12000, stock: 8, category: 'kue', icon: '🥧' },
  ];

  const items = data && data.length > 0 ? data : (query ? (data || []) : fallbackItems.filter(item => category === 'Semua' || item.category === category));

  // Selalu tampilkan semua opsi kategori agar konsisten dengan menu etalase produk
  const availableCategories = ['Semua', 'roti', 'kue', 'camilan', 'makanan'];

  const formattedItems = items.map((item: any) => ({
    ...item,
    formattedPrice: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price),
    icon: item.icon || '🍽',
    discount: 'TERBARU'
  }));

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-6 md:p-12 lg:p-20 font-sans relative overflow-hidden">
      {/* Subtle background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Halaman */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight pb-2">
            Katalog Makanan
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed mx-auto text-lg mb-8">
            Temukan dan selamatkan porsi makanan berkualitas dari mitra kami. Stok diperbarui secara instan.
          </p>
          
          {/* Komponen SearchBar */}
          <SearchBar />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {availableCategories.map((filter) => {
            const isActive = category === filter;
            const targetParams = new URLSearchParams();
            if (query) targetParams.set('query', query);
            if (filter !== 'Semua') targetParams.set('category', filter);
            const targetUrl = targetParams.toString() ? `?${targetParams.toString()}` : '/live-data';
            const label = CATEGORY_MAP[filter] || filter;

            return (
              <Link key={filter} href={targetUrl} scroll={false} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isActive ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'}`}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Grid Kartu Makanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {formattedItems.map((item, index) => {
            const stockPercentage = Math.min(100, ((item.stock || 0) / 20) * 100);
            
            // Map kategori ke gambar statis berkualitas tinggi
            const categoryImages: Record<string, string> = {
              'roti': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
              'kue': 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=600&auto=format&fit=crop',
              'makanan': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop',
              'camilan': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd08c?q=80&w=600&auto=format&fit=crop',
            };
            
            const imageUrl = item.image_url || categoryImages[item.category] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop';
            
            return (
            <div key={item.id} className="group flex flex-col bg-white/[0.02] rounded-[2rem] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-emerald-500/10 overflow-hidden">
              {/* Image Section */}
              <div className="relative h-56 w-full bg-slate-800 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={imageUrl}
                  alt={item.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center text-[10px] bg-emerald-500 text-slate-950 font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {item.discount}
                  </span>
                </div>
                <div className="absolute top-4 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-2xl shadow-lg">
                  {item.icon}
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                   <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 capitalize leading-tight drop-shadow-md">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2 flex-1">
                  {item.description}
                </p>

                <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/5 mb-5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Harga Khusus</p>
                    <p className="text-2xl font-black text-emerald-400 tracking-tight">{item.formattedPrice}</p>
                  </div>
                  <Link
                    href={`/checkout?productId=${encodeURIComponent(item.id)}`}
                    className="px-6 py-3 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                  >
                    Ambil
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>

                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between text-xs mb-2 uppercase tracking-widest">
                    <span className="font-bold text-slate-300">{item.stock ? `${item.stock} porsi tersedia` : 'Stok terbatas'}</span>
                    <span className="text-slate-500">{CATEGORY_MAP[item.category] || item.category}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${stockPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>

        {formattedItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-lg">Tidak ada hasil ditemukan untuk "{query}"</p>
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
