import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Providers from '@src/components/Providers';
import Button from '..';

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant', () => {
      const { getByText } = render(
        <Providers>
          <Button>primary</Button>
        </Providers>
      );

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      const { getByText } = render(
        <Providers>
          <Button variant="secondary">secondary</Button>
        </Providers>
      );

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link variant', () => {
      const { getByText } = render(
        <Providers>
          <Button variant="link">link</Button>
        </Providers>
      );

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders primary disabled', () => {
      const { getByText } = render(
        <Providers>
          <Button disabled>primary</Button>
        </Providers>
      );

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary disabled', () => {
      const { getByText } = render(
        <Providers>
          <Button variant="secondary" disabled>
            secondary
          </Button>
        </Providers>
      );

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link disabled', () => {
      const { getByText } = render(
        <Providers>
          <Button variant="link" disabled>
            link
          </Button>
        </Providers>
      );

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('fires a click handler', () => {
      let i = 0;
      const { getByText } = render(
        <Providers>
          <Button
            onClick={() => {
              i += 1;
            }}
          >
            primary
          </Button>
        </Providers>
      );

      fireEvent.click(getByText('primary'));

      expect(i).toBe(1);
    });

    it('does not fire a click handler when disabled', () => {
      let i = 0;
      const { getByText } = render(
        <Providers>
          <Button
            disabled
            onClick={() => {
              i += 1;
            }}
          >
            primary
          </Button>
        </Providers>
      );

      fireEvent.click(getByText('primary'));

      expect(i).toBe(0);
    });
  });
});
