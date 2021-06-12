/**
 * Context that maintains storage of the current auth user.
 * @packageDocumentation
 */
import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';

export interface AuthUser {
  username: string;
  id: string;
  jwt: string;
}

export interface AuthContextProps {
  user: AuthUser | undefined;
  setUser: Dispatch<SetStateAction<AuthUser | undefined>>;
}

// @todo update user to be nullable instead of individual properties? (clean up some 'if' blocks throughout the app)
// @todo why is this re-rendering with each recompile???

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  setUser: noop
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
