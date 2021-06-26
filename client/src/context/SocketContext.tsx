/**
 * Context that stores and configures primary Socket instance for the app.
 * @packageDocumentation
 */
import React, { createContext, useEffect, useState } from 'react';
import { useAuth, useChat } from '@src/hooks';
import { Socket } from '@src/socket';
import { ChatUser, Message } from '@src/types';

export interface SocketContextProps {
  socket?: Socket;
}

export const SocketContext = createContext<SocketContextProps>({});

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { user } = useAuth();
  const { chatDispatch } = useChat();

  useEffect(() => {
    if (!socket && user) {
      const newSocket = new Socket({ userId: user?.id ?? '' });
      const chatUser = { username: user.username, _id: user.id };
      const isNewUser = sessionStorage.getItem('new-user') === 'true';

      const messageDispatch = (message: Message): void => {
        chatDispatch({ type: 'UPDATE_CHAT', payload: message });
      };

      const userDispatch = (newUser: ChatUser): void => {
        chatDispatch({ type: 'UPDATE_USERS', payload: newUser });
      };

      newSocket.subscribeToChat(messageDispatch, userDispatch);

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

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
