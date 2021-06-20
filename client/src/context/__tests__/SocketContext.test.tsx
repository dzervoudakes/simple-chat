import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthContext, ChatContext, SocketContext, SocketProvider } from '..';

describe('SocketContext', () => {
  const TestComponent: React.FC = () => (
    <SocketContext.Consumer>
      {({ socket }) => <div>Socket is {!socket ? 'empty' : 'enabled'}</div>}
    </SocketContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <AuthContext.Provider
      value={{
        user: { username: 'test', id: '12345', jwt: 'jwt' },
        setUser: jest.fn()
      }}
    >
      <ChatContext.Provider
        value={{
          channels: [],
          chat: {},
          chatDispatch: jest.fn(),
          error: false,
          loading: false,
          users: []
        }}
      >
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      </ChatContext.Provider>
    </AuthContext.Provider>
  );

  it('provides the socket instance', async () => {
    const { getByText } = render(<Wrapper />);

    await waitFor(() => {
      expect(getByText('Socket is enabled')).toBeInTheDocument();
    });
  });
});
