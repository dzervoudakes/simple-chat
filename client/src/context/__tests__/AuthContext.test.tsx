import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AuthContext, AuthProvider } from '..';

describe('AuthContext', () => {
  const TestComponent: React.FC = () => (
    <AuthContext.Consumer>
      {({ user, setUser }) => (
        <>
          <div>Current username: {user?.username || 'empty'}</div>
          <div>Current id: {user?.id || 'empty'}</div>
          <div>Current jwt: {user?.jwt || 'empty'}</div>
          <button
            type="button"
            onClick={() => setUser({ username: 'test', id: '12345', jwt: 'jwt' })}
          >
            update user
          </button>
        </>
      )}
    </AuthContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  it('provides the current user', () => {
    render(<Wrapper />);

    expect(screen.getByText('Current username: empty')).toBeInTheDocument();
    expect(screen.getByText('Current id: empty')).toBeInTheDocument();
    expect(screen.getByText('Current jwt: empty')).toBeInTheDocument();
  });

  it('updates the current username', () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByText('update user'));

    expect(screen.getByText('Current username: test')).toBeInTheDocument();
    expect(screen.getByText('Current id: 12345')).toBeInTheDocument();
    expect(screen.getByText('Current jwt: jwt')).toBeInTheDocument();
  });
});
