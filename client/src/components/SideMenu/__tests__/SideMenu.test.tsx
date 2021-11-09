import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import {
  AuthContext,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';
import { ChatService } from '@src/services';
import { mockAuthContext, mockGetChatSuccess } from '@src/test';

import SideMenu from '..';

const mockPush = jest.fn();

jest.mock('@src/services/ChatService');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useHistory: jest.fn().mockImplementation(() => ({
    push: mockPush
  })),
  useParams: jest
    .fn()
    .mockImplementation(() => ({ conversationId: '11221', conversationType: 'channels' }))
}));

describe('SideMenu', () => {
  const TestComponent: React.FC = () => (
    <MemoryRouter initialEntries={['/channels/11221']}>
      <WithStylesProvider>
        <AuthContext.Provider value={mockAuthContext}>
          <ChatProvider>
            <SideMenuProvider>
              <SideMenu />
            </SideMenuProvider>
          </ChatProvider>
        </AuthContext.Provider>
      </WithStylesProvider>
    </MemoryRouter>
  );

  beforeEach(() => {
    ChatService.getChat = jest.fn().mockResolvedValueOnce(mockGetChatSuccess);
  });

  it('renders', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('Current User')).toBeInTheDocument();
      expect(screen.getByText('Channels')).toBeInTheDocument();
      expect(screen.getByText('Direct Messages')).toBeInTheDocument();
      expect(screen.getByText('# general »')).toBeInTheDocument();
      expect(screen.getByText('username1')).toBeInTheDocument();
      expect(screen.getByText('username2')).toBeInTheDocument();
    });
  });

  it('navigates to public and private conversations', async () => {
    render(<TestComponent />);

    await screen.findByText('Current User');

    fireEvent.click(screen.getByText('# general »'));
    fireEvent.click(screen.getByText('username1'));

    expect(mockPush).toHaveBeenNthCalledWith(1, '/channels/11221');
    expect(mockPush).toHaveBeenNthCalledWith(2, '/direct/userid1');
  });
});
