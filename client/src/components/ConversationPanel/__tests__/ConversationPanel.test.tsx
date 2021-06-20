import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext, ChatProvider, WithStylesProvider } from '@src/context';
import { ChatService } from '@src/services';
import ConversationPanel from '..';

jest.mock('@src/services/ChatService');

describe('ConversationPanel', () => {
  const mockUserOne = {
    username: 'username1',
    _id: 'userid1'
  };

  const mockUserTwo = {
    username: 'username2',
    _id: 'userid2'
  };

  const publicMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message',
    _id: '19283'
  };

  const privateMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: '67890',
    channel: null,
    text: 'i am a private message',
    _id: '31892'
  };

  const TestComponent: React.FC<{ initialEntry?: string }> = ({
    initialEntry = '/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:chatId">
        <AuthContext.Provider
          value={{
            user: { username: 'test', id: '12345', jwt: 'jwt' },
            setUser: jest.fn()
          }}
        >
          <WithStylesProvider>
            <ChatProvider>
              <ConversationPanel />
            </ChatProvider>
          </WithStylesProvider>
        </AuthContext.Provider>
      </Route>
    </MemoryRouter>
  );

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: {
        channels: [{ name: 'general', _id: '11221' }],
        chat: { '11221': [publicMessage], '67890': [privateMessage] },
        users: [mockUserOne, mockUserTwo]
      }
    });
  });

  it('renders public channels', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('i am a message')).toBeInTheDocument();
    });
  });

  it('renders direct messages', async () => {
    const { getByText } = render(<TestComponent initialEntry="/67890" />);

    await waitFor(() => {
      expect(getByText('i am a private message')).toBeInTheDocument();
    });
  });
});
