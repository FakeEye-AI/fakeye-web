import { apiClient } from './client';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', { email, password });
  },
  
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', { username, email, password });
  },
  
  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },
  
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get('/auth/me');
  },
  
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put('/auth/profile', data);
  },
};
