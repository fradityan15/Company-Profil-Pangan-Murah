'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

interface CheckoutProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  seller_email: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<CheckoutProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const urlProductId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('productId') : null;
    setProductId(urlProductId);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setFetchError('Produk tidak dipilih. Kembali ke katalog.');
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('id,name,description,price,stock,category,seller_email')
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Gagal memuat produk checkout:', error.message ?? error);
        setFetchError('Produk tidak ditemukan atau tidak dapat dimuat.');
        return;
      }

      if (!data) {
        setFetchError('Produk tersebut tidak tersedia.');
        return;
      }

      setProduct(data as CheckoutProduct);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

  const handleQuantityChange = (value: number) => {
    if (!product) return;
    if (value < 1) return;
    if (value > product.stock) {
      setMessage(`Stok maksimal ${product.stock} item.`);
      return;
    }
    setMessage('');
    setQuantity(value);
  };

  const handleOrder = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!product) {
      setMessage('Produk tidak ditemukan.');
      return;
    }

    if (quantity < 1 || quantity > product.stock) {
      setMessage('Tentukan jumlah yang valid sesuai stok.');
      return;
    }

    setStatus('loading');
    setMessage('Memproses pesanan...');

    const totalPrice = product.price * quantity;

    const { error: orderError } = await supabase.from('orders').insert([{
      buyer_id: user.id,
      buyer_email: user.email,
      product_id: product.id,
      product_name: product.name,
      quantity,
      total_price: totalPrice,
      status: 'pending',
      payment_method: 'QRIS',
      payment_status: 'waiting',
    }]).select().single();

    if (orderError) {
      console.error('Gagal membuat pesanan:', orderError.message ?? orderError);
      setStatus('error');
      setMessage('Gagal membuat pesanan. Silakan coba lagi.');
      return;
    }

    const remainingStock = product.stock - quantity;

    if (remainingStock <= 0) {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (deleteError) {
        console.error('Gagal menghapus produk:', deleteError.message ?? deleteError);
      }
    } else {
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: remainingStock, available: true })
        .eq('id', product.id);

      if (stockError) {
        console.error('Gagal update stok:', stockError.message ?? stockError);
        // Note: Order sudah dibuat, tapi stok gagal diupdate
      }
    }

    setStatus('success');
    setMessage('Pesanan berhasil dibuat! QRIS akan muncul untuk pembayaran.');

    // Generate QR code data
    const qrData = `PanganMurah-${product.id}-${user.id}-${Date.now()}-${totalPrice}`;
  };

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-slate-300 mb-6">{fetchError}</p>
          <Link href="/live-data" className="inline-block rounded-full bg-slate-700 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-600 transition">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Memuat produk...</p>
      </div>
    );
  }

  const totalPrice = product.price * quantity;
  const qrData = `PanganMurah-${product.id}-${user?.id || 'guest'}-${Date.now()}-${totalPrice}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-2">Checkout Pesanan</h1>
          <p className="text-slate-400">Selesaikan pembelian makanan surplus</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Product Details */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6">Detail Produk</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{product.description}</p>
                <p className="text-xs text-amber-400 uppercase tracking-widest mt-2">{product.category}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-black text-cyan-300">{formatPrice(product.price)}</p>
                <p className="text-sm text-slate-400">Stok: {product.stock}</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Jumlah</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-600 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-20 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-center text-white outline-none focus:border-cyan-400"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-600 disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-cyan-300">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-6">Pembayaran</h2>

              <div className="space-y-4">
                <button
                  onClick={handleOrder}
                  disabled={status === 'loading'}
                  className="w-full rounded-full bg-cyan-400 px-8 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? 'Memproses...' : 'Bayar & Checkout'}
                </button>

                {message && (
                  <p className={`text-sm ${status === 'error' ? 'text-rose-400' : 'text-slate-300'}`}>{message}</p>
                )}
              </div>
            </div>

            {/* QRIS Payment */}
            {status === 'success' && (
              <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/30">
                <h2 className="text-2xl font-black text-white mb-6">QRIS Pembayaran</h2>
                <div className="rounded-4xl bg-slate-950/80 p-6 text-center">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrData)}`}
                    alt="QRIS Pangan Murah"
                    width={260}
                    height={260}
                    className="mx-auto mb-6 h-64 w-64 rounded-3xl border border-white/10 bg-white/5 object-cover"
                  />
                  <p className="text-slate-400 mb-2">Scan QRIS di atas dengan aplikasi pembayaran Anda.</p>
                  <p className="text-sm text-slate-500">Total yang harus dibayar: <span className="font-semibold text-white">{formatPrice(totalPrice)}</span></p>
                  <p className="mt-4 text-sm text-slate-400">Nomor QRIS merchant: <span className="text-white">0812-3456-7890</span></p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/live-data" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-400 transition font-bold">
            ← Kembali ke Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
