import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';

import { Theme } from '@src/theme';

interface ChatIconProps {
  testid?: string;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  chatIcon: {
    height: spacing.medium
  }
});

export const ChatIcon: React.FC<ChatIconProps> = ({ testid }) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      data-testid={testid}
      {...css(styles.chatIcon)}
    >
      <g
        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M665 1815 c-257 -56 -465 -251 -524 -490 -17 -70 -15 -210 4 -285 19
-72 53 -145 98 -208 l31 -43 -26 -132 c-14 -72 -23 -137 -21 -144 12 -31 52
-24 177 33 l126 57 62 -21 c351 -114 735 34 887 343 68 138 79 318 28 457 -77
210 -260 370 -491 428 -93 23 -257 26 -351 5z m-70 -600 c46 -45 26 -127 -34
-140 -52 -11 -100 27 -101 81 0 72 85 110 135 59z m291 1 c54 -46 30 -127 -43
-142 -27 -5 -37 -1 -63 24 -32 32 -37 56 -19 96 22 48 83 59 125 22z m295 -5
c17 -18 29 -40 29 -56 0 -35 -50 -85 -85 -85 -35 0 -85 50 -85 85 0 16 12 38
29 56 38 38 74 38 112 0z"
        />
        <path
          d="M1576 1433 c47 -109 58 -308 24 -432 -36 -127 -94 -226 -192 -322
-159 -157 -378 -237 -616 -227 l-113 5 48 -34 c71 -51 152 -90 240 -115 117
-33 295 -31 416 6 l88 26 123 -55 c191 -85 196 -81 158 112 l-26 132 31 43
c78 109 113 219 113 353 0 189 -85 368 -227 480 -62 48 -80 55 -67 28z"
        />
      </g>
    </svg>
  );
};

export default ChatIcon;
