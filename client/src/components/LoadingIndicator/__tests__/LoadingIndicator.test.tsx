import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Providers>
        <LoadingIndicator testid="loadingIndicator" />
      </Providers>
    );

    expect(getByTestId('loadingIndicator')).toBeInTheDocument();
  });
});
