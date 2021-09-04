import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { AuthContext, ChatContext, ChatProvider } from '@src/context';
import { ChatService } from '@src/services';
import {
  mockAuthContext,
  mockGetChatSuccess,
  mockGetChatSuccessEmpty,
  publicMessage,
  privateMessage
} from '@src/test';

jest.mock('@src/services/ChatService');

describe('ChatContext', () => {
  const newUser = {
    username: 'NewUser123',
    _id: '66778'
  };

  const TestComponent: React.FC = () => (
    <ChatContext.Consumer>
      {({ chat, loading, error, users, chatDispatch }) => (
        <>
          <div>Message: {chat['11221']?.[0]?.text}</div>
          <div>Message: {chat['11221']?.[1]?.text}</div>
          <div>Message: {chat['67890']?.[0]?.text}</div>
          <div>Data loading: {loading.toString()}</div>
          <div>Loading error: {error.toString()}</div>
          <div>New user: {users[0]?.username}</div>
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
          <button
            type="button"
            onClick={() => chatDispatch({ type: 'UPDATE_USERS', payload: newUser })}
          >
            update users
          </button>
        </>
      )}
    </ChatContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <AuthContext.Provider value={mockAuthContext}>
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockGetChatSuccessEmpty);
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

  it('updates the current users list', async () => {
    render(<Wrapper />);

    expect(screen.queryByText('New user: NewUser123')).toBeNull();

    await waitFor(() => {
      fireEvent.click(screen.getByText('update users'));
      expect(screen.getByText('New user: NewUser123')).toBeInTheDocument();
    });
  });

  it('populates the default chat object', async () => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockGetChatSuccess);
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
