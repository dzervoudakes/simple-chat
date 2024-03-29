import { renderHook } from '@testing-library/react-hooks';

import { AuthContext } from '@src/context';
import { mockAuthContext } from '@src/test';

import { useAuth } from '..';

describe('useAuth', () => {
  const TestComponent: React.FC = ({ children }) => (
    <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: TestComponent });
    const { user } = result.current;

    expect(user?.username).toBe('test');
    expect(user?.id).toBe('12345');
    expect(user?.jwt).toBe('jwt');
  });
});
