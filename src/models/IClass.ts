import { IUser } from './User';

export interface ICreateCLass {
  name: string;
  description: string;
  subject: string;
}

export interface IClass {
  id: string;
  name: string;
  description: string;
  subject: string;
  avatar: string;
  numberOfTeachers: number;
  numberOfStudents: number;
  owner: IUser;
  updatedAt: string;
}
