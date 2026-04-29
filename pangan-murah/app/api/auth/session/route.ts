import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get('cookie') || '';
    const sessionMatch = cookies.match(/pangan_session=([^;]+)/);

    if (!sessionMatch || !sessionMatch[1]) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    try {
      const user = JSON.parse(decodeURIComponent(sessionMatch[1]));
      return NextResponse.json({
        authenticated: true,
        user,
      });
    } catch (err) {
      console.error('Failed to parse session:', err);
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Check session error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengecek sesi' },
      { status: 500 }
    );
  }
}
