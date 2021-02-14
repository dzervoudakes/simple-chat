import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import Typography from '..';

describe('Typography', () => {
  it('renders the h2 variant', () => {
    const { getByText } = render(
      <Providers>
        <Typography variant="h2">hello world</Typography>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the h3 variant', () => {
    const { getByText } = render(
      <Providers>
        <Typography variant="h3">hello world</Typography>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the default body variant', () => {
    const { getByText } = render(
      <Providers>
        <Typography>hello world</Typography>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the disclaimer variant', () => {
    const { getByText } = render(
      <Providers>
        <Typography variant="disclaimer">hello world</Typography>
      </Providers>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
