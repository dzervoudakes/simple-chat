import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useMediaQuery } from 'react-responsive';
import { AuthContext, SideMenuProvider, WithStylesProvider } from '@src/context';
import Header from '..';

const mockSetIsSideMenuOpen = jest.fn();

jest.mock('@src/hooks/useSideMenu', () => {
  return {
    useSideMenu: jest.fn().mockImplementation(() => {
      return {
        isSideMenuOpen: false,
        setIsSideMenuOpen: mockSetIsSideMenuOpen
      };
    })
  };
});
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn()
}));

describe('Header', () => {
  const TestComponent: React.FC = () => (
    <WithStylesProvider>
      <AuthContext.Provider
        value={{
          user: { username: 'test', id: '12345', jwt: 'jwt' },
          setUser: jest.fn()
        }}
      >
        <SideMenuProvider>
          <Header />
        </SideMenuProvider>
      </AuthContext.Provider>
    </WithStylesProvider>
  );

  it('renders on desktop', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    const { getByText, getByTestId, queryByTestId } = render(<TestComponent />);

    expect(getByTestId('chatIcon')).toBeInTheDocument();
    expect(getByText('Simple Chat')).toBeInTheDocument();
    expect(queryByTestId('mobileMenuIcon')).toBeNull();
  });

  it('renders on mobile', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    const { getByText, getByTestId } = render(<TestComponent />);

    expect(getByTestId('chatIcon')).toBeInTheDocument();
    expect(getByText('Simple Chat')).toBeInTheDocument();
    expect(getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });

  it('opens the mobile menu', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    const { getByTestId } = render(<TestComponent />);

    fireEvent.click(getByTestId('mobileMenuIcon'));

    expect(mockSetIsSideMenuOpen).toHaveBeenCalledWith(true);
  });
});
