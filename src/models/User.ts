export interface IUser {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  studentId?: string;
}

export interface UpdateUserDTO {
  name?: string;
  phoneNumber?: string;
  address?: string;
  studentId?: string;
}
