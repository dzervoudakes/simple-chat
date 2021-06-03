import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'disclaimer';
}

const stylesFn = ({ typography: { h1, h2, h3, body, disclaimer } }: Theme): Styles => ({
  h1,
  h2,
  h3,
  body,
  disclaimer
});

const Typography: React.FC<TypographyProps> = ({ children, variant = 'body' }) => {
  const { css, styles } = useStyles({ stylesFn });

  const componentMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    disclaimer: 'p'
  };

  const TextComponent = componentMapping[variant];

  return <TextComponent {...css(styles[variant])}>{children}</TextComponent>;
};

export default Typography;
