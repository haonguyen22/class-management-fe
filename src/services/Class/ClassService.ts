import { ICreateCLass } from '../../models/IClass';
import { apiService } from '../generic';

export const ClassService = {
  getAllClass: async (token: string) => {
    const res = await apiService.get('/class', { token: token });
    return res;
  },
  createClass: async (token: string, data: ICreateCLass) => {
    const res = await apiService.post('/class', { token: token, data: data });
    return res;
  },
  GetClassInfo: async (id: string, token: string) => {
    return await apiService.get('/class/' + id, { token });
  },

  GetListMember: async (id: string | undefined, token: string) => {
    return await apiService.get('/class/' + id + '/teachers-and-students', {
      token,
    });
  },
};
