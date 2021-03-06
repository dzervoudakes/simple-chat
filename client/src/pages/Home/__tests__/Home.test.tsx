import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { getByText } = render(<TestComponent />);

    expect(getByText('Log in to enter Simple Chat!')).toBeInTheDocument();
    expect(getByText('New to the app?')).toBeInTheDocument();
    expect(getByText('Sign up')).toBeInTheDocument();
  });

  it('Renders the sign up view', () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.click(getByText('Sign up'));

    expect(getByText('Sign up to enter Simple Chat!')).toBeInTheDocument();
    expect(getByText('Already a member?')).toBeInTheDocument();
    expect(getByText('Log in')).toBeInTheDocument();
    expect(
      getByText(
        'Pro tip: this is a demo app with very few real-world features. Keep a record of your username and password, as you will not be able to change or recover your account later.'
      )
    ).toBeInTheDocument();
  });
});
