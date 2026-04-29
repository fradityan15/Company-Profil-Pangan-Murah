-- Supabase SQL: buat tabel produk untuk katalog penjual

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null,
  seller_email text not null,
  name text not null,
  description text,
  category text,
  price numeric not null,
  stock integer not null default 0,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products
  for select using (true);

drop policy if exists "Public can insert products" on public.products;
create policy "Public can insert products" on public.products
  for insert with check (true);
