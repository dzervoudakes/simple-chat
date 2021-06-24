import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

const stylesFn = ({ spacing }: Theme): Styles => ({
  layout: {
    height: '100%',
    padding: spacing.small,
    positon: 'relative'
  }
});

const Layout: React.FC = ({ children }) => {
  const { css, styles } = useStyles({ stylesFn });

  return <main {...css(styles.layout)}>{children}</main>;
};

export default Layout;
