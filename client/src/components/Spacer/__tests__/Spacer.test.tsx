import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Spacer from '..';

describe('Spacer', () => {
  it('renders as div and as span', () => {
    render(
      <WithStylesProvider>
        <Spacer as="div">as div</Spacer>
        <Spacer as="span">as span</Spacer>
      </WithStylesProvider>
    );

    expect(screen.getByText('as div', { selector: 'div' })).toBeInTheDocument();
    expect(screen.getByText('as span', { selector: 'span' })).toBeInTheDocument();
  });

  it('renders the children with padding prop', () => {
    render(
      <WithStylesProvider>
        <Spacer padding="large">hello world</Spacer>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with px and py props', () => {
    render(
      <WithStylesProvider>
        <Spacer px="large" py="large">
          hello world
        </Spacer>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the children with granular props', () => {
    render(
      <WithStylesProvider>
        <Spacer pt="large" pb="large" pr="large" pl="large">
          hello world
        </Spacer>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
