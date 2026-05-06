'use server';

import { z } from 'zod';

export const userFormSchema = z.object({
  username: z
    .string({
      message: "Username wajib diisi dan harus berupa teks.",
    })
    .min(3, { message: "Username minimal harus 3 karakter." })
    .max(20, { message: "Username tidak boleh lebih dari 20 karakter." })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username hanya boleh berisi huruf, angka, dan underscore (_)." }),
  email: z
    .string({
      message: "Email wajib diisi dan harus berupa teks.",
    })
    .email({ message: "Format email tidak valid. Pastikan ada tanda '@'." }),
});

export type FormState = {
  errors?: {
    username?: string[];
    email?: string[];
  };
  message?: string;
};

export async function submitData(prevState: FormState, formData: FormData): Promise<FormState> {
  const username = formData.get('username');
  const email = formData.get('email');

  const validatedFields = userFormSchema.safeParse({
    username,
    email,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Gagal mengirim data. Silakan periksa kembali form Anda.',
    };
  }

  // Simulasi proses delay server misal simpan ke DB
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: 'Data berhasil disimpan!',
    errors: undefined,
  };
}
