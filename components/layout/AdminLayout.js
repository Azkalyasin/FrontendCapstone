'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({ children, title, description, action, showTopbar = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {mobileMenuOpen && <button type="button" aria-label="Tutup menu" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 md:hidden" />}
      <AdminSidebar mobileOpen={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} />
      
      <main className="min-w-0 flex-1">
        <div className={`${showTopbar ? 'flex h-[52px] border-b border-slate-200' : 'flex h-12 md:hidden'} sticky top-0 z-30 items-center gap-3 bg-white px-4`}>
          <button type="button" aria-label={mobileMenuOpen ? 'Tutup navigasi admin' : 'Buka navigasi admin'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-primary-50 hover:text-primary-800 md:hidden">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          {showTopbar && <span className="text-xs font-semibold text-slate-500">Panel admin <span className="mx-1 text-slate-300">/</span> <span className="text-primary-700">Bimble Wanda</span></span>}
        </div>
        <div className={`mx-auto max-w-7xl px-4 pb-6 md:pl-8 md:pr-14 ${showTopbar ? 'pt-8' : 'pt-[54px]'}`}>
          {(title || description || action) && (
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                {title && <h1 className="font-serif text-2xl font-bold text-slate-900">{title}</h1>}
                {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
