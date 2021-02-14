import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import Card from '..';

describe('Card', () => {
  it('renders the children', () => {
    const { getByText } = render(
      <Providers>
        <Card>hello world</Card>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
