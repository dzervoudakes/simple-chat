import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import { SideMenuProvider, WithStylesProvider } from '@src/context';

import SideMenuButton from '..';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useHistory: jest.fn().mockImplementation(() => ({
    push: mockPush
  }))
}));

describe('SideMenuButton', () => {
  interface TestComponentProps {
    id?: string;
    initialEntry?: string;
  }

  const TestComponent: React.FC<TestComponentProps> = ({
    id = '12345',
    initialEntry = '/channels/11221'
  }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Route path="/:coversationType/:conversationId">
        <WithStylesProvider>
          <SideMenuProvider>
            <SideMenuButton id={id} path="/channels" text="# general" />
          </SideMenuProvider>
        </WithStylesProvider>
      </Route>
    </MemoryRouter>
  );

  it('renders', () => {
    render(<TestComponent />);

    expect(screen.getByText('# general')).toBeInTheDocument();
  });

  it('renders the active state', () => {
    render(<TestComponent id="11221" />);

    expect(screen.getByText('# general »')).toBeInTheDocument();
  });

  it('calls history.push to change routes', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('# general'));
    expect(mockPush).toHaveBeenCalledWith('/channels/12345');
  });
});
