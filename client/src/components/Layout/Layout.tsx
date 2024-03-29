import { forwardRef } from 'react';

import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';

import { Theme } from '@src/theme';
import { RefElement } from '@src/types';

interface LayoutProps {
  children: React.ReactNode;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  layout: {
    height: '100%',
    padding: spacing.small,
    overflowY: 'scroll',
    scrollBehavior: 'smooth'
  }
});

const Layout = forwardRef<RefElement, LayoutProps>((props, ref) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <main ref={ref} {...css(styles.layout)}>
      {props.children}
    </main>
  );
});

export default Layout;
