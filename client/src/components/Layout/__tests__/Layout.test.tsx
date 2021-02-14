import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import Layout from '..';

describe('Layout', () => {
  it('renders the children', () => {
    const { getByText } = render(
      <Providers>
        <Layout>hello world</Layout>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
