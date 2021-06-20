import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '..';

describe('WithStylesContext', () => {
  it('renders the children', () => {
    render(<WithStylesProvider>foo</WithStylesProvider>);

    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
