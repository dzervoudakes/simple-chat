import React from 'react';
import { render } from '@testing-library/react';
import Providers from '@src/components/Providers';
import { ChatIcon } from '..';

describe('ChatIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <Providers>
        <ChatIcon testid="chatIcon" />
      </Providers>
    );

    expect(getByTestId('chatIcon')).toBeInTheDocument();
  });
});
