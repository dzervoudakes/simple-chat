import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, WithStylesProvider } from '@src/context';
import { mockAuthContext } from '@src/test';
import Routes from '..';

describe('Routes', () => {
  const TestComponent: React.FC<{ initialEntry?: string }> = ({ initialEntry = '/' }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <WithStylesProvider>
        <Routes />
      </WithStylesProvider>
    </MemoryRouter>
  );

  it('renders the home page', () => {
    render(<TestComponent />);

    expect(screen.getByText('Log in to enter Simple Chat!')).toBeInTheDocument();
  });

  it('renders the chat page', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <TestComponent initialEntry="/channels/11221" />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Current User')).toBeInTheDocument();
    });
  });

  it('renders the 404 page', async () => {
    render(<TestComponent initialEntry="/some/fake/route" />);

    await waitFor(() => {
      expect(screen.getByText('You must be lost...')).toBeInTheDocument();
    });
  });
});
