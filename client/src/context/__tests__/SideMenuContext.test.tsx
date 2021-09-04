import { render, fireEvent, screen } from '@testing-library/react';
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
    render(<Wrapper />);

    expect(screen.getByText('Is side menu open: false')).toBeInTheDocument();
  });

  it('updates the current side menu open state', () => {
    render(<Wrapper />);

    fireEvent.click(screen.getByText('update state'));

    expect(screen.getByText('Is side menu open: true')).toBeInTheDocument();
  });
});
