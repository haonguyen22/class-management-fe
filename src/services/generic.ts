import axios from 'axios';

const baseURL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

const configHeader = (token?: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      timeout: 10000,
      Authorization: '',
    },
  };
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export const apiService = {
  get: async (url: string, { token }: { token?: string } = {}) => {
    try {
      const res = await instance.get(url, configHeader(token));
      return res;
    } catch (err) {
      console.log(`⛔ Get error data from ${url}: `, err);
      return err;
    }
  },

  post: async (
    url: string,
    { data, token }: { data?: object; token?: string } = {},
  ) => {
    try {
      const res = await instance.post(url, data, configHeader(token));
      return res;
    } catch (err) {
      console.log(`⛔ Post error data from ${url}: `, err);
      return err;
    }
  },

  put: async (
    url: string,
    { data, token }: { data?: object; token?: string } = {},
  ) => {
    try {
      const res = await instance.put(url, data, configHeader(token));
      return res;
    } catch (err) {
      console.log(`⛔ Put error data from ${url}: `, err);
      return err;
    }
  },
};

