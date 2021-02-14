import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <WithStylesProvider>
        <LoadingIndicator testid="loadingIndicator" />
      </WithStylesProvider>
    );

    expect(getByTestId('loadingIndicator')).toBeInTheDocument();
  });
});
