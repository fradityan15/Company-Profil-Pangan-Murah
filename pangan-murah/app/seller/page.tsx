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


  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (!user?.id) {
        return;
      }

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
      setMessage('Isi semua field yang diperlukan.');
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
      setMessage('Harga harus berupa angka positif.');
      setSubmitting(false);
      return;
    }

    if (isNaN(stock) || stock < 0) {
      setMessage('Stok harus berupa angka non-negatif.');
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
      setMessage('Produk berhasil ditambahkan!');
      setTimeout(() => setMessage(''), 3000);
    }

    setSubmitting(false);
  };

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total_price, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Memuat profil...</p>
      </div>
    );
  }

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-xl shadow-black/20">
          <h1 className="text-3xl font-black mb-4">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6">Halaman ini khusus untuk penjual. Silakan masuk dengan akun penjual untuk melihat dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Dashboard Penjual</p>
              <h1 className="mt-4 text-4xl font-black text-white">Selamat datang, {user.full_name || user.email}!</h1>
              <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">
                Kelola penawaran makanan, atur stok, dan pantau pembeli yang berminat di marketplace Pangan Murah.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-center text-slate-200 shadow-inner shadow-slate-900/40">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Akun Anda</p>
              <p className="mt-3 text-3xl font-black text-amber-300">Penjual</p>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total Produk</p>
            <p className="mt-3 text-3xl font-black text-cyan-300">{products.length}</p>
            <p className="mt-2 text-sm text-slate-400">Item tersedia</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total Pesanan</p>
            <p className="mt-3 text-3xl font-black text-blue-300">{totalOrders}</p>
            <p className="mt-2 text-sm text-slate-400">Pesanan masuk</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Selesai</p>
            <p className="mt-3 text-3xl font-black text-emerald-300">{completedOrders}</p>
            <p className="mt-2 text-sm text-slate-400">Pesanan sukses</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total Penerimaan</p>
            <p className="mt-3 text-2xl font-black text-yellow-300">Rp {(totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="mt-2 text-sm text-slate-400">Dari pesanan selesai</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          {message && !showAddProduct && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm">
              {message}
            </div>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-white">Produk Anda</h2>
              <p className="mt-2 text-slate-400">Kelola paket makanan yang dijual</p>
            </div>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-400 active:scale-95"
            >
              + Tambah Produk
            </button>
          </div>

          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="mb-8 rounded-2xl bg-slate-950/80 p-6 border border-slate-700/50 space-y-4">
              {message && (
                <div className={`p-3 rounded-lg text-sm ${message.includes('berhasil') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {message}
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                  disabled={submitting}
                />
                <input
                  type="number"
                  placeholder="Harga (Rp)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                  disabled={submitting}
                />
                <input
                  type="number"
                  placeholder="Stok"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                  disabled={submitting}
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                  disabled={submitting}
                >
                  <option value="roti">Roti</option>
                  <option value="kue">Kue</option>
                  <option value="camilan">Camilan</option>
                  <option value="makanan">Makanan Berat</option>
                </select>
              </div>
              <textarea
                placeholder="Deskripsi Produk"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                rows={3}
                disabled={submitting}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-emerald-500 px-6 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="rounded-2xl bg-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-600"
                  disabled={submitting}
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-2xl border border-slate-700/50 bg-slate-950/80 p-6 hover:border-amber-400/50 transition">
                <div className="mb-3">
                  <div>
                    <h3 className="font-black text-white">{product.name}</h3>
                    <p className="mt-1 text-xs text-amber-300 uppercase tracking-[0.2em]">{product.category}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-black text-cyan-300">Rp {product.price.toLocaleString()}</p>
                  <p className="text-sm font-semibold text-slate-300">Stok: {product.stock}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/40">
                    Edit
                  </button>
                  <button className="flex-1 rounded-lg bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/40">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Orders Section */}
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <h2 className="text-2xl font-black text-white mb-6">Pesanan Masuk</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Pembeli</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Produk</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Qty</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Total</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Status</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4 font-semibold">{order.buyer_name}</td>
                    <td className="px-4 py-4">{order.product_name}</td>
                    <td className="px-4 py-4">{order.quantity}</td>
                    <td className="px-4 py-4 text-cyan-300 font-semibold">Rp {order.total_price.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' :
                        order.status === 'accepted' ? 'bg-blue-500/20 text-blue-200' :
                        order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-200' :
                        'bg-red-500/20 text-red-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {order.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="rounded-lg bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/40">
                            Terima
                          </button>
                          <button className="rounded-lg bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/40">
                            Tolak
                          </button>
                        </div>
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

