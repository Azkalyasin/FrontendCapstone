'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/api';
import * as authService from '@/services/authService';

// Ada token tersimpan di browser? (null saat render di server)
const subscribe = () => () => {};
const readHasToken = () => Boolean(getToken());
const readHasTokenOnServer = () => null;

/**
 * Mengelola sesi admin. Jika `required` true dan belum login,
 * pengguna diarahkan ke /admin/login.
 */
export const useAuth = ({ required = false } = {}) => {
  const router = useRouter();
  const hasToken = useSyncExternalStore(subscribe, readHasToken, readHasTokenOnServer);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (hasToken === null) return undefined;
    if (!hasToken) {
      if (required) router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
      return undefined;
    }
    let active = true;
    authService
      .getProfile()
      .then((profile) => active && setUser(profile))
      .catch(() => active && setUser(null)) // 401 sudah ditangani apiClient (redirect ke login)
      .finally(() => active && setChecked(true));
    return () => {
      active = false;
    };
  }, [hasToken, required, router]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    router.replace('/admin/login');
  }, [router]);

  // Masih memuat: belum tahu ada token, atau ada token tapi profil belum dicek.
  const loading = hasToken === null || (hasToken && !checked);

  return { user, loading, logout, isAuthenticated: Boolean(user) };
};
