import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext, ChatContext, ChatProvider } from '@src/context';
import { ChannelService, MessageService, UserService } from '@src/services';

jest.mock('@src/services/ChannelService');
jest.mock('@src/services/MessageService');
jest.mock('@src/services/UserService');

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
      {({ chat, dataLoading, loadingError, updateChat }) => (
        <>
          <div>Message: {chat.general?.[0]?.text}</div>
          <div>Message: {chat.general?.[1]?.text}</div>
          <div>Message: {chat['67890']?.[0]?.text}</div>
          <div>Data loading: {dataLoading.toString()}</div>
          <div>Loading error: {loadingError.toString()}</div>
          <button type="button" onClick={() => updateChat(publicMessage)}>
            update public chat
          </button>
          <button
            type="button"
            onClick={() => updateChat({ ...publicMessage, text: 'i am another message' })}
          >
            update public chat again
          </button>
          <button type="button" onClick={() => updateChat(privateMessage)}>
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
    ChannelService.getChannels = jest
      .fn()
      .mockResolvedValueOnce({ data: { channels: [] } });
    MessageService.getMessages = jest
      .fn()
      .mockResolvedValueOnce({ data: { messages: [] } });
    UserService.getUsers = jest.fn().mockResolvedValueOnce({ data: { users: [] } });
  });

  it('updates the current message list for a public channel', () => {
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a message')).toBeNull();
    expect(queryByText('Message: i am another message')).toBeNull();

    fireEvent.click(getByText('update public chat'));
    fireEvent.click(getByText('update public chat again'));

    expect(getByText('Message: i am a message')).toBeInTheDocument();
    expect(getByText('Message: i am another message')).toBeInTheDocument();
  });

  it('updates the current message list for a private conversation', () => {
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a private message')).toBeNull();

    fireEvent.click(getByText('update private chat'));
    expect(getByText('Message: i am a private message')).toBeInTheDocument();
  });

  it('populates the default chat object', async () => {
    ChannelService.getChannels = jest
      .fn()
      .mockResolvedValueOnce({ data: { channels: [{ name: 'general', _id: '12345' }] } });
    MessageService.getMessages = jest
      .fn()
      .mockResolvedValueOnce({ data: { messages: [publicMessage, privateMessage] } });
    const { getByText } = render(<Wrapper />);

    await waitFor(() => {
      expect(getByText('Message: i am a message')).toBeInTheDocument();
      expect(getByText('Message: i am a private message')).toBeInTheDocument();
    });
  });

  it('handles the error state', async () => {
    ChannelService.getChannels = jest.fn().mockRejectedValueOnce('error');
    const { getByText } = render(<Wrapper />);

    expect(getByText('Data loading: true')).toBeInTheDocument();
    expect(getByText('Loading error: false')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Data loading: false')).toBeInTheDocument();
      expect(getByText('Loading error: true')).toBeInTheDocument();
    });
  });
});
