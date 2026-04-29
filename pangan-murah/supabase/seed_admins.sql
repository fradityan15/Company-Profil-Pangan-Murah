-- Supabase SQL: Tambahkan akun admin khusus untuk Pangan Murah.
-- Gunakan skrip ini hanya jika tabel users sudah ada.

alter table public.users
  add column if not exists role text not null default 'buyer';

alter table public.users enable row level security;

drop policy if exists "Anyone can read users for auth" on public.users;
drop policy if exists "Anyone can register" on public.users;
drop policy if exists "Anyone can update users" on public.users;

create policy "Anyone can read users for auth" on public.users
  for select using (true);

create policy "Anyone can register" on public.users
  for insert with check (true);

create policy "Anyone can update users" on public.users
  for update using (true);

insert into public.users (email, password_hash, full_name, role)
values
  ('admin1@panganmurah.id', '$2b$10$AH53J7E1yAqULdUvGlrpmuopCB09e47NHZAyq7Vfj6qnXcVucrR4.', 'Admin Satu', 'admin'),
  ('admin2@panganmurah.id', '$2b$10$4wR70K7YLacC1VlKoaIInuRISZlE/R9t6d8271KNSUAgHR/dOe8QW', 'Admin Dua', 'admin'),
  ('admin3@panganmurah.id', '$2b$10$TsByUR0BO6eYydbVEOUsY.hMalMHQgE.HStEbtHBkoJvEHe.fALWS', 'Admin Tiga', 'admin'),
  ('admin4@panganmurah.id', '$2b$10$LiJrV5wewoeaK9X5kRTwJ.WCDEkaz9H4FRc5wKELm56hJHRKJja5m', 'Admin Empat', 'admin'),
  ('admin5@panganmurah.id', '$2b$10$X8K1v5wewoeaK9X5kRTwJ.WCDEkaz9H4FRc5wKELm56hJHRKJja5m', 'Admin Lima', 'admin')
on conflict (email) do update set
  full_name = excluded.full_name,
  role = excluded.role;

-- Password default untuk akun admin:
-- admin1@panganmurah.id -> Admin123!
-- admin2@panganmurah.id -> Admin456!
-- admin3@panganmurah.id -> Admin789!
-- admin4@panganmurah.id -> Admin000!
