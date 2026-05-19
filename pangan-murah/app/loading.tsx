export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-20 w-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 duration-1000"></span>
          <span className="relative inline-flex rounded-full h-20 w-20 bg-emerald-500/10 border border-emerald-500/30 items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 animate-pulse"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-emerald-400 font-black uppercase tracking-[0.3em] text-sm animate-pulse">Menyiapkan Halaman</div>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
