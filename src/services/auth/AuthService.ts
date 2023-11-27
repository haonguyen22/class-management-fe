import { get, post } from '../generic';

const AuthService = {
  login: (email: string, password: string) => {
    return post('/auth/login', { data: { email, password } });
  },

  register: (email: string, password: string) => {
    return post('/auth/register', { data: { email, password } });
  },
  logout: () => {
    return post('/auth/logout');
  },
  me: () => {
    return get('/auth/me');
  },
};
