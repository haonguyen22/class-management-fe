import axios, { AxiosRequestConfig } from 'axios';

const createAxios = () => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}v1/api/`,
    headers: {
      'Content-Type': 'application/json',
      timeout: 10000,
    },
  });
  const get = async (
    url: string,
    params: AxiosRequestConfig<any> | undefined,
  ) => {
    try {
      const res = await instance.get(url, params);
      return res;
    } catch (err) {
      console.log('Error: ', err);
      return err;
    }
  };

  const post = async (url: string, params: any) => {
    try {
      const res = await instance.post(url, params);
      return res;
    } catch (err) {
      console.log('Error: ', err);
      return err;
    }
  };
  const put = async (
    url: string,
    data: any,
    params: AxiosRequestConfig<any> | undefined,
  ) => {
    try {
      const res = await instance.put(url, data, params);
      return res;
    } catch (err) {
      console.log('Error: ', err);
      return err;
    }
  };
  return { get, post, put };
};

export default createAxios();
