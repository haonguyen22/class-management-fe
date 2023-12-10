import React from 'react';

export interface IClassContext {
  id: string | undefined;
  setId: (id: string) => void;
}

const ClassContext = React.createContext<IClassContext>({
  id: '',
  setId: () => {},
});

export default ClassContext;
