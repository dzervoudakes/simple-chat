import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext, ChatProvider, WithStylesProvider } from '@src/context';
import { MessageService } from '@src/services';
import MessageForm from '..';

const mockCreateMessage = jest.fn();
const mockSendChatMessage = jest.fn();

jest.mock('@src/services/MessageService');
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
    initialEntry = '/channels/general'
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
              <MessageForm />
            </ChatProvider>
          </WithStylesProvider>
        </AuthContext.Provider>
      </Route>
    </MemoryRouter>
  );

  beforeAll(() => {
    MessageService.createMessage = mockCreateMessage;
  });

  it('renders', () => {
    const { getByPlaceholderText } = render(<TestComponent />);

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('submits a public message', async () => {
    mockCreateMessage.mockResolvedValueOnce(publicMessage);
    const { getByPlaceholderText } = render(<TestComponent />);

    const input = getByPlaceholderText(placeholderText);
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
    mockCreateMessage.mockResolvedValueOnce(privateMessage);
    const { getByPlaceholderText } = render(
      <TestComponent initialEntry="/direct/67890" />
    );

    const input = getByPlaceholderText(placeholderText);
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
    const { getByText, getByPlaceholderText } = render(<TestComponent />);

    const input = getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'i am a message' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(getByText('Uh oh, something went wrong.')).toBeInTheDocument();
    });
  });
});
