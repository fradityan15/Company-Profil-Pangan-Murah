-- Supabase SQL: Menambahkan fitur upload gambar untuk produk

-- 1. Tambahkan kolom image_url ke tabel products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Buat storage bucket untuk menyimpan gambar produk
insert into storage.buckets (id, name, public) 
values ('products', 'products', true) 
ON CONFLICT (id) DO NOTHING;

-- 3. Kebijakan (Policy) Storage untuk mengizinkan akses ke gambar

-- Mengizinkan semua orang melihat gambar produk
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects 
for select using ( bucket_id = 'products' );

-- Mengizinkan pengguna terautentikasi (atau siapa saja yang bisa insert produk) untuk mengunggah gambar
drop policy if exists "Upload Access" on storage.objects;
create policy "Upload Access" on storage.objects 
for insert with check ( bucket_id = 'products' );

-- Mengizinkan update
drop policy if exists "Update Access" on storage.objects;
create policy "Update Access" on storage.objects 
for update using ( bucket_id = 'products' );

-- Mengizinkan delete
drop policy if exists "Delete Access" on storage.objects;
create policy "Delete Access" on storage.objects 
for delete using ( bucket_id = 'products' );
