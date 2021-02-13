import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Spacing, Theme } from '@src/types';

interface SpacerProps {
  padding?: Spacing;
  px?: Spacing;
  py?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  spacing
});

const Spacer: React.FC<SpacerProps> = ({ children, padding, px, py, pt, pb, pl, pr }) => {
  const {
    css,
    styles: { spacing }
  } = useStyles({ stylesFn });

  const style = {
    paddingRight: spacing?.[padding || px || pr || ''] || undefined,
    paddingLeft: spacing?.[padding || px || pl || ''] || undefined,
    paddingTop: spacing?.[padding || py || pt || ''] || undefined,
    paddingBottom: spacing?.[padding || py || pb || ''] || undefined
  };

  return <div {...css(style)}>{children}</div>;
};

export default Spacer;
