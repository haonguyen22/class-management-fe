import React, { createContext } from 'react';
import { IClass } from '../models/IClass';

export interface IClassContext {
  id: string | undefined;
  setId: (id: string) => void;
}

export const ClassContext = createContext<IClassContext>({
  id: '',
  setId: () => {},
});

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
