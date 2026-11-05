import apiClient from '@/lib/api';

export const getAllAchievements = async (params = {}) => {
  const query = new URLSearchParams({ limit: '100', ...params }).toString();
  return (await apiClient.get(`/achievements?${query}`)).data.achievements;
};

export const getAchievementById = async (id) => (await apiClient.get(`/achievements/${id}`)).data;

// Foto dikirim sebagai data URL (base64) di field `foto`.
export const createAchievement = async (data) => (await apiClient.post('/achievements', data, { auth: true })).data;

export const updateAchievement = async (id, data) => (await apiClient.put(`/achievements/${id}`, data, { auth: true })).data;

export const deleteAchievement = async (id) => apiClient.delete(`/achievements/${id}`, { auth: true });
