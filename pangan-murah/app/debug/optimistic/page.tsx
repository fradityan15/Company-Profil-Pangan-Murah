import OptimisticList from './OptimisticList';

export default async function OptimisticPage() {
  // Simulasi fetch data awal yang sangat lambat (2 detik)
  // Ini akan secara otomatis memicu Next.js untuk menampilkan file `loading.tsx` terlebih dahulu!
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Data Dummy yang diterima dari server
  const initialItems = [
    { id: '1', name: 'Beras Premium 5kg' },
    { id: '2', name: 'Minyak Goreng 2L' },
    { id: '3', name: 'Gula Pasir 1kg' },
    { id: '4', name: 'Telur Ayam 1kg' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] p-8 flex flex-col">
      <h1 className="text-3xl font-black text-white mb-2">Optimistic UI Demo</h1>
      <p className="text-slate-400 mb-2 max-w-lg">
        File <code>loading.tsx</code> baru saja aktif selama 2 detik pertama!
      </p>
      <p className="text-slate-400 mb-10 max-w-lg">
        Sekarang coba klik tombol <span className="text-rose-400">Hapus</span>. UI akan langsung menghilangkan elemen seketika tanpa menunggu delay dari server! (Server action diset delay 2 detik).
      </p>
      
      {/* Mengirim data dari Server ke Client Component */}
      <OptimisticList initialItems={initialItems} />
    </div>
  );
}
