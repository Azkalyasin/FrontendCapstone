import apiClient from '@/lib/api';

export const getAllPrograms = async (params = {}) => {
  const query = new URLSearchParams({ limit: '100', ...params }).toString();
  return (await apiClient.get(`/programs?${query}`)).data.programs;
};

export const getProgramById = async (id) => (await apiClient.get(`/programs/${id}`)).data;

export const createProgram = async (data) => (await apiClient.post('/programs', data, { auth: true })).data;

export const updateProgram = async (id, data) => (await apiClient.put(`/programs/${id}`, data, { auth: true })).data;

export const deleteProgram = async (id) => apiClient.delete(`/programs/${id}`, { auth: true });
