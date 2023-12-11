import { ICreateCLass } from '../../models/IClass';
import { apiService } from '../generic';

export const classService = {
  getAllClass: async (token: string) => {
    const res = await apiService.get('/class', { token: token });
    return res;
  },
  getClassById: async (token: string, id: string) => {
    const res = await apiService.get(`/class/${id}`, { token: token });
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

  addMember: async (
    email: string,
    id: string | undefined,
    type: string,
    token: string,
  ) => {
    return await apiService.post(`/class/${id}/${type}`, {
      token,
      data: { email },
    });
  },
  joinClass: async (token: string, classId: string) => {
    const res = await apiService.get(`/class/${classId}/join`, {
      token: token,
    });
    return res;
  },
  getClassCode: async (token: string, classId: string) => {
    const res = await apiService.get(`/class/${classId}/invitation-code`, {
      token: token,
    });
    return res;
  },
};
