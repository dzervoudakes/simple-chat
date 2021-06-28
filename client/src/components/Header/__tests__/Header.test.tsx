import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useMediaQuery } from 'react-responsive';
import { AuthContext, SideMenuProvider, WithStylesProvider } from '@src/context';
import { mockAuthContext } from '@src/test';
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
      <AuthContext.Provider value={mockAuthContext}>
        <SideMenuProvider>
          <Header />
        </SideMenuProvider>
      </AuthContext.Provider>
    </WithStylesProvider>
  );

  it('renders on desktop', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(<TestComponent />);

    expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
    expect(screen.queryByTestId('mobileMenuIcon')).toBeNull();
  });

  it('renders on mobile', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(<TestComponent />);

    expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
    expect(screen.getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });

  it('opens the mobile menu', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(<TestComponent />);

    fireEvent.click(screen.getByTestId('mobileMenuIcon'));

    expect(mockSetIsSideMenuOpen).toHaveBeenCalledWith(true);
  });
});
