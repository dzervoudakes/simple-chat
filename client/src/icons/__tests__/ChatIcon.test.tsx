import React from 'react';
import { render } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { ChatIcon } from '..';

describe('ChatIcon', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <WithStylesProvider>
        <ChatIcon testid="chatIcon" />
      </WithStylesProvider>
    );

    expect(getByTestId('chatIcon')).toBeInTheDocument();
  });
});
