import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

function parseSession(request: Request) {
  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(/pangan_session=([^;]+)/);
  if (!match || !match[1]) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch (err) {
    console.error('Failed to parse session cookie:', err);
    return null;
  }
}

export async function GET(request: Request) {
  const session = parseSession(request);
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('users')
    .select('id,email,full_name,role,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil daftar pengguna' }, { status: 500 });
  }

  return NextResponse.json({ users: data || [] });
}

export async function PATCH(request: Request) {
  const session = parseSession(request);
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
  }

  const { id, role } = await request.json();
  if (!id || !role || !['buyer', 'seller', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Data role tidak valid' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Admin users PATCH error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui role pengguna' }, { status: 500 });
  }

  return NextResponse.json({ user: data });
}
