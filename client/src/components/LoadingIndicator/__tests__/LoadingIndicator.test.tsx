import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders', () => {
    render(
      <WithStylesProvider>
        <LoadingIndicator testid="loadingIndicator" />
      </WithStylesProvider>
    );

    expect(screen.getByTestId('loadingIndicator')).toBeInTheDocument();
  });
});
