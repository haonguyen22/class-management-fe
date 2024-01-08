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
  backgroundImage: string;
  numberOfTeachers: number;
  numberOfStudents: number;
  owner: IUser;
  updatedAt: string;
}

export interface ClassRole {
  studentClass: IClass[];
  teacherClass: IClass[];
}

export interface UpdateClassDTO {
  name?: string;
  description?: string;
}
