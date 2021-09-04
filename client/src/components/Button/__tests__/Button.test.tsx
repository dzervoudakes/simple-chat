import { render, fireEvent, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Button from '..';

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant', () => {
      render(
        <WithStylesProvider>
          <Button>primary</Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      render(
        <WithStylesProvider>
          <Button variant="secondary">secondary</Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('secondary')).toBeInTheDocument();
    });

    it('renders link variant', () => {
      render(
        <WithStylesProvider>
          <Button variant="link">link</Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('link')).toBeInTheDocument();
    });

    it('renders linkLight variant', () => {
      render(
        <WithStylesProvider>
          <Button variant="linkLight">link</Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('link')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders primary disabled', () => {
      render(
        <WithStylesProvider>
          <Button disabled>primary</Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary disabled', () => {
      render(
        <WithStylesProvider>
          <Button variant="secondary" disabled>
            secondary
          </Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('secondary')).toBeInTheDocument();
    });

    it('renders link disabled', () => {
      render(
        <WithStylesProvider>
          <Button variant="link" disabled>
            link
          </Button>
        </WithStylesProvider>
      );

      expect(screen.getByText('link')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('fires a click handler', () => {
      let i = 0;
      render(
        <WithStylesProvider>
          <Button
            onClick={() => {
              i += 1;
            }}
          >
            primary
          </Button>
        </WithStylesProvider>
      );

      fireEvent.click(screen.getByText('primary'));

      expect(i).toBe(1);
    });

    it('does not fire a click handler when disabled', () => {
      let i = 0;
      render(
        <WithStylesProvider>
          <Button
            disabled
            onClick={() => {
              i += 1;
            }}
          >
            primary
          </Button>
        </WithStylesProvider>
      );

      fireEvent.click(screen.getByText('primary'));

      expect(i).toBe(0);
    });
  });
});
