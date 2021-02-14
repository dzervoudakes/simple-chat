import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SideMenuContext, SideMenuProvider } from '..';

describe('SideMenuContext', () => {
  const TestComponent: React.FC = () => (
    <SideMenuContext.Consumer>
      {({ isSideMenuOpen, setIsSideMenuOpen }) => (
        <>
          <div>Is side menu open: {isSideMenuOpen.toString()}</div>
          <button type="button" onClick={() => setIsSideMenuOpen(true)}>
            update state
          </button>
        </>
      )}
    </SideMenuContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <SideMenuProvider>
      <TestComponent />
    </SideMenuProvider>
  );

  it('provides the current side menu open state', () => {
    const { getByText } = render(<Wrapper />);

    expect(getByText('Is side menu open: false')).toBeInTheDocument();
  });

  it('updates the current side menu open state', () => {
    const { getByText } = render(<Wrapper />);

    fireEvent.click(getByText('update state'));

    expect(getByText('Is side menu open: true')).toBeInTheDocument();
  });
});
