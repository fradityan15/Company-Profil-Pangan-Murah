import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    // Get semua akun dengan email admin untuk verifikasi
    const { data, error } = await supabase
      .from('users')
      .select('id,email,full_name,role,created_at')
      .or('email.ilike.admin%,email.ilike.%admin%')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Debug admin GET error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      admin_accounts: data || [],
      total: (data || []).length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Debug admin error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
