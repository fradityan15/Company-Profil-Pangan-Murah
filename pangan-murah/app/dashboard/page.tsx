import OptimisticDashboard from './OptimisticDashboard';

export default async function DashboardPage() {
  // Simulasi fetch data yang lambat (2 detik) untuk menunjukkan loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const initialProducts = [
    { id: '1', name: 'Roti Gandum Utuh', stock: 12, price: 15000 },
    { id: '2', name: 'Nasi Kuning Box', stock: 5, price: 12000 },
    { id: '3', name: 'Donat Glazed', stock: 20, price: 8000 },
    { id: '4', name: 'Sayur Sop Siap Masak', stock: 8, price: 10000 },
    { id: '5', name: 'Buah Potong Mix', stock: 15, price: 18000 },
    { id: '6', name: 'Susu Kedelai Fresh', stock: 10, price: 7000 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 p-6 md:p-12 lg:p-20 relative selection:bg-blue-500/30">
      {/* Background Ornaments */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight">
            Optimistic Dashboard
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
            Kelola produk dengan kecepatan instan. Perubahan akan langsung terlihat di layar Anda sementara server memproses data di latar belakang.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Produk', value: initialProducts.length, icon: '📊' },
            { label: 'Stok Habis', value: 0, icon: '⚠️' },
            { label: 'Pesanan Baru', value: 12, icon: '🔔' },
            { label: 'Pendapatan', value: 'Rp 450k', icon: '💰' },
          ].map((stat, i) => (
            <div key={i} className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                <span className="text-xl group-hover:scale-125 transition-transform">{stat.icon}</span>
              </div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Daftar Inventaris</h2>
              <p className="text-slate-500 text-sm">Klik Hapus atau Update untuk melihat Optimistic UI bekerja.</p>
            </div>
            <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20">
              + Tambah Baru
            </button>
          </div>

          <OptimisticDashboard initialProducts={initialProducts} />
        </section>
      </div>
    </div>
  );
}
