import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'disclaimer' | 'error';
}

const stylesFn = ({ typography }: Theme): Styles => ({ ...typography });

const Typography: React.FC<TypographyProps> = ({ children, variant = 'body' }) => {
  const { css, styles } = useStyles({ stylesFn });

  const componentMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    disclaimer: 'p',
    error: 'p'
  };

  const TextComponent = componentMap[variant];

  return <TextComponent {...css(styles[variant])}>{children}</TextComponent>;
};

export default Typography;
