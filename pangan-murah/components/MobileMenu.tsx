'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

interface MobileMenuProps {
  user?: {
    role?: string;
  } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    window.location.href = '/login';
  };

  const menuLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/live-data', label: 'Katalog' },
  ];

  if (user?.role === 'seller') {
    menuLinks.push({ href: '/penjual', label: 'Penjual' });
  }

  if (user?.role === 'buyer') {
    menuLinks.push({ href: '/pembeli', label: 'Pembeli' });
  }

  if (user?.role === 'admin') {
    menuLinks.push({ href: '/admin', label: 'Admin' });
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300 shadow-xl shadow-black/20"
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute inset-x-6 top-20 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/30 z-50 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm uppercase tracking-[0.18em] text-slate-400">Navigasi</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cyan-300 hover:text-cyan-200 transition"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3 text-slate-200">
            {menuLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-slate-900/80 px-4 py-3 transition hover:bg-cyan-500/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/map"
              className="rounded-2xl bg-cyan-400 px-4 py-3 text-slate-950 transition hover:bg-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Cari Lokasi
            </Link>

            {!user ? (
              <div className="grid gap-2">
                <Link
                  href="/login"
                  className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-center transition hover:bg-slate-800"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-2xl bg-cyan-500 px-4 py-3 text-center text-slate-950 transition hover:bg-cyan-300"
                  onClick={() => setIsOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-slate-100 transition hover:bg-white/10 mt-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}