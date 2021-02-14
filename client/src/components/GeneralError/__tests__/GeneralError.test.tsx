import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Providers from '@src/components/Providers';
import GeneralError from '..';

describe('GeneralError', () => {
  it('renders the error text', () => {
    const { getByTestId } = render(
      <Providers>
        <GeneralError testid="generalError" />
      </Providers>
    );

    // using data-testid as this text is broken up by multiple elements
    expect(getByTestId('generalError')).toHaveTextContent('Uh oh, something went wrong.');
  });

  it('reloads the page on click', () => {
    const { getByText } = render(
      <Providers>
        <GeneralError />
      </Providers>
    );

    fireEvent.click(getByText('refresh the page'));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
