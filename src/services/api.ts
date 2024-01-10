import axios from 'axios';

const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token =
      document?.cookie?.match('(^|;)\\s*_auth\\s*=\\s*([^;]+)')?.[2] ?? '';
    if (token?.length > 0 ?? false) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('⛔ Request error: ', error);
    return Promise.reject(error);
  },
);

export const api = instance;
