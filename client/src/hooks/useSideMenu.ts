import { useContext } from 'react';
import { SideMenuContext, SideMenuContextProps } from '@src/context';

export const useSideMenu = (): SideMenuContextProps => {
  const context = useContext(SideMenuContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useSideMenu must be used within a SideMenuProvider.');
  }

  return context;
};

export default useSideMenu;
