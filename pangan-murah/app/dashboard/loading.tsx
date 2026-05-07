export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 p-6 md:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded-xl animate-pulse" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-[2rem] border border-white/5 animate-pulse" />
          ))}
        </div>

        {/* Content Section Skeleton */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-10 w-32 bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] border border-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
