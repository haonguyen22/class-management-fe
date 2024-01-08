export interface IUser {
  id?: number;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  studentId?: string;
  role?: string;
  isActive?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  phoneNumber?: string;
  address?: string;
  studentId?: string;
}

export interface INotification {
  id: number;
  title: string;
  notificationType: string;
  link: string;
}
