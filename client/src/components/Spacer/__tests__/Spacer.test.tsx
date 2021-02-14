import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Spacer from '..';

describe('Spacer', () => {
  it('renders the children with padding prop', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Spacer padding="large">hello world</Spacer>
      </WithStylesProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with px and py props', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Spacer px="large" py="large">
          hello world
        </Spacer>
      </WithStylesProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with granular props', () => {
    const { getByText } = render(
      <WithStylesProvider>
        <Spacer pt="large" pb="large" pr="large" pl="large">
          hello world
        </Spacer>
      </WithStylesProvider>
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
