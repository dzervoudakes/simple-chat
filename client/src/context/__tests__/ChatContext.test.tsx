import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext, ChatContext, ChatProvider } from '@src/context';
import { ChatService } from '@src/services';

jest.mock('@src/services/ChatService');

describe('ChatContext', () => {
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
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a message')).toBeNull();
    expect(queryByText('Message: i am another message')).toBeNull();

    await waitFor(() => {
      fireEvent.click(getByText('update public chat'));
      fireEvent.click(getByText('update public chat again'));

      expect(getByText('Message: i am a message')).toBeInTheDocument();
      expect(getByText('Message: i am another message')).toBeInTheDocument();
    });
  });

  it('updates the current message list for a private conversation', async () => {
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a private message')).toBeNull();

    await waitFor(() => {
      fireEvent.click(getByText('update private chat'));
      expect(getByText('Message: i am a private message')).toBeInTheDocument();
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
    const { getByText } = render(<Wrapper />);

    await waitFor(() => {
      expect(getByText('Message: i am a message')).toBeInTheDocument();
      expect(getByText('Message: i am a private message')).toBeInTheDocument();
    });
  });

  it('handles the error state', async () => {
    ChatService.getChat = jest.fn().mockRejectedValueOnce('error');
    const { getByText } = render(<Wrapper />);

    expect(getByText('Data loading: true')).toBeInTheDocument();
    expect(getByText('Loading error: false')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Data loading: false')).toBeInTheDocument();
      expect(getByText('Loading error: true')).toBeInTheDocument();
    });
  });
});
