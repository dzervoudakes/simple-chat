import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext, ChatProvider, WithStylesProvider } from '@src/context';
import { ChatService } from '@src/services';
import { mockAuthContext, mockGetChatSuccess } from '@src/test';
import ConversationPanel from '..';

jest.mock('@src/services/ChatService');

describe('ConversationPanel', () => {
  const TestComponent: React.FC<{ initialEntry?: string }> = ({
    initialEntry = '/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:conversationId">
        <AuthContext.Provider value={mockAuthContext}>
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
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockGetChatSuccess);
  });

  it('renders public channels', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('i am a message')).toBeInTheDocument();
    });
  });

  it('renders direct messages', async () => {
    render(<TestComponent initialEntry="/67890" />);

    await waitFor(() => {
      expect(screen.getByText('i am a private message')).toBeInTheDocument();
    });
  });

  it('renders the empty state', async () => {
    const mockData = { ...mockGetChatSuccess };
    mockData.data.chat['67890'] = [];
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockData);
    render(<TestComponent initialEntry="/67890" />);

    await waitFor(() => {
      expect(
        screen.getByText('Nothing here, yet! Send a message to get things started.')
      ).toBeInTheDocument();
    });
  });
});
