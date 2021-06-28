import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockAuthContext, mockChatContext } from '@src/test';
import { AuthContext, ChatContext, SocketContext, SocketProvider } from '..';

describe('SocketContext', () => {
  const TestComponent: React.FC = () => (
    <SocketContext.Consumer>
      {({ socket }) => <div>Socket is {!socket ? 'empty' : 'enabled'}</div>}
    </SocketContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <AuthContext.Provider value={mockAuthContext}>
      <ChatContext.Provider value={mockChatContext}>
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      </ChatContext.Provider>
    </AuthContext.Provider>
  );

  it('provides the socket instance', async () => {
    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText('Socket is enabled')).toBeInTheDocument();
    });
  });
});
