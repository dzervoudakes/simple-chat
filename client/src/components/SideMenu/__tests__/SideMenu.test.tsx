import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  AuthContext,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';
import { ChatService } from '@src/services';
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
  const mockUserOne = {
    username: 'username1',
    _id: 'userid1'
  };

  const mockUserTwo = {
    username: 'username2',
    _id: 'userid2'
  };

  const TestComponent: React.FC = () => (
    <MemoryRouter initialEntries={['/channels/11221']}>
      <WithStylesProvider>
        <AuthContext.Provider
          value={{
            user: { username: 'AuthUser', id: '12345', jwt: 'jwt' },
            setUser: jest.fn()
          }}
        >
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
    ChatService.getChat = jest.fn().mockResolvedValueOnce({
      data: {
        channels: [{ name: 'general', description: 'test description', _id: '11221' }],
        chat: {},
        users: [mockUserOne, mockUserTwo]
      }
    });
  });

  it('renders', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('Current user')).toBeInTheDocument();
      expect(screen.getByText('Channels')).toBeInTheDocument();
      expect(screen.getByText('Direct messages')).toBeInTheDocument();
      expect(screen.getByText('# general »')).toBeInTheDocument();
      expect(screen.getByText('username1')).toBeInTheDocument();
      expect(screen.getByText('username2')).toBeInTheDocument();
    });
  });

  it('navigates to public and private conversations', async () => {
    render(<TestComponent />);

    await screen.findByText('Current user');

    fireEvent.click(screen.getByText('# general »'));
    fireEvent.click(screen.getByText('username1'));

    expect(mockPush).toHaveBeenNthCalledWith(1, '/channels/11221');
    expect(mockPush).toHaveBeenNthCalledWith(2, '/direct/userid1');
  });
});
