'use server';

import { revalidatePath } from 'next/cache';

// Simulasi database atau call ke Supabase
// Untuk demo ini kita hanya simulasi delay dan revalidate
export async function deleteDashboardItem(id: string) {
  // Simulasi network delay 2 detik agar efek Optimistic UI terlihat jelas
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  console.log(`Item with ID ${id} deleted from server database.`);
  
  // Dalam realitas, panggil supabase:
  // await supabase.from('products').delete().eq('id', id);
  
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateDashboardItem(id: string, newName: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  console.log(`Item with ID ${id} updated to ${newName} on server.`);
  
  revalidatePath('/dashboard');
  return { success: true };
}
