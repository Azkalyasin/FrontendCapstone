'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar({ mobileOpen = false, onNavigate = () => {}, onLogout = () => {}, user = null }) {
  const pathname = usePathname();
  
  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" />,
    },
    {
      label: 'Data Pendaftar',
      href: '/admin/pendaftar',
      icon: <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm2 5a4 4 0 0 1 4 4v2m-4-15a4 4 0 0 1 0 8" />,
    },
    {
      label: 'Program Belajar',
      href: '/admin/program',
      icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />,
    },
    {
      label: 'Kelola Achievement',
      href: '/admin/achievement',
      icon: <path d="M8 21h8m-4-4v4m5-18H7v7a5 5 0 0 0 10 0V3Zm0 2h4v3a4 4 0 0 1-4 4M7 5H3v3a4 4 0 0 0 4 4" />,
    },
  ];
  
  const isActive = (href) => pathname.startsWith(href);
  
  return (
    <aside className={`${mobileOpen ? 'fixed inset-y-0 left-0 z-50 flex w-[260px] shadow-2xl' : 'hidden'} min-h-screen flex-col border-r border-slate-200 bg-[#f8fbff] md:sticky md:top-0 md:z-auto md:flex md:h-screen md:w-[210px] md:shrink-0 md:shadow-none`}>
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-xs font-black text-white shadow-md shadow-primary-700/20" aria-hidden="true">BW</span>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-slate-900">Bimble Wanda</h1>
            <p className="text-[10px] leading-tight text-slate-500">Panel admin</p>
          </div>
          <button type="button" onClick={onNavigate} className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Tutup navigasi">×</button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`
                  flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs transition-colors
                  ${isActive(item.href)
                    ? 'bg-primary-700 text-white'
                    : 'text-slate-700 hover:bg-primary-50 hover:text-primary-800'
                  }
                `}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                  {item.icon}
                </svg>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-200 px-3 py-3">
        {user && (
          <div className="mb-2 px-2">
            <p className="truncate text-xs font-semibold text-slate-800">{user.name || user.username}</p>
            <p className="truncate text-[10px] text-slate-500">@{user.username}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => { onNavigate(); onLogout(); }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
            <path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
          </svg>
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
