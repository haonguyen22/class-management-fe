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

  async mapStudentIdToUser(id: number, studentId: string) {
    const res = await api.put(`/admin/users/${id}/map-studentId`, {
      studentId: studentId,
    });
    return res;
  }

  async unMapStudentIdToUser(id: number) {
    const res = await api.put(`/admin/users/${id}/unmap-studentId`);
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
}

export const adminService = new AdminService();
