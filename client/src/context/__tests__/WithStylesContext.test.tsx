import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '..';

describe('WithStylesContext', () => {
  it('renders the children', () => {
    const { getByText } = render(<WithStylesProvider>foo</WithStylesProvider>);

    expect(getByText('foo')).toBeInTheDocument();
  });
});
