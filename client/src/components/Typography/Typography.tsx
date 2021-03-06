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

  return (
    <TextComponent
      {...css(
        variant === 'h1' && styles.h1,
        variant === 'h2' && styles.h2,
        variant === 'h3' && styles.h3,
        variant === 'body' && styles.body,
        variant === 'disclaimer' && styles.disclaimer
      )}
    >
      {children}
    </TextComponent>
  );
};

export default Typography;
