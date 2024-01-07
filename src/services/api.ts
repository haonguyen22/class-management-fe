import axios from 'axios';

const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Method': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
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
