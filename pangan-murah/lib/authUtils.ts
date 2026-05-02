import bcrypt from 'bcrypt';
import { getSupabase } from './supabaseClient';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function registerUser(
  email: string,
  password: string,
  full_name: string,
  role: 'buyer' | 'seller' | 'admin' = 'buyer'
) {
  const supabase = getSupabase();

  try {
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new Error('Gagal memeriksa email yang sudah ada');
    }

    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }

    const passwordHash = await hashPassword(password);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          full_name,
          role,
        },
      ])
      .select()
      .single();

    if (error) {
      // fallback kalau kolom role belum ada
      if (error.message?.includes('column "role"')) {
        const fallback = await supabase
          .from('users')
          .insert([
            {
              email,
              password_hash: passwordHash,
              full_name,
            },
          ])
          .select()
          .single();

        if (fallback.error) {
          throw new Error('Gagal menyimpan data user');
        }

        return {
          id: fallback.data.id,
          email: fallback.data.email,
          full_name: fallback.data.full_name,
          role: 'buyer',
        };
      }

      throw new Error('Gagal menyimpan data user');
    }

    return {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role || 'buyer',
    };
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new Error('Email atau password salah');
    }

    const isValid = await verifyPassword(password, data.password_hash);

    if (!isValid) {
      throw new Error('Email atau password salah');
    }

    return {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role || 'buyer',
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}