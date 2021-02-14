import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Providers from '@src/components/Providers';
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
        <Providers>
          <Missing />
        </Providers>
      </Router>
    );

    expect(getByText('You must be lost...')).toBeInTheDocument();
    expect(getByText("Let's get you back home.")).toBeInTheDocument();
  });

  it('redirects to the user selection page on click', () => {
    const { getByText } = render(
      <Providers>
        <Router initialEntries={['/missing']}>
          <Missing />
        </Router>
      </Providers>
    );

    fireEvent.click(getByText('Return to User Selection'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
