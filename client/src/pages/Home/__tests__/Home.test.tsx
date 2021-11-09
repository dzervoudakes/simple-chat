import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WithStylesProvider } from '@src/context';

import Home from '..';

describe('Home', () => {
  const TestComponent: React.FC = () => (
    <MemoryRouter initialEntries={['/']}>
      <WithStylesProvider>
        <Home />
      </WithStylesProvider>
    </MemoryRouter>
  );

  it('Renders the login view', () => {
    render(<TestComponent />);

    expect(screen.getByText('Log in to enter Simple Chat!')).toBeInTheDocument();
    expect(screen.getByText('New to the app?')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('Renders the sign up view', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Sign up'));

    expect(screen.getByText('Sign up to enter Simple Chat!')).toBeInTheDocument();
    expect(screen.getByText('Already a member?')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Pro tip: this is a demo app with very few real-world features. Keep a record of your username and password, as you will not be able to change or recover your account later.'
      )
    ).toBeInTheDocument();
  });
});
