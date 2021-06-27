import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import noop from 'lodash/noop';
import { ChatContext, WithStylesProvider } from '@src/context';
import ConversationHeader from '..';

describe('ConversationHeader', () => {
  interface TestComponentProps {
    initialEntry?: string;
  }

  const TestComponent: React.FC<TestComponentProps> = ({
    initialEntry = '/channels/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:conversationType/:conversationId">
        <WithStylesProvider>
          <ChatContext.Provider
            value={{
              channels: [
                { name: 'general', description: 'test description', _id: '11221' }
              ],
              chat: {},
              chatDispatch: noop,
              error: false,
              loading: false,
              users: [{ username: 'TestUser123', _id: '67890' }]
            }}
          >
            <ConversationHeader />
          </ChatContext.Provider>
        </WithStylesProvider>
      </Route>
    </MemoryRouter>
  );

  it('renders the name and description of the current channel', () => {
    render(<TestComponent />);

    expect(screen.getByText('# general')).toBeInTheDocument();
    expect(screen.getByText('test description')).toBeInTheDocument();
  });

  it('renders the username for the current direct message', () => {
    render(<TestComponent initialEntry="/direct/67890" />);

    expect(screen.getByText('TestUser123')).toBeInTheDocument();
  });
});
