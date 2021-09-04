import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ChatContext, WithStylesProvider } from '@src/context';
import { mockChatContext } from '@src/test';
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
          <ChatContext.Provider value={mockChatContext}>
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
    render(<TestComponent initialEntry="/direct/userid1" />);

    expect(screen.getByText('username1')).toBeInTheDocument();
  });
});
