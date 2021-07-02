import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SocketContext } from '@src/context';
import { Socket } from '@src/socket';
import { useSocket } from '..';

describe('useSocket', () => {
  const TestComponent: React.FC = ({ children }) => (
    <SocketContext.Provider
      value={{
        activeSockets: [{ userId: '12345', socketId: '67890' }],
        socket: new Socket({ userId: '12345' })
      }}
    >
      {children}
    </SocketContext.Provider>
  );

  it('returns the current socket instance', () => {
    const { result } = renderHook(() => useSocket(), { wrapper: TestComponent });
    const { activeSockets, socket } = result.current;

    expect(activeSockets[0].userId).toEqual('12345');
    expect(activeSockets[0].socketId).toEqual('67890');
    expect(socket).toBeTruthy();
  });
});
