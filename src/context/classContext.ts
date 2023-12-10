// tạo context
import React from 'react';
import { IClassDetail } from '../models/IAxiosResponse';

// tạo interface cho context
export interface IClassContext {
  // initial state
  id: string | undefined;
  setId: (id: string) => void;
}

// tạo context
const ClassContext = React.createContext<IClassContext>({
  id: '',
  setId: () => {},
});

export default ClassContext;
