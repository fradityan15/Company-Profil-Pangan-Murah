'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push('/login');
  };

  const menuLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/live-data', label: 'Katalog' },
    { href: '/about', label: 'Tentang' },
    { href: '/contact', label: 'Kontak' },
  ];

  const userIconLink = user ? (
    user.role === 'seller' ? '/penjual' : user.role === 'buyer' ? '/pembeli' : '/admin'
  ) : '/login';

  return (
    <nav className="sticky top-0 z-100 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between gap-4 px-6">
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-white transition-all flex items-center group">
          <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-saya.png" alt="Logo Pangan Murah" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
          </div>
          <span className="flex items-center leading-none -ml-4 md:-ml-6 pt-1 z-0">
            <span className="group-hover:text-slate-200 transition-colors">Pangan</span><span className="text-green-400 group-hover:text-green-300 transition-colors">Murah</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.18em] text-slate-300">
          {menuLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-300">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <Link href="/register" className="rounded-full bg-green-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-300">
              Daftar
            </Link>
          ) : (
            <Link href="/map" className="rounded-full bg-green-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-300">
              Cari Lokasi
            </Link>
          )}

          {user ? (
            <div className="relative flex items-center gap-2" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-xl">
                  <Link
                    href={userIconLink}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Profil
                  </Link>
                  {user.role === 'buyer' && (
                    <Link
                      href="/pembeli/riwayat"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Riwayat Pembelian
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-xl px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                Login
              </Link>
            </div>
          )}
        </div>

        <MobileMenu user={user} />
      </div>
    </nav>
  );
}
