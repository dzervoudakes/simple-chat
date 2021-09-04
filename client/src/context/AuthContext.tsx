/**
 * Context that maintains storage of the current auth user.
 * @packageDocumentation
 */
import { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';
import { AuthUser } from '@src/types';

export interface AuthContextProps {
  user: AuthUser | undefined;
  setUser: Dispatch<SetStateAction<AuthUser | undefined>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  setUser: noop
});

export const AuthProvider: React.FC = ({ children }) => {
  const previousUser = sessionStorage.getItem('user');
  const initialUser = previousUser ? JSON.parse(previousUser) : undefined;
  const [user, setUser] = useState<AuthUser | undefined>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
