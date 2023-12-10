import React from 'react';

export interface IClassContext {
  id: string | undefined;
  setId: (id: string) => void;
}

export const ClassContext = React.createContext<IClassContext>({
  id: '',
  setId: () => {},
});
