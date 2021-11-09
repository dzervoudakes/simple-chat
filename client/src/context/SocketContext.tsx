/**
 * Context that stores and configures primary Socket instance for the app.
 * @packageDocumentation
 */
import { createContext, useEffect, useState } from 'react';

import { useAuth, useChat } from '@src/hooks';
import { Socket } from '@src/socket';
import { ActiveSocket, ChatUser, Message } from '@src/types';

export interface SocketContextProps {
  activeSockets: ActiveSocket[];
  socket?: Socket;
}

export const SocketContext = createContext<SocketContextProps>({ activeSockets: [] });

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [activeSockets, setActiveSockets] = useState<ActiveSocket[]>([]);
  const { user } = useAuth();
  const { chatDispatch } = useChat();

  useEffect(() => {
    if (!socket && user) {
      const newSocket = new Socket({ userId: user?.id ?? '' });
      const chatUser = { username: user.username, _id: user.id };
      const isNewUser = sessionStorage.getItem('new-user') === 'true';

      const updateChat = (message: Message): void => {
        chatDispatch({ type: 'UPDATE_CHAT', payload: message });
      };

      const updateUsers = (newUser: ChatUser): void => {
        chatDispatch({ type: 'UPDATE_USERS', payload: newUser });
      };

      const updateSockets = (sockets: ActiveSocket[]): void => {
        setActiveSockets(sockets);
      };

      newSocket.subscribeToChat({ updateChat, updateUsers, updateSockets });

      if (isNewUser) {
        newSocket.sendNewUser(chatUser);
        sessionStorage.setItem('new-user', 'false');
      }

      setSocket(newSocket);
    }

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SocketContext.Provider value={{ activeSockets, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
