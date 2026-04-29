'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AdminAccount {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  created_at?: string;
}

export default function AdminDebugPage() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminAccounts = async () => {
      try {
        const response = await fetch('/api/debug/admin');
        if (!response.ok) {
          throw new Error('Gagal memuat data admin accounts');
        }
        const data = await response.json();
        setAccounts(data.admin_accounts || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
          ← Kembali ke Home
        </Link>

        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 shadow-2xl shadow-black/20">
          <h1 className="text-4xl font-black text-white">Debug - Admin Accounts</h1>
          <p className="mt-2 text-slate-400">Periksa daftar akun admin yang tersedia di database</p>
        </section>

        {error && (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 px-6 py-4 text-rose-100">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">Memuat data admin accounts...</p>
          </div>
        )}

        {!loading && accounts.length === 0 && !error && (
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 px-6 py-4 text-amber-100">
            <p className="font-semibold">⚠️ Tidak ada akun admin ditemukan di database</p>
            <p className="mt-2 text-sm">Jalankan script SQL seed_admins.sql di Supabase untuk membuat akun admin.</p>
          </div>
        )}

        {!loading && accounts.length > 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
            <h2 className="text-2xl font-black text-white mb-6">Admin Accounts ({accounts.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Email</th>
                    <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Nama</th>
                    <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Role</th>
                    <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Terdaftar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {accounts.map((acc) => (
                    <tr key={acc.id}>
                      <td className="px-4 py-4 font-mono text-cyan-300">{acc.email}</td>
                      <td className="px-4 py-4">{acc.full_name || '-'}</td>
                      <td className="px-4 py-4 capitalize">
                        <span className="inline-block rounded-full bg-pink-500/20 px-3 py-1 text-pink-200">
                          {acc.role || 'buyer'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500">
                        {acc.created_at ? new Date(acc.created_at).toLocaleDateString('id-ID') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-950/80 p-6 border border-slate-700/50">
              <h3 className="font-black text-white mb-4">📝 Default Passwords</h3>
              <div className="space-y-2 text-sm text-slate-300 font-mono">
                <p>admin1@panganmurah.id → Admin123!</p>
                <p>admin2@panganmurah.id → Admin456!</p>
                <p>admin3@panganmurah.id → Admin789!</p>
                <p>admin4@panganmurah.id → Admin000!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
