import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WithStylesProvider } from '@src/context';
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
    const { getByText } = render(<TestComponent />);

    expect(getByText('Log in to enter Simple Chat!')).toBeInTheDocument();
  });

  it('renders the chat page', async () => {
    const { getByText } = render(<TestComponent initialEntry="/channels/general" />);

    await waitFor(() => {
      expect(getByText('Current user')).toBeInTheDocument();
    });
  });

  it('renders the 404 page', async () => {
    const { getByText } = render(<TestComponent initialEntry="/some/fake/route" />);

    await waitFor(() => {
      expect(getByText('You must be lost...')).toBeInTheDocument();
    });
  });
});
