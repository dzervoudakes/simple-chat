import React from 'react';
import { render } from '@testing-library/react';
import Spacer from '..';

describe('Spacer', () => {
  it('renders the children with padding prop', () => {
    const { getByText } = render(<Spacer padding="large">hello world</Spacer>);

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with px and py props', () => {
    const { getByText } = render(
      <Spacer px="large" py="large">
        hello world
      </Spacer>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with granular props', () => {
    const { getByText } = render(
      <Spacer pt="large" pb="large" pr="large" pl="large">
        hello world
      </Spacer>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
