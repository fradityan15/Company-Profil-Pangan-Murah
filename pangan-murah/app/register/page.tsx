'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.full_name || !formData.email || !formData.password || !formData.role) {
      setError('Semua field harus diisi');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, formData.full_name, formData.role as 'buyer' | 'seller');
      setSuccess('Registrasi berhasil! Mengalihkan ke halaman utama...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/10">
          <h1 className="text-3xl font-black text-white mb-2">Daftar Akun</h1>
          <p className="text-sm text-slate-400 mb-8">
            Bergabunglah dengan Pangan Murah dan mulai hemat makanan
          </p>

          {error && (
            <div className="mb-6 rounded-2xl bg-rose-500/10 text-rose-200 border border-rose-500/20 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 px-4 py-3 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-200">
              Nama Lengkap
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full mt-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Contoh: Budi Santoso"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full mt-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Contoh: budi@email.com"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full mt-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Min. 6 karakter"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Konfirmasi Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full mt-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Ulangi password Anda"
              />
            </label>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-slate-200">Daftar sebagai</legend>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-400">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-400"
                  />
                  Pembeli
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-400">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-400"
                  />
                  Penjual
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
