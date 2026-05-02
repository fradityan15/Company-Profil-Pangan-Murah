'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const menuLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/live-data', label: 'Katalog' },
  ];

  if (user?.role === 'seller') {
    menuLinks.push({ href: '/seller', label: 'Penjual' });
  }

  if (user?.role === 'buyer') {
    menuLinks.push({ href: '/buyer', label: 'Pembeli' });
  }

  if (user?.role === 'admin') {
    menuLinks.push({ href: '/admin', label: 'Admin' });
  }

  return (
    <nav className="sticky top-0 z-100 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between gap-4 px-6">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white transition-transform hover:scale-105">
          Pangan<span className="text-green-400">Murah</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.18em] text-slate-300">
          {menuLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-300">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/map" className="rounded-full bg-green-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-300">
            Cari Lokasi
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:text-white">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                Daftar
              </Link>
            </div>
          )}
        </div>

        <MobileMenu user={user} />
      </div>
    </nav>
  );
}
