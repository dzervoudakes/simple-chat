import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Layout from '..';

describe('Layout', () => {
  it('renders the children', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Layout>hello world</Layout>
      </WithStylesProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
