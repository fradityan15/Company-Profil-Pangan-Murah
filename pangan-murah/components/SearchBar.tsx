'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchBar({ placeholder = "Cari data..." }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // Menggunakan useTransition agar UI tidak membeku saat Next.js memperbarui URL dan Server Component me-render ulang
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    // Membuat instance baru dari URLSearchParams berdasarkan parameter yang ada saat ini
    const params = new URLSearchParams(searchParams);
    
    // Set atau hapus parameter 'q' (query)
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    // Gunakan router.replace untuk update URL tanpa memicu hard-reload.
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative flex w-full max-w-md shrink-0 mb-6">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        type="text"
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 pl-10 text-slate-100 outline-none focus:border-cyan-400"
        placeholder={placeholder}
        // defaultValue memastikan input tetap menyimpan hasil pencarian (persist) setelah page di-refresh
        defaultValue={searchParams.get('q')?.toString()} 
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* Ikon Kaca Pembesar */}
      <svg
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Indikator Loading Transisi */}
      {isPending && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </div>
  );
}
