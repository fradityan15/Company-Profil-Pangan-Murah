-- Supabase SQL: buat tabel pesanan pembeli untuk checkout

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null,
  buyer_email text not null,
  product_id uuid not null,
  product_name text not null,
  quantity integer not null default 1,
  total_price numeric not null,
  status text not null default 'pending',
  payment_method text not null default 'QRIS',
  payment_status text not null default 'waiting',
  qr_code text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Public can read orders" on public.orders;
create policy "Public can read orders" on public.orders
  for select using (true);

drop policy if exists "Public can insert orders" on public.orders;
create policy "Public can insert orders" on public.orders
  for insert with check (true);