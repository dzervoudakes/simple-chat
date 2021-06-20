/**
 * Context that stores and configures primary Socket instance for the app.
 * @packageDocumentation
 */
import React, { createContext, useEffect, useState } from 'react';
import { useAuth, useChat } from '@src/hooks';
import { Socket } from '@src/socket';

// @todo unit testing

export interface SocketContextProps {
  socket?: Socket;
}

export const SocketContext = createContext<SocketContextProps>({});

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const { user } = useAuth();
  const { updateChat } = useChat();

  useEffect(() => {
    if (!socket && user) {
      const newSocket = new Socket({ userId: user?.id ?? '' });
      newSocket.subscribeToChat(updateChat);
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
