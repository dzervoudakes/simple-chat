import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

const stylesFn = ({ spacing }: Theme): Styles => ({
  layout: {
    height: '100%',
    padding: spacing.small,
    overflowY: 'scroll',
    scrollBehavior: 'smooth'
  }
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = React.forwardRef<HTMLElement, LayoutProps>((props, ref) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <main ref={ref} {...css(styles.layout)}>
      {props.children}
    </main>
  );
});

export default Layout;
