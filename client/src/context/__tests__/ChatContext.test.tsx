import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { AuthContext, ChatContext, ChatProvider } from '@src/context';
import { ChatService } from '@src/services';

jest.mock('@src/services/ChatService');

describe('ChatContext', () => {
  const publicMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message',
    _id: '11221',
    createdAt: '2021-02-28T22:31:02.589Z'
  };

  const privateMessage = {
    username: 'test',
    senderId: '12345',
    recipientId: '67890',
    channel: null,
    text: 'i am a private message',
    _id: '22112',
    createdAt: '2021-02-28T22:31:02.589Z'
  };

  const TestComponent: React.FC = () => (
    <ChatContext.Consumer>
      {({ chat, loading, error, chatDispatch }) => (
        <>
          <div>Message: {chat['11221']?.[0]?.text}</div>
          <div>Message: {chat['11221']?.[1]?.text}</div>
          <div>Message: {chat['67890']?.[0]?.text}</div>
          <div>Data loading: {loading.toString()}</div>
          <div>Loading error: {error.toString()}</div>
          <button
            type="button"
            onClick={() => chatDispatch({ type: 'UPDATE_CHAT', payload: publicMessage })}
          >
            update public chat
          </button>
          <button
            type="button"
            onClick={() =>
              chatDispatch({
                type: 'UPDATE_CHAT',
                payload: { ...publicMessage, text: 'i am another message' }
              })
            }
          >
            update public chat again
          </button>
          <button
            type="button"
            onClick={() => chatDispatch({ type: 'UPDATE_CHAT', payload: privateMessage })}
          >
            update private chat
          </button>
        </>
      )}
    </ChatContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <AuthContext.Provider
      value={{ user: { username: 'test', id: '12345', jwt: 'jwt' }, setUser: jest.fn() }}
    >
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: { channels: [{ name: 'general', _id: '11221' }], messages: [], users: [] }
    });
  });

  it('updates the current message list for a public channel', async () => {
    render(<Wrapper />);

    expect(screen.queryByText('Message: i am a message')).toBeNull();
    expect(screen.queryByText('Message: i am another message')).toBeNull();

    await waitFor(() => {
      fireEvent.click(screen.getByText('update public chat'));
      fireEvent.click(screen.getByText('update public chat again'));

      expect(screen.getByText('Message: i am a message')).toBeInTheDocument();
      expect(screen.getByText('Message: i am another message')).toBeInTheDocument();
    });
  });

  it('updates the current message list for a private conversation', async () => {
    render(<Wrapper />);

    expect(screen.queryByText('Message: i am a private message')).toBeNull();

    await waitFor(() => {
      fireEvent.click(screen.getByText('update private chat'));
      expect(screen.getByText('Message: i am a private message')).toBeInTheDocument();
    });
  });

  it('populates the default chat object', async () => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: {
        channels: [],
        chat: { '11221': [publicMessage], '67890': [privateMessage] },
        users: []
      }
    });
    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText('Message: i am a message')).toBeInTheDocument();
      expect(screen.getByText('Message: i am a private message')).toBeInTheDocument();
    });
  });

  it('handles the error state', async () => {
    ChatService.getChat = jest.fn().mockRejectedValueOnce('error');
    render(<Wrapper />);

    expect(screen.getByText('Data loading: true')).toBeInTheDocument();
    expect(screen.getByText('Loading error: false')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Data loading: false')).toBeInTheDocument();
      expect(screen.getByText('Loading error: true')).toBeInTheDocument();
    });
  });
});
