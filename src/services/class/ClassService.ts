import { ICreateCLass } from '../../models/IClass';
import { apiService } from '../generic';

export const classService = {
  getAllClass: async (token: string) => {
    const res = await apiService.get('/class', { token: token });
    return res;
  },
  createClass: async (token: string, data: ICreateCLass) => {
    const res = await apiService.post('/class', { token: token, data: data });
    return res;
  },
};
