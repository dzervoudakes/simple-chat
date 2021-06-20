import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { getByText } = render(<Wrapper />);

    expect(getByText('Current username: empty')).toBeInTheDocument();
    expect(getByText('Current id: empty')).toBeInTheDocument();
    expect(getByText('Current jwt: empty')).toBeInTheDocument();
  });

  it('updates the current username', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('update user'));

    expect(getByText('Current username: test')).toBeInTheDocument();
    expect(getByText('Current id: 12345')).toBeInTheDocument();
    expect(getByText('Current jwt: jwt')).toBeInTheDocument();
  });
});
