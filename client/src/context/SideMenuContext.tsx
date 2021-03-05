import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';

export interface SideMenuContextProps {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideMenuContext = createContext<SideMenuContextProps>({
  isSideMenuOpen: false,
  setIsSideMenuOpen: noop
});

export const SideMenuProvider: React.FC = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <SideMenuContext.Provider value={{ isSideMenuOpen, setIsSideMenuOpen }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export default SideMenuProvider;
