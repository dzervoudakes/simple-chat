/**
 * Hook into the current state of the auth user.
 * @packageDocumentation
 */
import { useContext } from 'react';

import { AuthContext, AuthContextProps } from '@src/context';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider.');
  }

  return context;
};

export default useAuth;
