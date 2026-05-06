import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mengecek apakah cookie 'pangan_session' ada
  const authSession = request.cookies.get('pangan_session');

  // Jika tidak ada cookie 'pangan_session', arahkan pengguna ke halaman /login
  if (!authSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika cookie ada, izinkan request dilanjutkan
  return NextResponse.next();
}

// Menentukan rute mana saja yang akan diproteksi oleh middleware ini
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static files (svg, png, jpg, etc.)
     * - favicon.ico (favicon file)
     * - login (halaman login)
     * - register (halaman register)
     */
    '/((?!api/auth|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|favicon.ico|login|register).*)',
  ],
};
