import React, { useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import noop from 'lodash/noop';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';
import { EmojiIcon } from '@src/icons';
import './EmojiButton.scss';

interface EmojiButtonProps {
  onEmojiClick?: (emojiObject: IEmojiData) => void;
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

const EmojiButton: React.FC<EmojiButtonProps> = ({ onEmojiClick = noop }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  const togglePicker = (): void => {
    setShowPicker(!showPicker);
  };

  return (
    <>
      {showPicker && (
        <div data-testid="emojiPicker">
          <Picker
            onEmojiClick={(event, emojiObject) => {
              togglePicker();
              onEmojiClick(emojiObject);
            }}
          />
        </div>
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
