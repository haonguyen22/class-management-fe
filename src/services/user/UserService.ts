import { UpdateUserDTO } from '../../models/User';
import { api } from '../api';

class UserService {
  async updateUser(user: UpdateUserDTO) {
    const res = await api.put('/users', user);
    return res;
  }

  async getMe() {
    const res = await api.get('/auth/me');
    return res;
  }

  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  }
}

export const userService = new UserService();
