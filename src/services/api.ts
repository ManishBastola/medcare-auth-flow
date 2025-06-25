
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your Spring Boot backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    return response.data;
  },

  register: async (userData: { username: string; password: string; role?: string }) => {
    const response = await api.post('/request', userData);
    return response.data;
  },

  forgotPassword: async (username: string, newPassword: string) => {
    const response = await api.post('/forgot-password', { username, newPassword });
    return response.data;
  },
};

export default api;
