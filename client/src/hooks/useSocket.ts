/**
 * Hook into the current state of the websocket.
 * @packageDocumentation
 */
import { useContext } from 'react';
import { SocketContext, SocketContextProps } from '@src/context';

// @todo unit testing

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider.');
  }

  return context;
};

export default useSocket;
