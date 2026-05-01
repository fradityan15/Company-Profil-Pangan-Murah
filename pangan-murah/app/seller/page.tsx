'use client';

import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { FormEvent, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  seller_email: string;
  seller_id: string;
  created_at: string;
}

interface Order {
  id: string;
  buyer_name: string;
  product_name: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  created_at: string;
}

interface RescueLocation {
  id: string;
  name: string;
  category: string;
  address: string;
  created_at: string;
}

export default function SellerPage() {
  const { user, isLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders] = useState<Order[]>([
    {
      id: '1',
      buyer_name: 'Budi Santoso',
      product_name: 'Roti Tawar Premium',
      quantity: 2,
      total_price: 50000,
      status: 'pending',
      created_at: '2026-04-29T10:30:00Z',
    },
    {
      id: '2',
      buyer_name: 'Siti Nurhaliza',
      product_name: 'Kue Coklat Mewah',
      quantity: 1,
      total_price: 45000,
      status: 'accepted',
      created_at: '2026-04-29T09:15:00Z',
    },
    {
      id: '3',
      buyer_name: 'Ahmad Wijaya',
      product_name: 'Camilan Sehat Mix',
      quantity: 3,
      total_price: 105000,
      status: 'completed',
      created_at: '2026-04-28T14:45:00Z',
    },
  ]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'roti',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  // Rescue Locations State
  const [rescueLocations, setRescueLocations] = useState<RescueLocation[]>([]);
  const [rescueForm, setRescueForm] = useState({ name: '', category: '', address: '' });
  const [isLoadingRescue, setIsLoadingRescue] = useState(false);
  const [isSavingRescue, setIsSavingRescue] = useState(false);
  const [rescueNotification, setRescueNotification] = useState('');
  const [rescueError, setRescueError] = useState('');

  useEffect(() => {
    fetchRescueLocations();
  }, []);

  async function fetchRescueLocations() {
    setIsLoadingRescue(true);
    setRescueError('');

    const { data, error } = await supabase
      .from('rescue_locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setRescueError('Gagal memuat lokasi penyelamatan.');
    } else {
      setRescueLocations(data || []);
    }
    setIsLoadingRescue(false);
  }

  async function handleSaveRescueLocation(e: FormEvent) {
    e.preventDefault();
    setRescueNotification('');
    setRescueError('');

    if (!rescueForm.name || !rescueForm.category || !rescueForm.address) {
      setRescueError('Semua field lokasi harus diisi.');
      return;
    }

    setIsSavingRescue(true);
    const { error } = await supabase.from('rescue_locations').insert([
      {
        name: rescueForm.name,
        category: rescueForm.category,
        address: rescueForm.address,
      },
    ]);

    setIsSavingRescue(false);

    if (error) {
      console.error(error);
      setRescueError('Gagal menyimpan data lokasi.');
      return;
    }

    setRescueForm({ name: '', category: '', address: '' });
    setRescueNotification('Lokasi berhasil ditambahkan dan disiarkan ke Peta Penyelamatan!');
    setTimeout(() => setRescueNotification(''), 4000);
    fetchRescueLocations();
  }

  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('products')
        .select('id,name,description,price,stock,category,seller_email,seller_id,created_at')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal memuat produk seller:', error.message);
      }
      setProducts(data ?? []);
    };
    fetchSellerProducts();
  }, [user]);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      setMessage('Isi semua field utama.');
      return;
    }
    if (!user) {
      setMessage('Anda harus login sebagai penjual terlebih dahulu.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock, 10);

    if (isNaN(price) || price <= 0) {
      setMessage('Harga harus angka positif.');
      setSubmitting(false);
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setMessage('Stok harus angka non-negatif.');
      setSubmitting(false);
      return;
    }

    const { data, error } = await supabase.from('products').insert([{
      seller_id: user.id,
      seller_email: user.email,
      name: formData.name,
      description: formData.description,
      price,
      stock,
      category: formData.category,
      available: true,
    }]).select().single();

    if (error) {
      console.error('Gagal menyimpan produk:', error.message ?? error);
      setMessage('Gagal menyimpan produk. Coba lagi.');
      setSubmitting(false);
      return;
    }

    if (data) {
      setProducts((prev) => [data, ...prev]);
      setFormData({ name: '', description: '', price: '', stock: '', category: 'roti' });
      setShowAddProduct(false);
      setMessage('Produk berhasil ditambahkan ke etalase!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSubmitting(false);
  };

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total_price, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500"></div>
          <p className="text-sm font-medium tracking-widest text-slate-400 uppercase">Memuat etalase...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-100 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-lg w-full rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">Halaman manajemen toko ini dikhususkan untuk mitra Penjual (Seller). Silakan masuk dengan akun mitra.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 relative selection:bg-blue-500/30 pb-20">
      {/* Background Ambience */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 space-y-10">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-10 md:p-14 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                Partner Portal
              </span>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 md:text-6xl tracking-tight leading-tight">
                Seller Dashboard
              </h1>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed font-light max-w-2xl">
                Halo, <span className="text-white font-medium">{user.full_name || user.email}</span>. Kelola katalog produk Anda, proses pesanan masuk, dan kontribusi lokasi penyelamatan makanan dalam satu tempat.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/5 shadow-xl">
              <div className="flex flex-col px-5 py-3">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Status Toko</span>
                <span className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Buka
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid gap-5 md:grid-cols-4">
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Produk</p>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg></div>
              </div>
              <p className="text-4xl font-black text-white">{products.length}</p>
              <p className="mt-2 text-xs text-slate-500 font-light">Item terpajang di katalog</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pesanan Masuk</p>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
              </div>
              <p className="text-4xl font-black text-white">{totalOrders}</p>
              <p className="mt-2 text-xs text-slate-500 font-light">Total riwayat pesanan</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Transaksi Selesai</p>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg></div>
              </div>
              <p className="text-4xl font-black text-white">{completedOrders}</p>
              <p className="mt-2 text-xs text-slate-500 font-light">Pembeli telah menerima</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Pendapatan</p>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg></div>
              </div>
              <p className="text-3xl font-black text-amber-400 tracking-tight">Rp {(totalRevenue / 1000).toLocaleString()}k</p>
              <p className="mt-2 text-xs text-slate-500 font-light">Dari transaksi sukses</p>
            </div>
          </div>
        </section>

        {/* Rescue Locations Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/40 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-emerald-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Pusat Lokasi Penyelamatan</h2>
              </div>
              <p className="text-slate-400 font-light max-w-2xl">Bagikan titik donasi makanan atau bahan pangan sisa layak konsumsi agar otomatis terhubung dengan Peta Penyelamatan global.</p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Tambah Lokasi */}
            <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-inner shadow-white/[0.01]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                Tambah Titik Baru
              </h3>
              
              {rescueNotification && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-5 py-4 text-sm font-medium flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  {rescueNotification}
                </div>
              )}
              {rescueError && (
                <div className="mb-6 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 px-5 py-4 text-sm font-medium flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {rescueError}
                </div>
              )}

              <form onSubmit={handleSaveRescueLocation} className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Nama Lokasi / Toko</label>
                  <input
                    value={rescueForm.name}
                    onChange={(e) => setRescueForm({ ...rescueForm, name: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="Mis: Dapur Berkah Sentosa"
                    disabled={isSavingRescue}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Kategori Pangan</label>
                  <input
                    value={rescueForm.category}
                    onChange={(e) => setRescueForm({ ...rescueForm, category: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="Mis: Sayuran segar sisa layak"
                    disabled={isSavingRescue}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Alamat Detail</label>
                  <textarea
                    value={rescueForm.address}
                    onChange={(e) => setRescueForm({ ...rescueForm, address: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none h-24"
                    placeholder="Alamat lengkap agar mudah ditemukan di peta..."
                    disabled={isSavingRescue}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSavingRescue}
                  className="w-full mt-2 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSavingRescue ? (
                    <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Memproses...</>
                  ) : (
                    <>Publikasikan ke Peta</>
                  )}
                </button>
              </form>
            </div>

            {/* Daftar Lokasi Tersimpan */}
            <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col shadow-inner shadow-white/[0.01]">
              <div className="flex items-center justify-between p-8 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">Log Siaran Aktif</h3>
                <span className="text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isLoadingRescue ? 'Sinkronisasi...' : `${rescueLocations.length} Titik Terhubung`}
                </span>
              </div>

              <div className="overflow-x-auto w-full p-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-transparent">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Detail Lokasi</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Kategori</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap text-right">Waktu Siaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoadingRescue ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3 text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-emerald-500/50"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            <span className="text-sm font-medium">Memuat data Peta Penyelamatan...</span>
                          </div>
                        </td>
                      </tr>
                    ) : rescueLocations.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center gap-3 text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                            <span className="text-sm">Belum ada titik yang Anda siarkan.</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      rescueLocations.map((location) => (
                        <tr key={location.id} className="group hover:bg-white/[0.02] transition-colors rounded-xl">
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                              </div>
                              <div>
                                <p className="font-bold text-white group-hover:text-emerald-400 transition-colors text-sm">{location.name}</p>
                                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{location.address}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/5">
                              {location.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="text-xs text-slate-500 font-medium">
                              {location.created_at
                                ? new Date(location.created_at).toLocaleString('id-ID', {
                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                  })
                                : '-'}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="rounded-[2.5rem] border border-white/5 bg-black/40 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Etalase Produk</h2>
              <p className="mt-2 text-slate-400 font-light">Atur katalog harga, detail barang, dan stok makanan harian.</p>
            </div>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-400 flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              {showAddProduct ? 'Tutup Form' : 'Tambah Baru'}
            </button>
          </div>

          {message && !showAddProduct && (
            <div className="mb-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 text-sm text-emerald-400 font-medium flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              {message}
            </div>
          )}

          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="mb-10 rounded-3xl bg-white/[0.02] p-8 border border-white/5 shadow-inner space-y-6 animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Rincian Barang Baru</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Nama Produk</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Stok Tersedia</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors appearance-none"
                    disabled={submitting}
                  >
                    <option value="roti">Roti & Bakery</option>
                    <option value="kue">Kue & Jajanan</option>
                    <option value="camilan">Camilan Ringan</option>
                    <option value="makanan">Makanan Berat / Lauk</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Deskripsi Detail</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors h-24 resize-none"
                  disabled={submitting}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-blue-500 px-8 py-3 text-sm font-bold text-white hover:bg-blue-400 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Produk'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="rounded-full bg-white/5 border border-white/10 px-8 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  disabled={submitting}
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-30"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <p>Etalase Anda masih kosong.</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="group rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all flex flex-col h-full">
                  <div className="mb-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded font-medium">
                        Stok: {product.stock}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-tight mt-3">{product.name}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-black text-white mb-5">Rp {product.price.toLocaleString('id-ID')}</p>
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Orders Section */}
        <section className="rounded-[2.5rem] border border-white/5 bg-black/40 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="p-8 md:p-10 border-b border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Manajemen Pesanan</h2>
            <p className="mt-2 text-slate-400 font-light">Tinjau antrean pembelian, validasi transaksi, dan perbarui status pengiriman.</p>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">ID Info</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Pembeli</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Rincian Item</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Nilai Transaksi</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <span className="font-mono text-xs text-slate-500">#{order.id.padStart(4, '0')}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-white text-sm">{order.buyer_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-medium text-slate-300">{order.product_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{order.quantity} x Porsi/Item</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-white">Rp {order.total_price.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        order.status === 'accepted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {order.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                            Terima
                          </button>
                          <button className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-colors">
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600 font-medium">Terkonfirmasi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

