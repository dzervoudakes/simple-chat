import { render, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { EmojiIcon } from '..';

describe('EmojiIcon', () => {
  it('renders', () => {
    render(
      <WithStylesProvider>
        <EmojiIcon testid="emojiIcon" />
      </WithStylesProvider>
    );

    expect(screen.getByTestId('emojiIcon')).toBeInTheDocument();
  });
});
