import apiClient, { clearToken, setToken } from '@/lib/api';

export const login = async (username, password, remember = false) => {
  const res = await apiClient.post('/auth/login', { username, password });
  setToken(res.data.token, remember);
  return res.data.user;
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout', undefined, { auth: true });
  } catch {
    // tetap logout di sisi browser walau request gagal
  } finally {
    clearToken();
  }
};

export const getProfile = async () => (await apiClient.get('/auth/profile', { auth: true })).data;

export const changePassword = async (passwordLama, passwordBaru) =>
  apiClient.put('/auth/password', { passwordLama, passwordBaru }, { auth: true });

export const getStats = async () => (await apiClient.get('/stats', { auth: true })).data;
