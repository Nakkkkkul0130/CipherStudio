import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const projectAPI = {
  create: (projectData) => axios.post(`${API_BASE}/projects`, projectData),
  get: (projectId) => axios.get(`${API_BASE}/projects/${projectId}`),
  getAll: () => axios.get(`${API_BASE}/projects`),
  update: (projectId, projectData) => axios.put(`${API_BASE}/projects/${projectId}`, projectData),
  delete: (projectId) => axios.delete(`${API_BASE}/projects/${projectId}`)
};

export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE}/auth/login`, credentials),
  register: (userData) => axios.post(`${API_BASE}/auth/register`, userData)
};