import { createClient } from '@supabase/supabase-js';

// ❌ JANGAN pakai ! di sini
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ CLIENT (React)
export const supabase =
  url && key ? createClient(url, key) : null;

// ✅ SERVER (API)
export function getSupabase() {
  if (!url || !key) {
    throw new Error('Supabase env missing');
  }
  return createClient(url, key);
}