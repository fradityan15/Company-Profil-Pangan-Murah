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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-pink-500"></div>
          <p className="text-sm font-medium tracking-widest text-slate-400 uppercase">Memuat sistem...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-lg w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">Akses Ditolak</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">Halaman komando ini dienkripsi dan dibatasi. Hanya identitas dengan otoritas <strong>Administrator</strong> yang diizinkan masuk.</p>
          
          <div className="bg-white/5 rounded-2xl p-5 text-left text-xs text-slate-400 border border-white/5">
            <p className="font-mono text-pink-400 mb-2 uppercase tracking-widest text-[10px]">Diagnostics</p>
            <div className="space-y-1 font-mono">
              <p>Auth Status: <span className={user ? 'text-emerald-400' : 'text-rose-400'}>{user ? 'Authenticated' : 'Guest'}</span></p>
              {user && (
                <>
                  <p>Identity: <span className="text-white">{user.email}</span></p>
                  <p>Clearance Level: <span className="text-rose-400">{user.role || 'undefined'}</span></p>
                </>
              )}
            </div>
            <p className="mt-4 pt-4 border-t border-white/5 text-slate-500">Gunakan akun <span className="text-slate-300">admin@panganmurah.id</span> atau kelola <a href="/api/debug/admin" className="text-pink-400 hover:text-pink-300 transition-colors">akun khusus</a>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 relative selection:bg-pink-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 px-6 py-20 mx-auto max-w-7xl space-y-8">
        
        {/* Header Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="0.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Pusat Komando
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                Sistem Administrator
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl font-light">
                Selamat datang kembali, {user.full_name?.split(' ')[0] || 'Admin'}. Pantau metrik, kelola otorisasi pengguna, dan kendalikan seluruh aktivitas platform dari satu tempat terpusat.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-white/5 shadow-xl">
              <div className="flex flex-col px-4 py-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Status Sistem</span>
                <span className="text-sm font-medium text-emerald-400 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  Optimal
                </span>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex flex-col px-4 py-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Total Pengguna</span>
                <span className="text-sm font-medium text-white">{users.length}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Cards */}
        <section className="grid gap-5 md:grid-cols-3">
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 shadow-inner shadow-pink-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Otorisasi Akses</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Elevasi hak akses pengguna menjadi penjual atau turunkan menjadi pembeli dengan satu klik.</p>
            </div>
          </article>
          
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 shadow-inner shadow-violet-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Keamanan Data</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Pantau integritas database dan pastikan seluruh entitas dalam sistem terverifikasi dengan benar.</p>
            </div>
          </article>
          
          <article className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-inner shadow-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Manajemen Platform</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">Evaluasi keseluruhan aktivitas transaksi dan operasional dalam jaringan Pangan Murah.</p>
            </div>
          </article>
        </section>

        {/* Table Section */}
        <section className="rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 md:p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Direktori Pengguna</h2>
              <p className="mt-2 text-sm text-slate-400 font-light">Kelola identitas dan level otorisasi seluruh anggota jaringan.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" placeholder="Cari pengguna..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent w-full sm:w-64 transition-all" />
              </div>
              <button onClick={fetchUsers} className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors" title="Refresh Data">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={loadingUsers ? "animate-spin" : ""}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="m-8 mb-0 rounded-2xl bg-rose-500/10 border border-rose-500/20 px-5 py-4 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-rose-400 shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-sm text-rose-200">{error}</p>
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">Identitas</th>
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">Role Saat Ini</th>
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">Terdaftar</th>
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap text-right">Otorisasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin mb-3 text-pink-500/50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        <span className="text-sm">Menyinkronkan database...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 opacity-20" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                        <span className="text-sm">Tidak ada entitas ditemukan.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((userItem) => (
                    <tr key={userItem.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                            {userItem.full_name ? userItem.full_name.charAt(0).toUpperCase() : userItem.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-white">{userItem.full_name || 'Tanpa Nama'}</div>
                            <div className="text-sm text-slate-400 mt-0.5">{userItem.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                          userItem.role === 'admin' 
                            ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
                            : userItem.role === 'seller'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            : 'bg-slate-500/10 text-slate-300 border-slate-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            userItem.role === 'admin' ? 'bg-pink-400' : userItem.role === 'seller' ? 'bg-cyan-400' : 'bg-slate-400'
                          }`}></span>
                          {userItem.role || 'buyer'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-400 font-medium">
                        {userItem.created_at ? new Date(userItem.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-50 group-hover:opacity-100 transition-opacity">
                          {userItem.role !== 'buyer' && (
                            <button
                              onClick={() => updateUserRole(userItem.id, 'buyer')}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
                              title="Jadikan Pembeli"
                            >
                              Buyer
                            </button>
                          )}
                          {userItem.role !== 'seller' && (
                            <button
                              onClick={() => updateUserRole(userItem.id, 'seller')}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                              title="Jadikan Penjual"
                            >
                              Seller
                            </button>
                          )}
                          {userItem.role !== 'admin' && (
                            <button
                              onClick={() => updateUserRole(userItem.id, 'admin')}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/20 transition-all"
                              title="Jadikan Admin"
                            >
                              Admin
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer/Pagination space */}
          <div className="px-8 py-4 border-t border-white/5 bg-white/[0.01] text-xs text-slate-500 flex items-center justify-between">
            <span>Menampilkan {users.length} pengguna</span>
            <span className="flex items-center gap-1 text-emerald-400/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Live Sync
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}