import React from 'react';
import { render, screen } from '@testing-library/react';
import Providers from '..';

describe('Providers', () => {
  it('renders', () => {
    render(<Providers>foo</Providers>);

    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
