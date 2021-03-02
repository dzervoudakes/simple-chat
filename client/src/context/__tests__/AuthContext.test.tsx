import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContext, AuthProvider } from '..';

describe('AuthContext', () => {
  const TestComponent: React.FC = () => (
    <AuthContext.Consumer>
      {({ user, setUser }) => (
        <>
          <div>Current username: {user.username !== null ? user.username : 'null'}</div>
          <div>Current id: {user.id !== null ? user.id : 'null'}</div>
          <div>Current jwt: {user.jwt !== null ? user.jwt : 'null'}</div>
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

    expect(getByText('Current username: null')).toBeInTheDocument();
    expect(getByText('Current id: null')).toBeInTheDocument();
    expect(getByText('Current jwt: null')).toBeInTheDocument();
  });

  it('updates the current username', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('update user'));

    expect(getByText('Current username: test')).toBeInTheDocument();
    expect(getByText('Current id: 12345')).toBeInTheDocument();
    expect(getByText('Current jwt: jwt')).toBeInTheDocument();
  });
});
