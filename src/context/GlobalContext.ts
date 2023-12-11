import { createContext } from 'react';
import { IClass } from '../models/IClass';

interface GlobalContextType {
  classes: IClass[];
  setClasses: (classes: IClass[]) => void;
  fetchClasses: (token: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  classes: [],
  setClasses: () => {},
  fetchClasses: () => {},
});

export interface IClassContext {
  id: string | undefined;
  setId: (id: string) => void;
}

export const ClassContext = createContext<IClassContext>({
  id: '',
  setId: () => {},
});
