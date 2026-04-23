import Link from 'next/link';

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans">
      {/* Latar Belakang Dekoratif */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full z-0"></div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32">
        {/* Header Halaman */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Misi Kami: <br />
            <span className="text-green-500 italic">Nol Limbah Pangan.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Pangan Murah lahir dari keresahan melihat banyaknya makanan berkualitas yang terbuang sia-sia setiap harinya, sementara akses ke pangan terjangkau masih menjadi tantangan.
          </p>
        </div>

        {/* Konten Utama - Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-4">Mengapa Kami Ada?</h3>
            <p className="text-slate-400 leading-relaxed">
              Setiap tahun, berton-ton makanan layak konsumsi dari toko, bakery, dan restoran berakhir di tempat sampah hanya karena tidak terjual di akhir hari. Kami hadir sebagai jembatan digital untuk menghubungkan makanan tersebut kepada kamu yang menghargai kualitas dan nilai ekonomi.
            </p>
          </div>
          <div className="bg-green-600/10 p-10 rounded-[2.5rem] border border-green-500/20">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Dampak Sosial</h3>
            <p className="text-slate-400 leading-relaxed">
              Dengan menyelamatkan satu porsi makanan, kamu tidak hanya menghemat uang, tetapi juga membantu mengurangi emisi gas metana dari limbah organik yang merusak lapisan ozon.
            </p>
          </div>
        </div>

        {/* Tim / Lokasi */}
        <div className="border-t border-white/5 pt-16">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Berdampak Dari Lokal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📍</div>
              <h4 className="font-bold text-white mb-2">Lokasi Utama</h4>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Indonesia</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-bold text-white mb-2">Kolaborasi</h4>
              <p className="text-sm text-slate-500 uppercase tracking-widest">120+ Mitra UMKM Lokal</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="font-bold text-white mb-2">Visi 2030</h4>
              <p className="text-sm text-slate-500 uppercase tracking-widest">Indonesia Bebas Limbah Pangan</p>
            </div>
          </div>
        </div>

        {/* Tombol Kembali ke Beranda */}
        <div className="mt-24 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-green-500 font-black hover:gap-4 transition-all uppercase tracking-widest text-sm">
            ← Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}