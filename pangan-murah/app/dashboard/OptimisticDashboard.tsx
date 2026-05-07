'use client';

import { useOptimistic, useState } from 'react';
import { deleteDashboardItem, updateDashboardItem } from './actions';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export default function OptimisticDashboard({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);

  // useOptimistic untuk penghapusan
  const [optimisticProducts, addOptimisticAction] = useOptimistic(
    products,
    (state, action: { type: 'delete'; id: string } | { type: 'update'; id: string; name: string }) => {
      if (action.type === 'delete') {
        return state.filter((p) => p.id !== action.id);
      }
      if (action.type === 'update') {
        return state.map((p) => (p.id === action.id ? { ...p, name: action.name } : p));
      }
      return state;
    }
  );

  const handleDelete = async (id: string) => {
    // 1. Trigger UI secara instan
    addOptimisticAction({ type: 'delete', id });
    
    // 2. Jalankan Server Action
    const result = await deleteDashboardItem(id);
    
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpdate = async (id: string, currentName: string) => {
    const newName = prompt('Update Nama Produk:', currentName);
    if (!newName || newName === currentName) return;

    // 1. Trigger UI secara instan
    addOptimisticAction({ type: 'update', id, name: newName });
    
    // 2. Jalankan Server Action
    const result = await updateDashboardItem(id, newName);
    
    if (result.success) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, name: newName } : p)));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {optimisticProducts.map((product) => (
        <div 
          key={product.id} 
          className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-blue-500/30 hover:-translate-y-2 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                📦
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-1">Stok</span>
                <span className="text-sm font-black text-white">{product.stock} Porsi</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-2xl font-black text-emerald-400 mb-8">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <div className="mt-auto flex gap-3">
              <button
                onClick={() => handleUpdate(product.id, product.name)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-95"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 px-4 py-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}

      {optimisticProducts.length === 0 && (
        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
          <p className="text-slate-500 font-medium">Semua produk telah dihapus secara optimis!</p>
        </div>
      )}
    </div>
  );
}
