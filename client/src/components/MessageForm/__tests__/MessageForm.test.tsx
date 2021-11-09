import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import {
  AuthContext,
  ChatProvider,
  SocketProvider,
  WithStylesProvider
} from '@src/context';
import { ChatService } from '@src/services';
import {
  mockAuthContext,
  mockGetChatSuccess,
  publicMessageWithoutMeta,
  privateMessageWithoutMeta
} from '@src/test';

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

  const TestComponent: React.FC<{ initialEntry?: string }> = ({
    initialEntry = '/channels/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:conversationType/:conversationId">
        <AuthContext.Provider value={mockAuthContext}>
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
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockGetChatSuccess);
  });

  it('renders', () => {
    render(<TestComponent />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('submits a public message', async () => {
    const message = { ...publicMessageWithoutMeta };
    message.text = 'i am a new public message';
    mockCreateMessage.mockResolvedValueOnce({ data: { message } });
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a new public message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockCreateMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          data: message,
          jwt: 'jwt'
        })
      );
      expect(mockSendChatMessage).toHaveBeenCalledWith('public', message);
    });
  });

  it('submits a private message', async () => {
    const message = { ...privateMessageWithoutMeta };
    message.text = 'i am a new private message';
    mockCreateMessage.mockResolvedValueOnce({ data: { message } });
    render(<TestComponent initialEntry="/direct/67890" />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a new private message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockCreateMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          data: message,
          jwt: 'jwt'
        })
      );
      expect(mockSendChatMessage).toHaveBeenCalledWith('private', message);
    });
  });

  it('displays the error state', async () => {
    mockCreateMessage.mockRejectedValueOnce('');
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a new message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(screen.getByText('Uh oh, something went wrong.')).toBeInTheDocument();
    });
  });
});
