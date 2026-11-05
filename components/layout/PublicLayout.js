'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ContactFab from '@/components/layout/ContactFab';
import { MailIcon, PinIcon, TelegramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { SITE, formatPhone, hasTelegram, hasWhatsApp, telegramLink, whatsappLink } from '@/lib/site-config';

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Beranda', href: '/' },
    { label: 'Program', href: '/program' },
    { label: 'Prestasi', href: '/achievement' },
    { label: 'Profil', href: '/profil' },
    { label: 'Kontak', href: '/profil#kontak' },
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
              <span className="block text-sm font-bold tracking-tight text-slate-900">{SITE.name}</span>
              <span className="block text-[10px] font-medium tracking-[0.16em] text-slate-500 uppercase">{SITE.tagline}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {links.map((link) => {
              const active = pathname === link.href || (pathname === '/profil' && link.href === '/profil#kontak');
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
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${pathname === link.href || (pathname === '/profil' && link.href === '/profil#kontak') ? 'bg-primary-50 text-primary-800' : 'text-slate-600 hover:bg-slate-50'}`}
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

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-sm font-black">BW</span>
              <span className="text-base font-bold">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Teman belajar yang mendampingi setiap langkah kecil menuju masa depan yang lebih cerah.</p>
            {(hasWhatsApp || hasTelegram) && (
              <div className="mt-5 flex gap-2">
                {hasWhatsApp && (
                  <a href={whatsappLink(`Halo ${SITE.name}, saya ingin bertanya.`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#25D366]"><WhatsAppIcon /></a>
                )}
                {hasTelegram && (
                  <a href={telegramLink()} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#229ED9]"><TelegramIcon /></a>
                )}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold">Jelajahi</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link className="transition hover:text-white" href="/program">Program belajar</Link>
              <Link className="transition hover:text-white" href="/achievement">Prestasi siswa</Link>
              <Link className="transition hover:text-white" href="/profil">Profil</Link>
              <Link className="transition hover:text-white" href="/daftar">Pendaftaran</Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Hubungi kami</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {hasWhatsApp && <li className="flex items-start gap-2.5"><WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><a className="transition hover:text-white" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{formatPhone(SITE.whatsapp)}</a></li>}
              {hasTelegram && <li className="flex items-start gap-2.5"><TelegramIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><a className="transition hover:text-white" href={telegramLink()} target="_blank" rel="noopener noreferrer">@{SITE.telegram}</a></li>}
              {SITE.email && <li className="flex items-start gap-2.5"><MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><a className="break-all transition hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
              {SITE.address && <li className="flex items-start gap-2.5"><PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><span>{SITE.address}</span></li>}
              {!hasWhatsApp && !hasTelegram && !SITE.email && !SITE.address && <li><Link className="transition hover:text-white" href="/profil#kontak">Lihat halaman kontak</Link></li>}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Mulai langkah baru</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">Temukan program yang cocok dan bicarakan kebutuhan belajar bersama tim kami.</p>
            <Link href="/daftar" className="mt-4 inline-flex items-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-500">Daftar sekarang <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:px-8">
            <span>© {SITE.name}. Tumbuh bersama, berprestasi bersama.</span>
            <span>{SITE.tagline}</span>
          </div>
        </div>
      </footer>

      <ContactFab />
    </div>
  );
}
