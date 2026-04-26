import Link from 'next/link';

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_30%)]" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <section className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center pb-20 border-b border-white/10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight animate-pop-in animate-pop-in-delay-1">
                Mari <span className="text-blue-400">Berkolaborasi</span> untuk Masa Depan Pangan yang Lebih Baik.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl animate-pop-in animate-pop-in-delay-2">
                Kami terbuka untuk kemitraan dengan UMKM, komunitas, dan individu yang ingin berkontribusi dalam mengurangi limbah pangan. Hubungi kami untuk diskusi lebih lanjut.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 animate-pop-in animate-pop-in-delay-3">
              <Link href="mailto:contact@panganmurah.id" className="inline-flex items-center justify-center rounded-full bg-green-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-green-400 hover:scale-105">
                📧 Email Kami
              </Link>
              <Link href="https://wa.me/6281234567890" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-10 py-4 text-base font-black text-slate-100 transition-all duration-300 hover:border-green-400 hover:text-green-300 hover:bg-slate-500/10 hover:scale-105">
                💬 WhatsApp
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-card rounded-4xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30 animate-pop-in-right animate-pop-in-delay-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white animate-pop-in-up">Informasi Kontak</p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4 animate-pop-in-left animate-pop-in-delay-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-500/20 text-2xl animate-pop-in-bounce">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 animate-pop-in-up" style={{animationDelay: '0.3s'}}>Email</p>
                    <p className="text-white font-semibold animate-pop-in-up" style={{animationDelay: '0.4s'}}>contact@panganmurah.id</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 animate-pop-in-left animate-pop-in-delay-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-500/20 text-2xl animate-pop-in-bounce" style={{animationDelay: '0.1s'}}>
                    📱
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 animate-pop-in-up" style={{animationDelay: '0.5s'}}>WhatsApp</p>
                    <p className="text-white font-semibold animate-pop-in-up" style={{animationDelay: '0.6s'}}>+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 animate-pop-in-left animate-pop-in-delay-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-500/20 text-2xl animate-pop-in-bounce" style={{animationDelay: '0.2s'}}>
                    📍
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 animate-pop-in-up" style={{animationDelay: '0.7s'}}>Lokasi</p>
                    <p className="text-white font-semibold animate-pop-in-up" style={{animationDelay: '0.8s'}}>Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-4xl border border-white/10 bg-linear-to-br from-slate-900/80 to-slate-800/80 p-8 shadow-xl shadow-slate-950/30 animate-pop-in-right animate-pop-in-delay-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white animate-pop-in-up">Jam Operasional</p>
              <h2 className="mt-6 text-3xl font-black text-white leading-tight animate-pop-in-up animate-pop-in-delay-1">Senin - Jumat<br />09:00 - 17:00 WIB</h2>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            { title: 'Kemitraan UMKM', desc: 'Bergabunglah sebagai mitra penjual dan dapatkan dukungan penuh dari platform kami.', icon: '🤝' },
            { title: 'Kolaborasi Komunitas', desc: 'Mari bekerja sama mengurangi limbah pangan di lingkungan sekitar.', icon: '🌱' },
            { title: 'Dukungan Pengembang', desc: 'Kontribusi kode dan teknologi untuk misi bersama.', icon: '💻' },
          ].map((item, index) => (
            <div key={item.title} className={`glass-card rounded-4xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-pop-in animate-pop-in-delay-${index + 1}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br from-slate-500 to-cyan-500 text-2xl text-white mb-6 animate-pop-in-bounce" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 animate-pop-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>{item.title}</h3>
              <p className="text-slate-400 leading-8 animate-pop-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-24 rounded-4xl border border-white/10 bg-linear-to-br from-slate-900/80 to-slate-800/80 p-12 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.9)] animate-pop-in animate-pop-in-delay-1">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 animate-pop-in-left">Siap Berkolaborasi?</p>
              <h2 className="mt-4 text-4xl font-black text-white leading-tight animate-pop-in-up animate-pop-in-delay-1">Setiap kemitraan adalah langkah menuju Indonesia yang lebih berkelanjutan.</h2>
            </div>
            <div className="space-y-4 text-slate-300 animate-pop-in-right animate-pop-in-delay-1">
              <p className="leading-8 animate-pop-in-up animate-pop-in-delay-2">Kami percaya bahwa dengan kolaborasi yang kuat, kita dapat menciptakan dampak yang lebih besar untuk komunitas dan lingkungan.</p>
              <Link href="mailto:contact@panganmurah.id" className="inline-flex items-center justify-center rounded-full bg-green-500 px-10 py-4 text-base font-black text-slate-950 transition-all duration-300 hover:bg-green-400 hover:scale-105 animate-pop-in-bounce animate-pop-in-delay-3">
                Mulai Kolaborasi
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}