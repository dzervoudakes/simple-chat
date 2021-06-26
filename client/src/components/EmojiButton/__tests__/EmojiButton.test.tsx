import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import EmojiButton from '..';

describe('EmojiButton', () => {
  it('displays the emoji picker', () => {
    render(
      <WithStylesProvider>
        <EmojiButton />
      </WithStylesProvider>
    );

    expect(screen.queryByTestId('emojiPicker')).toBeNull();

    fireEvent.click(screen.getByTestId('emojiButton'));
    expect(screen.getByTestId('emojiPicker')).toBeInTheDocument();
  });
});
