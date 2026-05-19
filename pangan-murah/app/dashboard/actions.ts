'use server';

import { revalidatePath } from 'next/cache';

// Simulasi database atau call ke Supabase
// Untuk demo ini kita hanya simulasi delay dan revalidate
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteDashboardItem(id: string) {
  // Simulasi network delay 2 detik agar efek Optimistic UI terlihat jelas
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Dalam realitas, panggil supabase:
  // await supabase.from('products').delete().eq('id', id);
  
  revalidatePath('/dashboard');
  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateDashboardItem(id: string, newName: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  revalidatePath('/dashboard');
  return { success: true };
}
