import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';

export interface User {
  username: string | null;
  id: string | null;
  jwt: string | null;
}

export interface AuthContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
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
  const [user, setUser] = useState<User>(emptyUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
