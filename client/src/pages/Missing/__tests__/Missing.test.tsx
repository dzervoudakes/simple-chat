import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import noop from 'lodash/noop';
import { render, fireEvent } from '@testing-library/react';
import { AuthContext, WithStylesProvider } from '@src/context';
import Missing from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Missing', () => {
  const TestComponent: React.FC = () => (
    <MemoryRouter initialEntries={['/missing']}>
      <WithStylesProvider>
        <Missing />
      </WithStylesProvider>
    </MemoryRouter>
  );

  it('renders the title and description', () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText('You must be lost...')).toBeInTheDocument();
    expect(getByText("Let's get you back home.")).toBeInTheDocument();
  });

  it('redirects to the login form', () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.click(getByText('Return to login'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('redirects to the chat panel', () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{ user: { username: 'test', id: '12345', jwt: 'jwt' }, setUser: noop }}
      >
        <TestComponent />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText('Return to chat'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/channels/general');
  });
});
