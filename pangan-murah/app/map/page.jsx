'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../../lib/supabaseClient';

const MapComponent = dynamic(() => import('../../components/MapComponent'), { ssr: false });

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('rescue_locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setLocations(data);
      }
      setLoading(false);
    }
    fetchLocations();
    
    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:rescue_locations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rescue_locations' }, (payload) => {
        setLocations((current) => [payload.new, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
              Peta <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse">Penyelamatan</span>
            </h1>
            <p className="text-slate-400 mt-2 font-light">Temukan titik penyelamatan makanan terdekat yang disiarkan langsung oleh para penjual.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors hover:scale-105 inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[500px] sm:h-[600px] bg-black/40 rounded-[2.5rem] border border-white/5 relative overflow-hidden animate-fade-in shadow-2xl backdrop-blur-xl" style={{ animationDelay: '0.2s' }}>
            <MapComponent locations={locations} />
          </div>

          <div className="space-y-4 animate-fade-in flex flex-col max-h-[600px]" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-emerald-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Tersedia Sekarang
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {locations.length} Lokasi
              </span>
            </div>

            <div className="overflow-y-auto pr-2 space-y-4 flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mb-3 text-emerald-500/50"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  <p className="text-sm">Menyinkronkan satelit...</p>
                </div>
              ) : locations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-600 bg-white/[0.02] rounded-[2rem] border border-white/5 border-dashed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                  <p className="text-sm">Belum ada siaran lokasi aktif.</p>
                </div>
              ) : (
                locations.map((loc, index) => (
                  <div key={loc.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-lg backdrop-blur-md relative overflow-hidden" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-inner shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg leading-tight group-hover:text-emerald-400 transition-colors duration-300">{loc.name}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md">
                                {loc.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mb-5 line-clamp-2 leading-relaxed">{loc.address}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-amber-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {new Date(loc.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <button className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors duration-300 flex items-center gap-1.5">
                          Arahkan
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white/[0.01] p-5 rounded-[2rem] border border-white/5 border-dashed shrink-0">
              <div className="text-center flex flex-col items-center">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <p className="text-xs text-slate-400">Peta diperbarui secara otomatis ketika ada titik baru yang disiarkan oleh penjual.</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
