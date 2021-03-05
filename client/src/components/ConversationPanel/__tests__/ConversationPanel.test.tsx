import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import noop from 'lodash/noop';
import { AuthContext, ChatProvider, WithStylesProvider } from '@src/context';
import { ChannelService, MessageService, UserService } from '@src/services';
import ConversationPanel from '..';

jest.mock('@src/services/ChannelService');
jest.mock('@src/services/MessageService');
jest.mock('@src/services/UserService');

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
    text: 'i am a message'
  };

  const privateMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: '67890',
    channel: null,
    text: 'i am a private message'
  };

  const TestComponent: React.FC = () => (
    <AuthContext.Provider
      value={{ user: { username: 'test', id: '12345', jwt: 'jwt' }, setUser: noop }}
    >
      <WithStylesProvider>
        <ChatProvider>
          <ConversationPanel />
        </ChatProvider>
      </WithStylesProvider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    ChannelService.getChannels = jest
      .fn()
      .mockResolvedValueOnce({ data: { channels: [{ name: 'general', _id: '12345' }] } });
    MessageService.getMessages = jest
      .fn()
      .mockResolvedValueOnce({ data: { messages: [publicMessage, privateMessage] } });
    UserService.getUsers = jest
      .fn()
      .mockResolvedValueOnce({ data: { users: [mockUserOne, mockUserTwo] } });
  });

  it('renders public channels', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/general']}>
        <Route path="/:chatId">
          <TestComponent />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText('i am a message')).toBeInTheDocument();
    });
  });

  it('renders direct messages', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/67890']}>
        <Route path="/:chatId">
          <TestComponent />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText('i am a private message')).toBeInTheDocument();
    });
  });
});
