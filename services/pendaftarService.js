import apiClient from '@/lib/api';

// Publik
export const submitPendaftaran = async (data) => (await apiClient.post('/pendaftar', data)).data;

// Admin
export const getAllPendaftar = async (params = {}) => {
  const query = new URLSearchParams({ limit: '100', ...params }).toString();
  const list = (await apiClient.get(`/pendaftar?${query}`, { auth: true })).data.pendaftar;
  // `tanggal` (YYYY-MM-DD) dipakai dashboard & tabel admin.
  return list.map((item) => ({ ...item, tanggal: item.createdAt ? item.createdAt.slice(0, 10) : '' }));
};

export const getPendaftarById = async (id) => (await apiClient.get(`/pendaftar/${id}`, { auth: true })).data;

export const updateStatusPendaftar = async (id, status) =>
  (await apiClient.put(`/pendaftar/${id}/status`, { status }, { auth: true })).data;

export const deletePendaftar = async (id) => apiClient.delete(`/pendaftar/${id}`, { auth: true });
