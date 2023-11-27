import axios from 'axios';

export const baseURL = `${process.env.REACT_APP_SERVER_URL}v1/api/`;

export const headers = {
  'Content-Type': 'application/json',
  //   Authorization: `Bearer ${token}`,
  timeout: 10000,
};

const instance = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export const get = async (url: string, { data }: { data?: object } = {}) => {
  try {
    const res = await instance.get(url, data);
    return res;
  } catch (err) {
    console.log(`⛔ Get error data from ${url}: `, err);
    return err;
  }
};

export const post = async (url: string, { data }: { data?: object } = {}) => {
  try {
    const res = await instance.post(url, data);
    return res;
  } catch (err) {
    console.log(`⛔ Post error data from ${url}: `, err);
    return err;
  }
};

export const put = async (url: string, { data }: { data?: object } = {}) => {
  try {
    const res = await instance.put(url, data);
    return res;
  } catch (err) {
    console.log(`⛔ Put error data from ${url}: `, err);
    return err;
  }
};
