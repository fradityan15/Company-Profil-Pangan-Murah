import { registerUser } from '@/lib/authUtils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, full_name, role } = await request.json();

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Email, password, dan nama harus diisi' },
        { status: 400 }
      );
    }

    const validatedRole = role === 'seller' ? 'seller' : 'buyer';
    const user = await registerUser(email, password, full_name, validatedRole);

    const response = NextResponse.json({
      user,
      message: 'Registrasi berhasil',
    });

    // Set session cookie
    response.cookies.set('pangan_session', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error.message || 'Registrasi gagal' },
      { status: 400 }
    );
  }
}
