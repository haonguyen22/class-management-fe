import { createContext } from 'react';
import { Role } from '../enums/RoleClass';

interface ClassContextType {
  role: string;
  setRole: (role: string) => void;
}

export const ClassContext = createContext<ClassContextType>({
  role: Role.NONE,
  setRole: () => {},
});
