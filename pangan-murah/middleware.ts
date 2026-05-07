import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware Global untuk memproteksi SELURUH fitur aplikasi.
 * Hanya mengizinkan akses ke halaman Login, Register, dan aset statis tanpa login.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authSession = request.cookies.get('pangan_session');

  // Daftar rute yang DIKECUALIKAN dari proteksi (Public Routes)
  const isPublicRoute = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/api/auth');

  // Jika bukan rute publik dan tidak ada session, redirect ke login
  if (!isPublicRoute && !authSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Jalankan middleware pada semua rute KECUALI:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Aset gambar (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
