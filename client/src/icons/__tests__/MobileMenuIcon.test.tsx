import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import { MobileMenuIcon } from '..';

describe('MobileMenuIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Providers>
        <MobileMenuIcon testid="mobileMenuIcon" />
      </Providers>
    );

    expect(getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });
});
