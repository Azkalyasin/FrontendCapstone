'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/api';
import * as authService from '@/services/authService';

/**
 * Mengelola sesi admin. Jika `required` true dan belum login,
 * pengguna diarahkan ke /admin/login.
 */
export const useAuth = ({ required = false } = {}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setLoading(false);
      if (required) router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
      return undefined;
    }
    authService
      .getProfile()
      .then((profile) => active && setUser(profile))
      .catch(() => active && setUser(null)) // 401 sudah ditangani apiClient (redirect ke login)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [required, router]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    router.replace('/admin/login');
  }, [router]);

  return { user, loading, logout, isAuthenticated: Boolean(user) };
};
