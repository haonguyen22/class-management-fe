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

  async joinClass(classId: string, studentId: string) {
    const res = await api.get(`/class/${classId}/join`, {
      params: { studentId },
    });
    return res;
  }

  async getClassCode(classId: string) {
    const res = await api.get(`/class/${classId}/invitation-code`);
    return res;
  }

  async addMember(email: string, id: string | undefined, type: string) {
    return await api.post(`/class/${id}/${type}`, { email });
  }

  async uploadBackgroundImage(classId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return await api.post('/class/{id}/upload-background', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'class-id': classId,
      },
    });
  }

  async classWithRole() {
    const res = await api.get('/class/context/class-with-role');
    return res;
  }
}

export const classService = new ClassService();
