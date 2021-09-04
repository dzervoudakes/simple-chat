import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { ChatIcon } from '..';

describe('ChatIcon', () => {
  it('renders', () => {
    render(
      <WithStylesProvider>
        <ChatIcon testid="chatIcon" />
      </WithStylesProvider>
    );

    expect(screen.getByTestId('chatIcon')).toBeInTheDocument();
  });
});
