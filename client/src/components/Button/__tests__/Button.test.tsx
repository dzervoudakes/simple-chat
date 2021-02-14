import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import Button from '..';

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button>primary</Button>
        </WithStylesProvider>
      );

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button variant="secondary">secondary</Button>
        </WithStylesProvider>
      );

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link variant', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button variant="link">link</Button>
        </WithStylesProvider>
      );

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders primary disabled', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button disabled>primary</Button>
        </WithStylesProvider>
      );

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary disabled', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button variant="secondary" disabled>
            secondary
          </Button>
        </WithStylesProvider>
      );

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link disabled', () => {
      const { getByText } = render(
        <WithStylesProvider>
          <Button variant="link" disabled>
            link
          </Button>
        </WithStylesProvider>
      );

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('fires a click handler', () => {
      let i = 0;
      const { getByText } = render(
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

      fireEvent.click(getByText('primary'));

      expect(i).toBe(1);
    });

    it('does not fire a click handler when disabled', () => {
      let i = 0;
      const { getByText } = render(
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

      fireEvent.click(getByText('primary'));

      expect(i).toBe(0);
    });
  });
});
