'use client';

import { useOptimistic } from 'react';
import { deleteItem } from './actions';

type Item = { id: string; name: string };

export default function OptimisticList({ initialItems }: { initialItems: Item[] }) {
  // Gunakan useOptimistic. Menerima state awal (initialItems)
  // dan fungsi reducer untuk mengubah state saat proses optimis terjadi
  const [optimisticItems, addOptimisticDelete] = useOptimistic(
    initialItems,
    (currentState, idToRemove: string) => {
      // Buang item yang sedang dihapus dari UI secepat kilat
      return currentState.filter((item) => item.id !== idToRemove);
    }
  );

  return (
    <div className="space-y-4 max-w-md w-full">
      {optimisticItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-slate-900/50">
          <span className="text-slate-200 font-medium">{item.name}</span>
          
          <form
            action={async () => {
              // 1. Eksekusi Optimistic UI (Hapus dari layar secara instan)
              addOptimisticDelete(item.id);
              
              // 2. Kirim permintaan ke server
              // Jika ini gagal, useOptimistic akan otomatis mengembalikan data awal
              await deleteItem(item.id);
            }}
          >
            <button 
              type="submit"
              className="text-sm px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors"
            >
              Hapus
            </button>
          </form>
        </div>
      ))}

      {optimisticItems.length === 0 && (
        <p className="text-slate-500 text-center py-8">Semua data telah dihapus.</p>
      )}
    </div>
  );
}
