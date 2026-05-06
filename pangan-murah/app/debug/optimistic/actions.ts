'use server';

import { revalidatePath } from 'next/cache';

export async function deleteItem(id: string) {
  // Simulasi delay pemrosesan hapus di database selama 2 detik
  // Dalam praktiknya ini adalah: await supabase.from('table').delete().eq('id', id);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Revalidasi path agar server mengetahui data telah berubah setelah berhasil
  revalidatePath('/debug/optimistic');
}
