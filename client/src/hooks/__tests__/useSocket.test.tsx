import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SocketContext } from '@src/context';
import { Socket } from '@src/socket';
import { useSocket } from '..';

describe('useSocket', () => {
  const TestComponent: React.FC = ({ children }) => (
    <SocketContext.Provider
      value={{
        socket: new Socket({ userId: '12345' })
      }}
    >
      {children}
    </SocketContext.Provider>
  );

  it('returns the current socket instance', () => {
    const { result } = renderHook(() => useSocket(), { wrapper: TestComponent });
    const { socket } = result.current;

    expect(socket).toBeTruthy();
  });
});
