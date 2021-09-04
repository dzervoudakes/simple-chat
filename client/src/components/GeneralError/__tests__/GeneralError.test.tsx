import { render, fireEvent, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import GeneralError from '..';

describe('GeneralError', () => {
  it('renders the error text', () => {
    render(
      <WithStylesProvider>
        <GeneralError testid="generalError" />
      </WithStylesProvider>
    );

    // using data-testid as this text is broken up by multiple elements
    expect(screen.getByTestId('generalError')).toHaveTextContent(
      'Uh oh, something went wrong.'
    );
  });

  it('reloads the page on click', () => {
    render(
      <WithStylesProvider>
        <GeneralError />
      </WithStylesProvider>
    );

    fireEvent.click(screen.getByText('refresh the page'));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
