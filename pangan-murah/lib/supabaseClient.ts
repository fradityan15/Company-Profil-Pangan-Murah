import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// untuk CLIENT (React)
export const supabase = createClient(url, key);

// untuk SERVER (API)
export function getSupabase() {
  if (!url || !key) {
    throw new Error('Supabase env missing');
  }
  return createClient(url, key);
}