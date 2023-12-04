import { apiService } from '../generic';
import { ILogin, ISignup } from '../../models/IAxiosResponse';

export const authService = {
  login: async (data: ILogin) => {
    const res = await apiService.post('/auth/login', {
      data,
    });
    return res;
  },

  signup: async (data: ISignup) => {
    const res = await apiService.post('/auth/signup', {
      data,
    });
    return res;
  },

  logout: async () => {
    const res = await apiService.post('/auth/logout');
    return res;
  },

  getGoogleSignInUrl: () => {
    return `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/google`;
  },

  forgotPassword: async (email: string) => {
    const res = await apiService.get('/auth/forgot-password', {
      param: { email },
    });
    return res;
  },

  confirmEmail: async (token: string) => {
    const res = await apiService.get('/auth/confirm', {
      param: { token },
    });
    return res;
  },

  changePassword: async (token: string, password: string) => {
    const res = await apiService.post('/auth/reset-password', {
      data: { token, password },
    });
    return res;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const res = await apiService.put('/auth/reset-password', {
      data: { token, newPassword },
    });
    return res;
  },
};
