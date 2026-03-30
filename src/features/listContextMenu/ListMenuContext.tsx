import React, { createContext, useContext } from 'react';
import { useListMenu } from './hooks/useListMenu';

const ListMenuContext = createContext<ReturnType<typeof useListMenu> | null>(null);

export const ListMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const listMenuState = useListMenu();
  return (
    <ListMenuContext.Provider value={listMenuState}>
      {children}
    </ListMenuContext.Provider>
  );
};

export const useListMenuContext = () => {
  const context = useContext(ListMenuContext);
  if (!context) throw new Error('useListMenuContext must be used within ListMenuProvider');
  return context;
};
