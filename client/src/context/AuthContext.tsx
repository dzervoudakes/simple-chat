/**
 * Context that maintains storage of the current auth user.
 * @packageDocumentation
 */
import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';

export interface AuthUser {
  username: string | null;
  id: string | null;
  jwt: string | null;
}

export interface AuthContextProps {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<AuthUser>>;
}

const emptyUser = {
  username: null,
  id: null,
  jwt: null
};

export const AuthContext = createContext<AuthContextProps>({
  user: emptyUser,
  setUser: noop
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(emptyUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
