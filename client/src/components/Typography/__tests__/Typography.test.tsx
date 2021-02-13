import React from 'react';
import { render } from '@testing-library/react';
import Typography from '..';

describe('Typography', () => {
  it('renders the h2 variant', () => {
    const { getByText } = render(<Typography variant="h2">hello world</Typography>);

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the h3 variant', () => {
    const { getByText } = render(<Typography variant="h3">hello world</Typography>);

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the default body variant', () => {
    const { getByText } = render(<Typography>hello world</Typography>);

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the disclaimer variant', () => {
    const { getByText } = render(
      <Typography variant="disclaimer">hello world</Typography>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
