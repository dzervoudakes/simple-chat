import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import GeneralError from '..';

describe('GeneralError', () => {
  it('renders the error text', () => {
    const { getByTestId } = render(
      <WithStylesProvider>
        <GeneralError testid="generalError" />
      </WithStylesProvider>
    );

    // using data-testid as this text is broken up by multiple elements
    expect(getByTestId('generalError')).toHaveTextContent('Uh oh, something went wrong.');
  });

  it('reloads the page on click', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <GeneralError />
      </WithStylesProvider>
    );

    fireEvent.click(getByText('refresh the page'));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
