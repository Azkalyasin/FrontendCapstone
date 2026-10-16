'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Beranda', href: '/' },
    { label: 'Program', href: '/program' },
    { label: 'Prestasi', href: '/achievement' },
    { label: 'Tentang Kami', href: '/profil' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-700 text-sm font-black text-white shadow-md shadow-primary-700/20">
              BW
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-slate-900">Bimble Wanda</span>
              <span className="block text-[10px] font-medium tracking-[0.16em] text-slate-500 uppercase">Belajar, tumbuh, berprestasi</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-primary-50 text-primary-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/daftar" className="ml-3 inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-700/20 transition-all hover:-translate-y-0.5 hover:bg-primary-800">
              Daftar sekarang
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden" aria-label="Navigasi seluler">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${pathname === link.href ? 'bg-primary-50 text-primary-800' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/daftar" onClick={() => setMenuOpen(false)} className="mt-2 rounded-xl bg-primary-700 px-4 py-3 text-center text-sm font-semibold text-white">
                Daftar sekarang
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-sm font-black">BW</span>
              <span className="text-base font-bold">Bimble Wanda</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Teman belajar yang mendampingi setiap langkah kecil menuju masa depan yang lebih cerah.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Jelajahi</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link className="transition hover:text-white" href="/program">Program belajar</Link>
              <Link className="transition hover:text-white" href="/achievement">Prestasi siswa</Link>
              <Link className="transition hover:text-white" href="/profil">Tentang kami</Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Mulai langkah baru</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">Temukan program yang cocok dan bicarakan kebutuhan belajar bersama tim kami.</p>
            <Link href="/daftar" className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Konsultasi & daftar <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-slate-500">
          © Bimble Wanda. Tumbuh bersama, berprestasi bersama.
        </div>
      </footer>
    </div>
  );
}
