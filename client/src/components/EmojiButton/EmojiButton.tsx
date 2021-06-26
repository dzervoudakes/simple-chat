import React, { useState } from 'react';
import { Picker, BaseEmoji } from 'emoji-mart';
import noop from 'lodash/noop';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';
import { EmojiIcon } from '@src/icons';
import './EmojiButton.scss';

interface EmojiButtonProps {
  onSelect?: (emoji: BaseEmoji) => void;
}

const stylesFn = ({ color, spacing }: Theme): Styles => ({
  emojiButton: {
    background: 'none',
    border: 'none',
    borderRadius: spacing.tiny,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    ':focus': {
      boxShadow: `0 0 0 0.2rem ${color.blueFocus}`,
      fill: color.primary
    }
  }
});

const EmojiButton: React.FC<EmojiButtonProps> = ({ onSelect = noop }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  const togglePicker = (): void => {
    setShowPicker(!showPicker);
  };

  return (
    <>
      {showPicker && (
        <Picker
          onSelect={(emoji) => {
            togglePicker();
            onSelect(emoji);
          }}
          emoji="smirk"
          title="Select an emoji"
          color="#119da4" // primary
          autoFocus
        />
      )}
      <button
        type="button"
        onClick={togglePicker}
        data-testid="emojiButton"
        {...css(styles.emojiButton)}
      >
        <EmojiIcon />
      </button>
    </>
  );
};

export default EmojiButton;
