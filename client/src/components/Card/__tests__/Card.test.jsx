import React from 'react';
import { render } from '@testing-library/react';
import Card from '..';

describe('Card', () => {
  it('renders the children', () => {
    const { getByText } = render(<Card>hello world</Card>);

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
