import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Card from '..';

describe('Card', () => {
  it('renders the children', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Card>hello world</Card>
      </WithStylesProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
