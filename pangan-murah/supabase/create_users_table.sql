-- Supabase SQL: buat tabel users untuk autentikasi

create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  full_name text,
  phone text,
  role text not null default 'buyer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pastikan kolom role ada pada tabel yang sudah dibuat sebelumnya
alter table public.users
  add column if not exists role text not null default 'buyer';

-- Disable RLS temporarily for testing
alter table public.users
  disable row level security;

-- Re-enable RLS and create policies
alter table public.users
  enable row level security;

-- Policy untuk read - semua orang bisa read (untuk login check)
drop policy if exists "Anyone can read users for auth" on public.users;
create policy "Anyone can read users for auth" on public.users
  for select using (true);

-- Policy untuk insert registrasi (anon bisa insert)
drop policy if exists "Anyone can register" on public.users;
create policy "Anyone can register" on public.users
  for insert with check (true);

-- Policy untuk update - semua orang bisa update (untuk custom auth)
drop policy if exists "Anyone can update users" on public.users;
create policy "Anyone can update users" on public.users
  for update using (true);
