'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-xl shadow-black/20 flex items-center justify-between gap-3 text-sm uppercase tracking-[0.22em] text-blue-300"
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute top-20 left-6 right-6 rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20 z-50">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-300 hover:text-blue-400 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2 text-slate-200">
            <Link href="/" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/service" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>Service</Link>
            <Link href="/live-data" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>Katalog</Link>
            <Link href="/contact" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/map" className="rounded-2xl px-4 py-3 transition hover:bg-blue-500" onClick={() => setIsOpen(false)}>Cari Lokasi</Link>
          </div>
        </div>
      )}
    </div>
  );
}