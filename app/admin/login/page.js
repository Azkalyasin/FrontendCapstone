'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import { SITE } from '@/lib/site-config';

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100';

const highlights = [
  'Kelola program belajar & jadwal',
  'Tindak lanjuti pendaftar baru',
  'Publikasikan prestasi siswa',
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '', rememberDevice: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim() || !formData.password) {
      setError('Username dan password harus diisi.');
      return;
    }

    setLoading(true);
    try {
      await login(formData.username.trim(), formData.password, formData.rememberDevice);
      const next = new URLSearchParams(window.location.search).get('next');
      router.replace(next && next.startsWith('/admin') ? next : '/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[1.05fr_1fr]">
      {/* Panel brand (desktop) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary-700 via-blue-600 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl" aria-hidden="true" />

        <Link href="/" className="relative inline-flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-primary-700 shadow-lg">BW</span>
          <span>
            <span className="block text-base font-bold">{SITE.name}</span>
            <span className="block text-[11px] font-medium tracking-[0.16em] text-blue-100 uppercase">{SITE.tagline}</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-blue-50">Panel pengelola</span>
          <h2 className="mt-5 text-4xl font-bold leading-tight">Satu tempat untuk mengelola kegiatan belajar.</h2>
          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-blue-50">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-blue-100/80">© {SITE.name}. Tumbuh bersama, berprestasi bersama.</p>
      </aside>

      {/* Form login */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-700 text-sm font-black text-white shadow-md shadow-primary-700/20">BW</span>
            <span className="text-sm font-bold text-slate-900">{SITE.name}</span>
          </Link>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></svg>
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Masuk sebagai admin</h1>
            <p className="mt-1.5 text-sm text-slate-500">Gunakan akun pengelola untuk masuk ke panel admin.</p>

            {error && (
              <p role="alert" className="mt-5 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v4m0 4h.01" /></svg>
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700">Username</span>
                <span className="relative block">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoFocus
                    className={`${fieldClass} pr-4`}
                    placeholder="Masukkan username"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700">Password</span>
                <span className="relative block">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    autoComplete="current-password"
                    className={`${fieldClass} pr-12`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7a12 12 0 0 1-3.2 4.3M6.6 6.6A12.4 12.4 0 0 0 2 12c1 2.5 5 7 10 7a9.6 9.6 0 0 0 4.4-1" /></svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </span>
              </label>

              <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.rememberDevice}
                  onChange={(e) => setFormData({ ...formData, rememberDevice: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary-700"
                />
                Ingat saya di perangkat ini
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition hover:-translate-y-0.5 hover:bg-primary-800 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    Memeriksa akun...
                  </>
                ) : (
                  <>
                    Masuk <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-400">
              Halaman ini khusus pengelola {SITE.name}. Lupa password? Hubungi pemilik akun admin.
            </p>
          </section>

          <Link href="/" className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary-700">
            <span aria-hidden="true">←</span> Kembali ke website
          </Link>
        </div>
      </main>
    </div>
  );
}
