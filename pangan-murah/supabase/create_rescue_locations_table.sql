-- Supabase SQL: buat tabel untuk menyimpan lokasi penyelamatan makanan
-- Gunakan SQL Editor Supabase atau Supabase CLI untuk menjalankan skrip ini.

create extension if not exists "uuid-ossp";

create table if not exists public.rescue_locations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  address text not null,
  created_at timestamptz not null default now()
);

alter table public.rescue_locations
  enable row level security;

-- Jika perlu, tambahkan policy publik yang mengizinkan insert/select
-- untuk demo client-side. Pastikan kebijakan keamanan disesuaikan
-- sebelum mempublikasikan aplikasi.

-- contoh simple policy untuk read/insert:
create policy "Public read access" on public.rescue_locations
  for select using (true);

create policy "Public insert access" on public.rescue_locations
  for insert with check (true);
