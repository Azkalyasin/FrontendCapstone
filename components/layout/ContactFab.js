'use client';

import { useState } from 'react';
import { SITE, hasTelegram, hasWhatsApp, telegramLink, whatsappLink } from '@/lib/site-config';
import { ChatIcon, TelegramIcon, WhatsAppIcon } from '@/components/ui/Icons';

const DEFAULT_TEXT = `Halo ${SITE.name}, saya ingin bertanya tentang program bimbingan belajar.`;

/** Tombol kontak melayang di pojok kanan bawah: WhatsApp & Telegram. */
export default function ContactFab() {
  const [open, setOpen] = useState(false);
  if (!hasWhatsApp && !hasTelegram) return null;

  // Jika hanya satu kanal tersedia, langsung tampilkan tombolnya.
  if (hasWhatsApp !== hasTelegram) {
    const isWa = hasWhatsApp;
    return (
      <a
        href={isWa ? whatsappLink(DEFAULT_TEXT) : telegramLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isWa ? 'Chat via WhatsApp' : 'Chat via Telegram'}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105 ${isWa ? 'bg-[#25D366] shadow-emerald-900/25' : 'bg-[#229ED9] shadow-sky-900/25'}`}
      >
        {isWa ? <WhatsAppIcon className="h-7 w-7" /> : <TelegramIcon className="h-7 w-7" />}
      </a>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 origin-bottom-right animate-[fab-in_160ms_ease-out] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
          <p className="px-3 pb-2 pt-2 text-xs font-semibold text-slate-500">Ada pertanyaan? Chat admin kami</p>
          <a href={whatsappLink(DEFAULT_TEXT)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-emerald-50">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon /></span>
            WhatsApp
          </a>
          <a href={telegramLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-sky-50">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#229ED9] text-white"><TelegramIcon /></span>
            Telegram
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Tutup pilihan chat' : 'Hubungi admin'}
        className="flex h-14 items-center gap-2 rounded-full bg-primary-700 px-5 text-sm font-semibold text-white shadow-xl shadow-primary-900/25 transition hover:bg-primary-800"
      >
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        ) : (
          <ChatIcon />
        )}
        <span className="hidden sm:inline">{open ? 'Tutup' : 'Hubungi kami'}</span>
      </button>
    </div>
  );
}
