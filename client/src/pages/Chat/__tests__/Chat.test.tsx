import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  AuthContext,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';
import { ChatService } from '@src/services';
import Chat from '..';

jest.mock('@src/services/ChatService');

describe('Chat', () => {
  const publicMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message',
    _id: '19283',
    createdAt: '2021-02-28T22:31:02.589Z'
  };

  const MockAuthProvider: React.FC = ({ children }) => (
    <AuthContext.Provider
      value={{
        user: { username: 'test', id: '12345', jwt: 'jwt' },
        setUser: jest.fn()
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  interface TestComponentProps {
    initialEntry?: string;
  }

  const TestComponent: React.FC<TestComponentProps> = ({
    initialEntry = '/channels/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route exact path="/">
        home page
      </Route>
      <Route exact path="/:conversationType/:conversationId?">
        <WithStylesProvider>
          <ChatProvider>
            <SideMenuProvider>
              <Chat />
            </SideMenuProvider>
          </ChatProvider>
        </WithStylesProvider>
      </Route>
    </MemoryRouter>
  );

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: {
        channels: [{ name: 'general', description: 'test description', _id: '11221' }],
        chat: { '11221': [publicMessage] },
        users: []
      }
    });
  });

  it('renders', async () => {
    render(
      <MockAuthProvider>
        <TestComponent />
      </MockAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Current user')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Type your message here, then press 'Enter' to send.")
      ).toBeInTheDocument();
    });
  });

  it('redirects to the first channel route when no conversationId is provided', async () => {
    render(
      <MockAuthProvider>
        <TestComponent initialEntry="/channels" />
      </MockAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('i am a message')).toBeInTheDocument();
    });
  });

  it('redirects to the home route when the auth user is not present', () => {
    render(<TestComponent />);

    expect(screen.getByText('home page')).toBeInTheDocument();
  });
});
