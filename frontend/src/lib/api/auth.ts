import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
const AuthAPI = {
  // Register user
  register: (userData: { name: string; email: string; password: string }) => {
    return api.post('/users/register', userData);
  },

  // Login user
  login: (credentials: { email: string; password: string }) => {
    return api.post('/users/login', credentials);
  },

  // Get user profile
  getProfile: () => {
    return api.get('/users/profile');
  },

  // Update user profile
  updateProfile: (userData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
    };
  }) => {
    return api.put('/users/profile', userData);
  },

  // Forgot password
  forgotPassword: (email: string) => {
    return api.post('/users/forgot-password', { email });
  },

  // Reset password
  resetPassword: (token: string, password: string) => {
    return api.post(`/users/reset-password/${token}`, { password });
  },

  // Refresh token
  refreshToken: (refreshToken: string) => {
    return api.post('/users/refresh-token', { refreshToken });
  },
};

export default AuthAPI;