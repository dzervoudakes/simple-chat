import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  AuthContext,
  ChatProvider,
  SocketProvider,
  WithStylesProvider
} from '@src/context';
import { ChatService } from '@src/services';
import MessageForm from '..';

const mockCreateMessage = jest.fn();
const mockSendChatMessage = jest.fn();

jest.mock('@src/services/ChatService');
jest.mock('@src/socket', () => {
  return {
    Socket: jest.fn().mockImplementation(() => {
      return {
        disconnect: jest.fn(),
        subscribeToChat: jest.fn(),
        sendChatMessage: mockSendChatMessage
      };
    })
  };
});
jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn()
    }))
  },
  isCancel: jest.fn().mockImplementation(() => false)
}));

describe('MessageForm', () => {
  const placeholderText = "Type your message here, then press 'Enter' to send.";

  const publicMessage = {
    username: 'test',
    senderId: '12345',
    text: 'i am a message',
    recipientId: null,
    channel: 'general'
  };

  const privateMessage = {
    username: 'test',
    senderId: '12345',
    text: 'i am a private message',
    recipientId: '67890',
    channel: null
  };

  const TestComponent: React.FC<{ initialEntry?: string }> = ({
    initialEntry = '/channels/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:chatType/:chatId">
        <AuthContext.Provider
          value={{
            user: { username: 'test', id: '12345', jwt: 'jwt' },
            setUser: jest.fn()
          }}
        >
          <WithStylesProvider>
            <ChatProvider>
              <SocketProvider>
                <MessageForm />
              </SocketProvider>
            </ChatProvider>
          </WithStylesProvider>
        </AuthContext.Provider>
      </Route>
    </MemoryRouter>
  );

  beforeAll(() => {
    ChatService.createMessage = mockCreateMessage;
  });

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: { channels: [{ name: 'general', _id: '11221' }], chat: {}, users: [] }
    });
  });

  it('renders', () => {
    render(<TestComponent />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('submits a public message', async () => {
    mockCreateMessage.mockResolvedValueOnce({ data: { message: publicMessage } });
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockCreateMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          data: publicMessage,
          jwt: 'jwt'
        })
      );
      expect(mockSendChatMessage).toHaveBeenCalledWith('public', publicMessage);
    });
  });

  it('submits a private message', async () => {
    mockCreateMessage.mockResolvedValueOnce({ data: { message: privateMessage } });
    render(<TestComponent initialEntry="/direct/67890" />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a private message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockCreateMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          data: privateMessage,
          jwt: 'jwt'
        })
      );
      expect(mockSendChatMessage).toHaveBeenCalledWith('private', privateMessage);
    });
  });

  it('displays the error state', async () => {
    mockCreateMessage.mockRejectedValueOnce('');
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText('Uh oh, something went wrong.')).toBeInTheDocument();
    });
  });
});
