import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

const stylesFn = ({ border, color, spacing }: Theme): Styles => ({
  card: {
    background: color.white,
    border: border.thinTertiary,
    borderRadius: spacing.tiny,
    boxShadow: '0 0.625rem 1.25rem 0 rgba(89, 89, 89, 0.1)',
    margin: `${spacing.medium} auto 0`,
    maxWidth: '30rem', // 480px
    padding: `${spacing.xlarge} ${spacing.small}`,
    textAlign: 'center'
  }
});

const Card: React.FC = ({ children }) => {
  const { css, styles } = useStyles({ stylesFn });

  return <div {...css(styles.card)}>{children}</div>;
};

export default Card;
