import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

interface EmojiIconProps {
  testid?: string;
}

const stylesFn = ({ color }: Theme): Styles => ({
  emojiIcon: {
    fill: color.grayLight,
    transition: 'all 0.2s ease',
    ':hover': {
      fill: color.primary
    }
  }
});

export const EmojiIcon: React.FC<EmojiIconProps> = ({ testid }) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      data-testid={testid}
      {...css(styles.emojiIcon)}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10" />
      <path d="M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0" />
    </svg>
  );
};

export default EmojiIcon;
