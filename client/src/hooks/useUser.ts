import { useContext } from 'react';
import { UserContext, UserContextProps } from '@src/context';

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider.');
  }

  return context;
};

export default useUser;
