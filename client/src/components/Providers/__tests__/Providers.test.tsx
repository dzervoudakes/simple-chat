import React from 'react';
import { render } from '@testing-library/react';
import Providers from '..';

describe('Providers', () => {
  it('renders the children', () => {
    const { getByText } = render(<Providers>foo</Providers>);

    expect(getByText('foo')).toBeInTheDocument();
  });
});
