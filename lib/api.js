// API client untuk komunikasi dengan backend Express.
// Base URL diambil dari NEXT_PUBLIC_API_URL (lihat .env.example).

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const TOKEN_KEY = 'bw_admin_token';

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

// ---- Token admin (localStorage jika "ingat perangkat", selain itu sessionStorage) ----
export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token, remember = false) {
  clearToken();
  (remember ? window.localStorage : window.sessionStorage).setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(TOKEN_KEY);
}

async function request(endpoint, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Tidak dapat terhubung ke server. Periksa koneksi atau pastikan backend berjalan.', 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Sesi admin habis -> hapus token & arahkan ke halaman login.
    if (response.status === 401 && auth && typeof window !== 'undefined') {
      clearToken();
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
      }
    }
    throw new ApiError(data.message || 'Terjadi kesalahan pada server', response.status, data.errors);
  }

  return data;
}

const apiClient = {
  get: (endpoint, opts) => request(endpoint, { ...opts, method: 'GET' }),
  post: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'POST', body }),
  put: (endpoint, body, opts) => request(endpoint, { ...opts, method: 'PUT', body }),
  delete: (endpoint, opts) => request(endpoint, { ...opts, method: 'DELETE' }),
};

export default apiClient;
