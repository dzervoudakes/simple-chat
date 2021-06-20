import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  AuthContext,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';
import Chat from '..';

describe('Chat', () => {
  it('renders', () => {
    render(
      <MemoryRouter initialEntries={['/channels/11221']}>
        <Route path="/:chatType/:chatId">
          <WithStylesProvider>
            <AuthContext.Provider
              value={{
                user: { username: 'test', id: '12345', jwt: 'jwt' },
                setUser: jest.fn()
              }}
            >
              <ChatProvider>
                <SideMenuProvider>
                  <Chat />
                </SideMenuProvider>
              </ChatProvider>
            </AuthContext.Provider>
          </WithStylesProvider>
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText('Current user')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type your message here, then press 'Enter' to send.")
    ).toBeInTheDocument();
  });
});
