import { createContext } from 'react';
import { ClassRole, IClass } from '../models/IClass';

interface GlobalContextType {
  classes: IClass[];
  setClasses: (classes: IClass[]) => void;
  fetchClasses: () => void;
  isFetchingClasses: boolean;
  classRoles: ClassRole;
}

export const GlobalContext = createContext<GlobalContextType>({
  classes: [],
  setClasses: () => {},
  fetchClasses: () => {},
  isFetchingClasses: false,
  classRoles: {
    studentClass: [],
    teacherClass: [],
  },
});
