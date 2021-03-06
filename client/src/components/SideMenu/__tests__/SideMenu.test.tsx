import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import noop from 'lodash/noop';
import {
  AuthContext,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';
import { ChannelService, MessageService, UserService } from '@src/services';
import SideMenu from '..';

const mockPush = jest.fn();

jest.mock('@src/services/ChannelService');
jest.mock('@src/services/MessageService');
jest.mock('@src/services/UserService');
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockImplementation(() => ({
    push: mockPush
  }))
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
    <WithStylesProvider>
      <AuthContext.Provider
        value={{
          user: { username: 'AuthUser', id: '12345', jwt: 'jwt' },
          setUser: noop
        }}
      >
        <ChatProvider>
          <SideMenuProvider>
            <SideMenu />
          </SideMenuProvider>
        </ChatProvider>
      </AuthContext.Provider>
    </WithStylesProvider>
  );

  beforeEach(() => {
    ChannelService.getChannels = jest
      .fn()
      .mockResolvedValueOnce({ data: { channels: [{ name: 'general', _id: '12345' }] } });
    MessageService.getMessages = jest
      .fn()
      .mockResolvedValueOnce({ data: { messages: [] } });
    UserService.getUsers = jest
      .fn()
      .mockResolvedValueOnce({ data: { users: [mockUserOne, mockUserTwo] } });
  });

  it('renders', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Current user')).toBeInTheDocument();
      expect(getByText('Channels')).toBeInTheDocument();
      expect(getByText('Direct messages')).toBeInTheDocument();
      expect(getByText('general')).toBeInTheDocument();
      expect(getByText('username1')).toBeInTheDocument();
      expect(getByText('username2')).toBeInTheDocument();
    });
  });

  it('navigates to public and private conversations', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() => getByText('Current user'));

    fireEvent.click(getByText('general'));
    fireEvent.click(getByText('username1'));

    expect(mockPush).toHaveBeenNthCalledWith(1, '/channels/general');
    expect(mockPush).toHaveBeenNthCalledWith(2, '/direct/userid1');
  });
});