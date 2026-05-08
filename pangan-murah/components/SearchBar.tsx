'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Update URL tanpa reload halaman
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Cari makanan..."
        className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
