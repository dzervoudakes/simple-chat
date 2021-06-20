import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Layout from '..';

describe('Layout', () => {
  it('renders the children', () => {
    render(
      <WithStylesProvider>
        <Layout>hello world</Layout>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
