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

// @todo update user to be nullable instead of individual properties? (clean up some 'if' blocks throughout the app)
// @todo why is this re-rendering with each recompile???

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
