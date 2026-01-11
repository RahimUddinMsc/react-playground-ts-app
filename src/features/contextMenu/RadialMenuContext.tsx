import React, { createContext, useContext } from 'react';
import { useRadialMenu } from './hooks/useRadialMenu';


const RadialMenuContext = createContext<ReturnType<typeof useRadialMenu> | null>(null);

export const RadialMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const radialMenuState = useRadialMenu();
  return (
    <RadialMenuContext.Provider value={radialMenuState}>
      {children}
    </RadialMenuContext.Provider>
  );
};

export const useRadialMenuContext = () => {
  const context = useContext(RadialMenuContext);
  if (!context) throw new Error('useRadialMenuContext must be used within RadialMenuProvider');
  return context;
};