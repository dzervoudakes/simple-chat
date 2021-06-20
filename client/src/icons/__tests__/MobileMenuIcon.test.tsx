import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { MobileMenuIcon } from '..';

describe('MobileMenuIcon', () => {
  it('renders', () => {
    render(
      <WithStylesProvider>
        <MobileMenuIcon testid="mobileMenuIcon" />
      </WithStylesProvider>
    );

    expect(screen.getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });
});
