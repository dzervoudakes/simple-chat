import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant', () => {
      const { getByText } = render(<Button>primary</Button>);

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      const { getByText } = render(<Button variant="secondary">secondary</Button>);

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link variant', () => {
      const { getByText } = render(<Button variant="link">link</Button>);

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('renders primary disabled', () => {
      const { getByText } = render(<Button disabled>primary</Button>);

      expect(getByText('primary')).toBeInTheDocument();
    });

    it('renders secondary disabled', () => {
      const { getByText } = render(
        <Button variant="secondary" disabled>
          secondary
        </Button>
      );

      expect(getByText('secondary')).toBeInTheDocument();
    });

    it('renders link disabled', () => {
      const { getByText } = render(
        <Button variant="link" disabled>
          link
        </Button>
      );

      expect(getByText('link')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('fires a click handler', () => {
      let i = 0;
      const { getByText } = render(
        <Button
          onClick={() => {
            i += 1;
          }}
        >
          primary
        </Button>
      );

      fireEvent.click(getByText('primary'));

      expect(i).toBe(1);
    });

    it('does not fire a click handler when disabled', () => {
      let i = 0;
      const { getByText } = render(
        <Button
          disabled
          onClick={() => {
            i += 1;
          }}
        >
          primary
        </Button>
      );

      fireEvent.click(getByText('primary'));

      expect(i).toBe(0);
    });
  });
});
