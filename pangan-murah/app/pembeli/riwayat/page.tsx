'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function RiwayatPembelian() {
  const { user, loading: authLoading } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || user.role !== 'buyer') {
      router.push('/');
      return;
    }

    const fetchRiwayat = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTransactions(data || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-xl animate-pulse text-green-400">Memuat Riwayat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Riwayat Pembelian</h1>
        
        {transactions.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-slate-500"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <h2 className="text-xl font-semibold mb-2">Belum Ada Pembelian</h2>
            <p className="text-slate-400">Anda belum melakukan transaksi apapun. Yuk mulai belanja!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((trx) => (
              <div key={trx.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm transition hover:bg-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-slate-400">Tanggal Transaksi</p>
                    <p className="font-semibold text-slate-200">
                      {new Date(trx.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Status</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      trx.payment_status === 'paid' ? 'bg-green-500/10 text-green-400' :
                      trx.payment_status === 'waiting' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {trx.payment_status === 'paid' ? 'Selesai' :
                       trx.payment_status === 'waiting' ? 'Menunggu' : 'Dibatalkan'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Total Belanja</p>
                    <p className="text-lg font-bold text-green-400">
                      Rp {(trx.total_price || 0).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-slate-800 overflow-hidden border border-white/5">
                      <div className="flex h-full w-full items-center justify-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-200">
                        {trx.product_name || 'Produk Tidak Tersedia'}
                      </h4>
                      <p className="text-sm text-slate-400">
                        Jumlah: {trx.quantity} 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
