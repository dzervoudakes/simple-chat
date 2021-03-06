import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SideMenuContext } from '@src/context';
import { useSideMenu } from '..';

describe('useSideMenu', () => {
  const TestComponent: React.FC = ({ children }) => (
    <SideMenuContext.Provider
      value={{ isSideMenuOpen: false, setIsSideMenuOpen: jest.fn() }}
    >
      {children}
    </SideMenuContext.Provider>
  );

  it('returns the current isSideMenuOpen value', () => {
    const { result } = renderHook(() => useSideMenu(), { wrapper: TestComponent });
    const { isSideMenuOpen } = result.current;

    expect(isSideMenuOpen).toBe(false);
  });
});
