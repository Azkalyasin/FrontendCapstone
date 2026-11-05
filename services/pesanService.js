import apiClient from '@/lib/api';

// Publik: kirim pesan dari form kontak. Respons: { id, telegram: boolean }
export const kirimPesan = async (data) => (await apiClient.post('/pesan', data)).data;

// Admin
export const getAllPesan = async () => (await apiClient.get('/pesan?limit=100', { auth: true })).data.pesan;

export const tandaiDibaca = async (id, dibaca = true) => (await apiClient.put(`/pesan/${id}/dibaca`, { dibaca }, { auth: true })).data;

export const hapusPesan = async (id) => apiClient.delete(`/pesan/${id}`, { auth: true });
