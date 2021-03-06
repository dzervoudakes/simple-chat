import React from 'react';
import { render } from '@testing-library/react';
import noop from 'lodash/noop';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext, SideMenuProvider, WithStylesProvider } from '@src/context';
import Chat from '..';

describe('Chat', () => {
  it('renders', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={['/channels/general']}>
        <Route path="/:chatType/:chatId">
          <WithStylesProvider>
            <AuthContext.Provider
              value={{
                user: { username: 'test', id: '12345', jwt: 'jwt' },
                setUser: noop
              }}
            >
              <SideMenuProvider>
                <Chat />
              </SideMenuProvider>
            </AuthContext.Provider>
          </WithStylesProvider>
        </Route>
      </MemoryRouter>
    );

    expect(getByText('Current user')).toBeInTheDocument();
    expect(
      getByPlaceholderText("Type your message here, then press 'Enter' to send.")
    ).toBeInTheDocument();
  });
});
