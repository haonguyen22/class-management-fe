import { createContext } from 'react';
import { ClassRole, IClass } from '../models/IClass';
import { INotification } from '../models/User';

interface GlobalContextType {
  classes: IClass[];
  setClasses: (classes: IClass[]) => void;
  fetchClasses: () => void;
  isFetchingClasses: boolean;
  classRoles: ClassRole;
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
  fetchNotifications: () => void;
  isFetchingNotifications: boolean;
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
  notifications: [],
  setNotifications: () => {},
  fetchNotifications: () => {},
  isFetchingNotifications: false,
});
