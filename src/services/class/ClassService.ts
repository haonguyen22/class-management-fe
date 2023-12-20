import { ICreateCLass } from '../../models/IClass';
import { api } from '../api';

class ClassService {
  async getAllClass() {
    const res = await api.get('/class');
    return res;
  }
  async getClassById(id: string) {
    const res = await api.get(`/class/${id}`);
    return res;
  }

  async createClass(data: ICreateCLass) {
    const res = await api.post('/class', data);
    return res;
  }

  async getClassInfo(id: string) {
    return await api.get('/class/' + id);
  }

  async getListMember(id: string | undefined) {
    return await api.get('/class/' + id + '/teachers-and-students');
  }

  async joinClass(classId: string) {
    const res = await api.get(`/class/${classId}/join`);
    return res;
  }

  async getClassCode(classId: string) {
    const res = await api.get(`/class/${classId}/invitation-code`);
    return res;
  }

  async addMember(email: string, id: string | undefined, type: string) {
    return await api.post(`/class/${id}/${type}`, { email });
  }
}

export const classService = new ClassService();
