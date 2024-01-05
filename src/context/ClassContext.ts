import { createContext } from 'react';
import { Role } from '../enums/RoleClass';
import { IClass } from '../models/IClass';

interface ClassContextType {
  role: string;
  setRole: (role: string) => void;
  classDetail?: IClass;
  setClassDetail: (classDetail: IClass) => void;
  isLoading: boolean;
}

export const ClassContext = createContext<ClassContextType>({
  role: Role.NONE,
  setRole: () => {},
  classDetail: undefined,
  setClassDetail: () => {},
  isLoading: false,
});
