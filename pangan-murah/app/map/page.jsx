'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../../lib/supabaseClient';

const MapComponent = dynamic(() => import('../../components/MapComponent'), { ssr: false });
const initialForm = { name: '', category: '', address: '' };

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    setIsLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('rescue_locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError('Gagal memuat lokasi. Periksa koneksi Supabase.');
    } else {
      setLocations(data || []);
    }

    setIsLoading(false);
  }

  async function handleSave(event) {
    event.preventDefault();
    setNotification('');
    setError('');

    if (!form.name || !form.category || !form.address) {
      setError('Semua field harus diisi sebelum menyimpan.');
      return;
    }

    setIsSaving(true);
    const { error: insertError } = await supabase.from('rescue_locations').insert([
      {
        name: form.name,
        category: form.category,
        address: form.address,
      },
    ]);

    setIsSaving(false);

    if (insertError) {
      console.error(insertError);
      setError('Gagal menyimpan data. Coba lagi nanti.');
      return;
    }

    setForm(initialForm);
    setNotification('Data lokasi berhasil disimpan ke Supabase.');
    fetchLocations();
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
              Peta <span className="text-gradient text-blue-400 animate-pulse">Penyelamatan</span>
            </h1>
            <p className="text-slate-400">Temukan titik penyelamatan makanan terdekat dan catat lokasi baru.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-white transition-colors hover:scale-105 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span>←</span> Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-80 sm:h-[420px] glass-card rounded-[2.5rem] border border-white/5 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MapComponent />
          </div>

          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white uppercase tracking-widest text-xs">Tersedia Sekarang</h3>
              <span className="text-xs text-white bg-yellow-500/10 px-2 py-1 rounded-full">3 lokasi</span>
            </div>

            {[
              { name: 'Cafe Bajawa', dist: '0.8 km', stock: '5 Bag', rating: 4.8, time: 'Buka sampai 20:00', icon: '🥖' },
              { name: 'Warung Bersih Barokah', dist: '1.2 km', stock: '2 Porsi', rating: 4.6, time: 'Buka sampai 22:00', icon: '🍜' },
              { name: 'Toko Buah Fresh', dist: '2.5 km', stock: '8 Pack', rating: 4.9, time: 'Buka sampai 18:00', icon: '🍎' },
            ].map((shop, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl hover:border-slate-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-500 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      {shop.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-slate-400 transition-colors duration-300">{shop.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">⭐ {shop.rating}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{shop.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-md font-black uppercase tracking-widest">
                    {shop.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="text-amber-400">📍</span> {shop.dist} dari lokasimu
                  </p>
                  <button className="text-xs bg-green-500 text-slate-950 px-3 py-1 rounded-full font-bold hover:bg-green-400 transition-colors duration-300">
                    Arahkan
                  </button>
                </div>
              </div>
            ))}

            <div className="glass-card p-4 rounded-2xl border-dashed border-white/20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="text-center">
                <div className="w-8 h-8 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm">🔍</div>
                <p className="text-xs text-slate-500">Cari lebih banyak lokasi</p>
                <button className="text-xs text-slate-400 hover:text-green-400 transition-colors duration-300 mt-1">
                  Perluas radius →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="glass-card p-6 rounded-[2.5rem] border border-white/10 bg-slate-950/40">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Tambah Lokasi Penyelamatan</h2>
                <p className="text-sm text-slate-400">Simpan lokasi baru ke Supabase dan lihat daftar histori segera.</p>
              </div>
              {notification && (
                <div className="rounded-2xl bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 px-4 py-3 text-sm">
                  {notification}
                </div>
              )}
              {error && (
                <div className="rounded-2xl bg-rose-500/10 text-rose-200 border border-rose-500/20 px-4 py-3 text-sm">
                  {error}
                </div>
              )}
            </div>

            <form onSubmit={handleSave} className="mt-6 grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-slate-200">
                Nama lokasi
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  placeholder="Contoh: Dapur Komunitas"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                Kategori
                <input
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  placeholder="Contoh: Makanan siap saji"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-200">
                Alamat singkat
                <input
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                  placeholder="Contoh: Jl. Sudirman 12"
                />
              </label>

              <button
                type="submit"
                disabled={isSaving}
                className="md:col-span-3 rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Lokasi'}
              </button>
            </form>
          </div>

          <div className="glass-card rounded-[2.5rem] border border-white/10 bg-slate-950/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Daftar Lokasi Tersimpan</h2>
                <p className="text-sm text-slate-400">Data diambil langsung dari tabel Supabase.</p>
              </div>
              <span className="text-xs bg-slate-900/70 px-3 py-1 rounded-full text-slate-300">{isLoading ? 'Memuat...' : `${locations.length} item`}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
                <thead>
                  <tr>
                    <th className="border-b border-white/10 px-4 py-3 font-medium text-slate-300">Nama Lokasi</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium text-slate-300">Kategori</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium text-slate-300">Alamat</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium text-slate-300">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-slate-500">Memuat data...</td>
                    </tr>
                  ) : locations.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-slate-500">Belum ada lokasi tersimpan.</td>
                    </tr>
                  ) : (
                    locations.map((location) => (
                      <tr key={location.id || `${location.name}-${location.address}`}>
                        <td className="border-b border-white/10 px-4 py-4">{location.name}</td>
                        <td className="border-b border-white/10 px-4 py-4">{location.category}</td>
                        <td className="border-b border-white/10 px-4 py-4">{location.address}</td>
                        <td className="border-b border-white/10 px-4 py-4 text-slate-400">
                          {location.created_at
                            ? new Date(location.created_at).toLocaleString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
