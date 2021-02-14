import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Missing from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as jest.Mock),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Missing', () => {
  it('renders the title and description', () => {
    const { getByText } = render(
      <Router initialEntries={['/missing']}>
        <WithStylesProvider>
          <Missing />
        </WithStylesProvider>
      </Router>
    );

    expect(getByText('You must be lost...')).toBeInTheDocument();
    expect(getByText("Let's get you back home.")).toBeInTheDocument();
  });

  it('redirects to the user selection page on click', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Router initialEntries={['/missing']}>
          <Missing />
        </Router>
      </WithStylesProvider>
    );

    fireEvent.click(getByText('Return to User Selection'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
