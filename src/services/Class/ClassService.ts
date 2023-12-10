import { apiService } from '../generic';
import { ILogin, ISignup } from '../../models/IAxiosResponse';

export const ClassService = {
  GetClassInfo: async (id: string, token: string) => {
    return await apiService.get('/class/' + id, { token });
  },

  GetListMember: async (id: string | undefined, token: string) => {
    return await apiService.get('/class/' + id + '/teachers-and-students', {
      token,
    });
  },
};
