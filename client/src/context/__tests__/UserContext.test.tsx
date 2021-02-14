import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UserContext, UserProvider } from '..';

describe('UserContext', () => {
  const TestComponent: React.FC = () => (
    <UserContext.Consumer>
      {({ username, setUsername }) => (
        <>
          <div>Current username: {username !== null ? username : 'null'}</div>
          <button type="button" onClick={() => setUsername('Michael')}>
            update username
          </button>
        </>
      )}
    </UserContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <UserProvider>
      <TestComponent />
    </UserProvider>
  );

  it('provides the current username', () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText('Current username: null')).toBeInTheDocument();
  });

  it('updates the current username', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('update username'));

    expect(getByText('Current username: Michael')).toBeInTheDocument();
  });
});
