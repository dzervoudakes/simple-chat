import React from 'react';
import { render } from '@testing-library/react';
import { ChatIcon } from '..';

describe('ChatIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(<ChatIcon testid="chatIcon" />);

    expect(getByTestId('chatIcon')).toBeInTheDocument();
  });
});
