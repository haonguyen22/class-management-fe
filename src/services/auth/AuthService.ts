import { apiService } from '../generic';
import { ILogin, ISignup } from '../../utils/interface';

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
};
