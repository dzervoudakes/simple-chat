import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GeneralError from '..';

describe('GeneralError', () => {
  it('renders the error text', () => {
    const { getByTestId } = render(<GeneralError testid="generalError" />);

    // using data-testid as this text is broken up by multiple elements
    expect(getByTestId('generalError')).toHaveTextContent('Uh oh, something went wrong.');
  });

  it('reloads the page on click', () => {
    const { getByText } = render(<GeneralError />);

    fireEvent.click(getByText('refresh the page'));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
