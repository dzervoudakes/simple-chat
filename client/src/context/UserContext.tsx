import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import noop from 'lodash/noop';

export interface UserContextProps {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextProps>({
  username: null,
  setUsername: noop
});

export const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
