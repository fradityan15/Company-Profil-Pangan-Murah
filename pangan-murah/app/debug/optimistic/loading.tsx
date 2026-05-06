export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] p-8 flex flex-col">
      {/* Skeleton untuk judul & deskripsi */}
      <div className="h-10 w-64 bg-slate-800 rounded-lg animate-pulse mb-6"></div>
      <div className="h-4 w-96 bg-slate-800 rounded animate-pulse mb-8"></div>
      <div className="h-4 w-80 bg-slate-800 rounded animate-pulse mb-10"></div>
      
      {/* Skeleton untuk list item */}
      <div className="space-y-4 max-w-md w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[74px] w-full bg-slate-800 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
