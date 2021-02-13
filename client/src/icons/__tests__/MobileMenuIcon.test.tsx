import React from 'react';
import { render } from '@testing-library/react';
import { MobileMenuIcon } from '..';

describe('MobileMenuIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(<MobileMenuIcon testid="mobileMenuIcon" />);

    expect(getByTestId('mobileMenuIcon')).toBeInTheDocument();
  });
});
