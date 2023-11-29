import { apiService } from '../generic';

export const authService = {
  login: async (email: string, password: string) => {
    const res = await apiService.post('/auth/login', {
      data: { email, password },
    });
    return res;
  },

  register: async (email: string, password: string) => {
    const res = await apiService.post('/auth/register', {
      data: { email, password },
    });
    return res;
  },

  logout: async () => {
    const res = await apiService.post('/auth/logout');
    return res;
  },
};
