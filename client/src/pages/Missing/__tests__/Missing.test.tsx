import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { AuthContext, WithStylesProvider } from '@src/context';
import Missing from '..';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useHistory: () => ({
    push: mockPush
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
    render(<TestComponent />);

    expect(screen.getByText('You must be lost...')).toBeInTheDocument();
    expect(screen.getByText("Let's get you back home.")).toBeInTheDocument();
  });

  it('redirects to the login form', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Return to login'));

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('redirects to the chat panel', () => {
    render(
      <AuthContext.Provider
        value={{
          user: { username: 'test', id: '12345', jwt: 'jwt' },
          setUser: jest.fn()
        }}
      >
        <TestComponent />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Return to chat'));

    expect(mockPush).toHaveBeenCalledWith('/channels');
  });
});
