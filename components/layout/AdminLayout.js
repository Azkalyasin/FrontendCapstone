'use client';

import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({ children, title, description, action, showTopbar = true }) {
  return (
    <div className="flex min-h-screen bg-[#f7f9f8]">
      <AdminSidebar />
      
      <main className="min-w-0 flex-1">
        {showTopbar && <div className="h-[52px] border-b border-black bg-white" />}
        <div className={`mx-auto max-w-7xl px-4 pb-6 md:pl-8 md:pr-14 ${showTopbar ? 'pt-8' : 'pt-[54px]'}`}>
          {(title || description || action) && (
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                {title && <h1 className="font-serif text-2xl font-bold text-black">{title}</h1>}
                {description && <p className="mt-1 text-xs text-gray-600">{description}</p>}
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
