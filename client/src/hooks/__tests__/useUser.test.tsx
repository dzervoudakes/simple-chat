import React from 'react';
import noop from 'lodash/noop';
import { renderHook } from '@testing-library/react-hooks';
import { UserContext } from '@src/context';
import { useUser } from '..';

describe('useUser', () => {
  const TestComponent: React.FC = ({ children }) => (
    <UserContext.Provider value={{ username: 'test', setUsername: noop }}>
      {children}
    </UserContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useUser(), { wrapper: TestComponent });
    const { username } = result.current;

    expect(username).toBe('test');
  });
});
