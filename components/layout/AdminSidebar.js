'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
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
    <aside className="flex min-h-screen w-[142px] shrink-0 flex-col border-r border-black bg-[#f8faf9] md:w-[210px]">
      <div className="border-b border-black px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 shrink-0 border border-black" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-[1px] w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black" />
            <span className="absolute left-1/2 top-1/2 h-[1px] w-8 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-black">Bimble Wanda</h1>
            <p className="text-[10px] leading-tight text-gray-600">Tutoring Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-2 px-2 py-2 text-xs transition-colors
                  ${isActive(item.href) 
                    ? 'bg-black text-white' 
                    : 'text-gray-900 hover:bg-gray-200'
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

      <div className="border-t border-black px-3 py-3">
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-2 py-2 text-xs text-gray-900 transition-colors hover:bg-gray-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
            <path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
          </svg>
          <span className="font-medium">Keluar</span>
        </Link>
      </div>
    </aside>
  );
}
