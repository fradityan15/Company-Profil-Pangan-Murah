'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  created_at?: string;
}

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError('');

    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal memuat data pengguna');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data admin');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user?.role]);

  const updateUserRole = async (id: string, role: string) => {
    setError('');
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal memperbarui role');
      }

      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui role');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Memuat dashboard admin...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-xl shadow-black/20">
          <h1 className="text-3xl font-black mb-4">Akses Ditolak</h1>
          <p className="text-slate-400 mb-6">Halaman admin hanya tersedia untuk akun admin. Silakan masuk dengan akun admin.</p>
          <div className="mt-8 bg-slate-950/80 rounded-2xl p-4 text-left text-xs text-slate-400 border border-slate-700/50">
            <p className="font-mono"><strong>Debug Info:</strong></p>
            <p>User logged in: {user ? 'Ya' : 'Tidak'}</p>
            {user && (
              <>
                <p>Email: {user.email}</p>
                <p>Role: {user.role || 'undefined'}</p>
                <p>Full Name: {user.full_name || 'N/A'}</p>
              </>
            )}
            <p className="mt-2 text-slate-500">Silakan login dengan email admin@panganmurah.id atau cek <a href="/api/debug/admin" className="text-blue-400 hover:underline">akun admin yang tersedia</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-pink-300">Admin Panel</p>
              <h1 className="mt-4 text-4xl font-black text-white">Selamat datang, Admin</h1>
              <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">
                Kontrol akses pengguna, tinjau database, dan atur peran untuk memastikan operasi website berjalan aman.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-center text-slate-200 shadow-inner shadow-slate-900/40">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Role Anda</p>
              <p className="mt-3 text-3xl font-black text-pink-300">Admin</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-3">Atur Akses</h2>
            <p className="text-slate-400 leading-relaxed">Ubah role user untuk mempersiapkan akun pembeli, penjual, atau admin di sistem.</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-3">Kontrol Website</h2>
            <p className="text-slate-400 leading-relaxed">Lihat data pengguna, evaluasi aktivitas, dan kelola akses halaman penting secara langsung.</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-3">Database</h2>
            <p className="text-slate-400 leading-relaxed">Pantau user terdaftar dan pastikan semua akun memiliki role yang sesuai.</p>
          </article>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Manajemen Pengguna</h2>
              <p className="mt-2 text-slate-400">Edit role pengguna atau periksa status akun di sistem.</p>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          )}

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Email</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Nama</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Role</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Terdaftar</th>
                  <th className="px-4 py-3 uppercase tracking-[0.2em] text-slate-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">Memuat pengguna...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">Tidak ada pengguna terdaftar.</td>
                  </tr>
                ) : (
                  users.map((userItem) => (
                    <tr key={userItem.id}>
                      <td className="px-4 py-4">{userItem.email}</td>
                      <td className="px-4 py-4">{userItem.full_name || '-'}</td>
                      <td className="px-4 py-4 capitalize">{userItem.role || 'buyer'}</td>
                      <td className="px-4 py-4">{userItem.created_at ? new Date(userItem.created_at).toLocaleDateString('id-ID') : '-'}</td>
                      <td className="px-4 py-4 space-x-2">
                        <button
                          onClick={() => updateUserRole(userItem.id, 'buyer')}
                          className="rounded-full bg-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:bg-slate-600"
                        >
                          Buyer
                        </button>
                        <button
                          onClick={() => updateUserRole(userItem.id, 'seller')}
                          className="rounded-full bg-cyan-500 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-400"
                        >
                          Seller
                        </button>
                        <button
                          onClick={() => updateUserRole(userItem.id, 'admin')}
                          className="rounded-full bg-pink-500 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-pink-400"
                        >
                          Admin
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
