import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { MobileMenuIcon } from '..';

describe('MobileMenuIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <WithStylesProvider>
        <MobileMenuIcon testid="mobileMenuIcon" />
      </WithStylesProvider>
    );

    expect(getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });
});
