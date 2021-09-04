import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Typography from '..';

describe('Typography', () => {
  it('renders the h1 variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="h1">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the h2 variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="h2">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the h3 variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="h3">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the blockHeader variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="blockHeader">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the default body variant', () => {
    render(
      <WithStylesProvider>
        <Typography>hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the disclaimer variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="disclaimer">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the disclaimerLight variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="disclaimerLight">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('renders the error variant', () => {
    render(
      <WithStylesProvider>
        <Typography variant="error">hello world</Typography>
      </WithStylesProvider>
    );

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
