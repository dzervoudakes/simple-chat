import { render, screen } from '@testing-library/react';

import { WithStylesProvider } from '@src/context';

import Card from '..';

describe('Card', () => {
  it('renders the children', () => {
    render(
      <WithStylesProvider>
        <Card>hello world</Card>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
