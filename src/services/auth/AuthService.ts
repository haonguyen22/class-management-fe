import { ILogin, ISignup } from '../../models/IAxiosResponse';
import { api } from '../api';

class AuthService {
  async login(data: ILogin) {
    const res = await api.post('/auth/login', data);
    return res;
  }

  async signup(data: ISignup) {
    console.log(data);
    const res = await api.post('/auth/signup', data);
    return res;
  }

  async logout() {
    const res = await api.post('/auth/logout');
    return res;
  }

  getGoogleSignInUrl() {
    return `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/google`;
  }

  getFacebookSignInUrl() {
    return `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/facebook`;
  }

  async forgotPassword(email: string) {
    const res = await api.get('/auth/forgot-password', { params: { email } });
    return res;
  }

  async confirmEmail(token: string) {
    const res = await api.get('/auth/confirm', { params: { token } });
    return res;
  }

  async changePassword(token: string, password: string) {
    const res = await api.post('/auth/reset-password', {
      data: { token, password },
    });
    return res;
  }

  async resetPassword(token: string, newPassword: string) {
    const res = await api.put('/auth/reset-password', {
      data: { token, newPassword },
    });
    return res;
  }
}

export const authService = new AuthService();
