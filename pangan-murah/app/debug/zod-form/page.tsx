'use client';

import { useActionState } from 'react';
import { submitData } from './actions';

export default function ZodFormPage() {
  const [state, formAction, isPending] = useActionState(submitData, { message: '', errors: undefined });

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-slate-900/50">
          <h1 className="text-3xl font-black text-white mb-2">Uji Coba Zod Form</h1>
          <p className="text-sm text-slate-400 mb-8">
            Implementasi Validasi Zod dengan Server Action
          </p>

          <form action={formAction} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="block text-sm text-slate-200 mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Contoh: budi_santoso"
              />
              {state.errors?.username && (
                <p className="text-rose-400 text-sm mt-2">{state.errors.username[0]}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="block text-sm text-slate-200 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                placeholder="Contoh: budi@email.com"
              />
              {state.errors?.email && (
                <p className="text-rose-400 text-sm mt-2">{state.errors.email[0]}</p>
              )}
            </div>

            {state.message && (
              <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${state.errors ? 'bg-rose-500/10 text-rose-200 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'}`}>
                {state.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full mt-6 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? 'Memvalidasi...' : 'Kirim'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
