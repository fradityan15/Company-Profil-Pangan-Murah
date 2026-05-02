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
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayState, setOverlayState] = useState<'loading' | 'success'>('loading');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

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

      if (!supabase) {
        setFetchError('Koneksi database tidak tersedia.');
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
    if (status === 'loading' || status === 'success') return;
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

    setShowOverlay(true);
    setOverlayState('loading');
    setStatus('loading');
    setMessage('Memproses pesanan...');

    if (!supabase) {
      setMessage('Koneksi database tidak tersedia.');
      setShowOverlay(false);
      setStatus('error');
      return;
    }

    // 3. Cegah race condition stok: Fetch stok terbaru langsung dari DB sebelum validasi final
    const { data: latestProduct, error: fetchStockError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', product.id)
      .single();

    if (fetchStockError || !latestProduct) {
      console.error('Gagal mengecek stok terbaru:', fetchStockError?.message ?? 'Not found');
      setShowOverlay(false);
      setStatus('error');
      setMessage('Gagal memverifikasi stok. Silakan coba lagi.');
      return;
    }

    if (latestProduct.stock < quantity) {
      setShowOverlay(false);
      setStatus('error');
      setMessage(`Mohon maaf, stok tidak mencukupi. Stok tersisa: ${latestProduct.stock}`);
      setProduct({ ...product, stock: latestProduct.stock });
      return;
    }

    const totalPrice = product.price * quantity;
    const generatedQrData = `PanganMurah-${product.id}-${user.id}-${Date.now()}-${totalPrice}`;

    const { data: orderData, error: orderError } = await supabase.from('orders').insert([{
      buyer_id: user.id,
      buyer_email: user.email,
      product_id: product.id,
      product_name: product.name,
      quantity,
      total_price: totalPrice,
      status: 'pending',
      payment_method: 'QRIS',
      payment_status: 'waiting',
      qr_code: generatedQrData
    }]).select().single();

    if (orderError) {
      console.error('Gagal membuat pesanan:', orderError.message ?? orderError);
      setShowOverlay(false);
      setStatus('error');
      setMessage('Gagal membuat pesanan. Silakan coba lagi.');
      return;
    }

    if (orderData && orderData.qr_code) {
      setQrCodeData(orderData.qr_code);
    } else {
      setQrCodeData(generatedQrData);
    }

    const remainingStock = latestProduct.stock - quantity;

    const { error: stockError } = await supabase
      .from('products')
      .update({ stock: remainingStock, available: remainingStock > 0 })
      .eq('id', product.id);

    if (stockError) {
      console.error('Gagal update stok:', stockError.message ?? stockError);
      setMessage('Pesanan berhasil dibuat, tetapi gagal memperbarui stok di server.');
    }

    setOverlayState('success');
    
    setTimeout(() => {
      setShowOverlay(false);
      setStatus('success');
      setMessage('Pesanan berhasil dibuat! Mengalihkan ke halaman pembayaran...');
      
      setTimeout(() => {
        if (orderData && orderData.id) {
          router.push(`/payment?order_id=${orderData.id}`);
        } else {
          router.push('/payment');
        }
      }, 2000);
    }, 1500);
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

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 relative overflow-hidden selection:bg-cyan-500/30">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Loading/Success Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 shadow-2xl w-[320px] text-center">
            {overlayState === 'loading' ? (
              <>
                <div className="mb-6 relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Memproses Pembayaran</h3>
                <p className="mt-3 text-sm text-slate-400">Mohon tunggu sebentar...</p>
              </>
            ) : (
              <>
                <div className="mb-6 flex h-20 w-20 animate-[bounce_0.5s_ease-out] items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-4 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Pesanan Berhasil!</h3>
                <p className="mt-3 text-sm text-emerald-400/80">Menyiapkan QRIS pembayaran...</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Checkout
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-3 tracking-tight">Selesaikan Pesanan</h1>
          <p className="text-slate-400">Pastikan detail pesanan Anda sudah sesuai sebelum membayar.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">

          {/* Product Details (Spans 3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-1 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50"></div>
              
              <div className="relative z-10 bg-[#0a0a0a] rounded-[1.8rem] p-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Icon Block */}
                  <div className="flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/20">{product.category}</span>
                        <h3 className="text-2xl font-bold text-white leading-tight">{product.name}</h3>
                      </div>
                      <p className="text-2xl font-black text-cyan-300 whitespace-nowrap">{formatPrice(product.price)}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Tentukan Jumlah</p>
                      <p className="text-xs text-slate-500 mt-1">Sisa stok: {product.stock} item</p>
                    </div>
                    
                    <div className="flex items-center gap-1 rounded-xl bg-slate-900 border border-white/10 p-1 shadow-inner">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-slate-300 hover:bg-white/5 hover:text-white transition disabled:opacity-30"
                        disabled={quantity <= 1 || status === 'loading' || status === 'success'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-14 bg-transparent text-center text-lg font-bold text-white outline-none disabled:opacity-50"
                        min="1"
                        max={product.stock}
                        disabled={status === 'loading' || status === 'success'}
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-slate-300 hover:bg-white/5 hover:text-white transition disabled:opacity-30"
                        disabled={quantity >= product.stock || status === 'loading' || status === 'success'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl relative">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                Ringkasan Pembayaran
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Harga per item</span>
                  <span className="font-medium text-slate-300">{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Jumlah</span>
                  <span className="font-medium text-slate-300">{quantity}x</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-slate-300 font-medium">Total Harga</span>
                  <span className="text-3xl font-black text-white">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={status === 'loading' || status === 'success'}
                className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-300 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-cyan-400"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative flex items-center gap-2">
                  {status === 'loading' ? 'Memproses...' : status === 'success' ? 'Berhasil' : 'Bayar Sekarang'}
                  {status !== 'loading' && status !== 'success' && (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  )}
                </span>
              </button>

              {message && (status === 'error' || status === 'success') && (
                <p className={`mt-4 text-center text-sm font-medium py-2 px-3 rounded-lg border ${status === 'error' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'}`}>
                  {message}
                </p>
              )}
            </div>

            {/* QRIS Payment */}
            {status === 'success' && qrCodeData && (
              <div className="rounded-[2rem] border border-cyan-500/30 bg-cyan-500/5 p-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl text-center">
                <div className="inline-flex items-center justify-center gap-2 text-cyan-400 text-[11px] font-bold uppercase tracking-widest mb-5 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                  Scan QRIS untuk Bayar
                </div>
                
                <div className="bg-white rounded-2xl p-3 mx-auto w-fit mb-5 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 rounded-2xl blur-lg -z-10"></div>
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrCodeData)}`}
                    alt="QRIS Pangan Murah"
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-xl"
                  />
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="text-slate-400 text-sm">Total Tagihan:</p>
                  <p className="text-2xl font-black text-white">{formatPrice(totalPrice)}</p>
                  <p className="text-slate-500 text-[11px] font-mono mt-2 tracking-widest">ID: {product.id.split('-')[0].toUpperCase()}</p>
                </div>
                
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mt-2">
                  <p className="text-sm text-cyan-100 leading-relaxed">
                    <span className="font-bold text-cyan-400">Mengalihkan...</span> Silakan selesaikan pembayaran di halaman berikutnya.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/live-data" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
