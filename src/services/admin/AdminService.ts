import { UpdateClassDTO } from '../../models/IClass';
import { UpdateUserDTO } from '../../models/User';
import { api } from '../api';

class AdminService {
  async fetchAllUsers() {
    const res = await api.get('/admin/users');
    return res;
  }

  async fetchUserById(id: number) {
    const res = await api.get(`/admin/users/${id}`);
    return res;
  }

  async updateUser(id: number, data: UpdateUserDTO) {
    const res = await api.put(`/admin/users/${id}`, data);
    return res;
  }

  async deleteUser(id: number) {
    const res = await api.delete(`/admin/users/${id}`);
    return res;
  }

  async lockUser(id: number) {
    const res = await api.patch(`/admin/users/${id}/lock`);
    return res;
  }

  async mapStudentIdToUser(userId: number, studentId: string, classId: string) {
    const res = await api.patch(
      `/admin/users/${userId}/map-studentId`,
      {
        studentId: studentId,
      },
      {
        headers: {
          'class-id': parseInt(classId),
        },
      },
    );
    return res;
  }

  async unMapStudentIdToUser(userId: number, classId: string) {
    const res = await api.patch(
      `/admin/users/${userId}/unmap-studentId`,
      {},
      {
        headers: {
          'class-id': parseInt(classId),
        },
      },
    );
    return res;
  }

  async fetchAllClasses({
    page,
    limit,
    sortField,
    order,
    search,
  }: {
    page?: number;
    limit?: number;
    sortField?: string;
    order?: string;
    search?: string;
  }) {
    const res = await api.get('/admin/class', {
      params: {
        page,
        limit,
        sortField,
        order,
        search,
      },
    });
    return res;
  }

  async updateClass(id: number, data: UpdateClassDTO) {
    const res = await api.put(`/admin/class/${id}`, data);
    return res;
  }

  async deleteClass(id: number) {
    const res = await api.delete(`/admin/class/${id}`);
    return res;
  }

  async activeClass(id: number) {
    const res = await api.patch(`/admin/class/${id}/active`);
    return res;
  }

  async inactiveClass(id: number) {
    const res = await api.patch(`/admin/class/${id}/inactive`);
    return res;
  }

  async exportUserExcel() {
    const res = await api.get('/admin/users/export/excel', {
      responseType: 'blob',
    });
    return res;
  }

  async uploadUserExcel(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.patch('/admin/users/map-studentId-excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  }
}

export const adminService = new AdminService();
