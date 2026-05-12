-- Supabase SQL: Menambahkan akses UPDATE dan DELETE untuk tabel produk

-- Mengizinkan update produk
drop policy if exists "Public can update products" on public.products;
create policy "Public can update products" on public.products
  for update using (true);

-- Mengizinkan delete produk (opsional, jika Anda menggunakan soft delete)
drop policy if exists "Public can delete products" on public.products;
create policy "Public can delete products" on public.products
  for delete using (true);
