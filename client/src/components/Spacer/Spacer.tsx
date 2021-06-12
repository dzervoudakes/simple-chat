import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Spacing, Theme } from '@src/theme';

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

  const spacingdef = spacing?._definition;

  const style = {
    paddingRight: spacingdef?.[padding || px || pr || ''] || undefined,
    paddingLeft: spacingdef?.[padding || px || pl || ''] || undefined,
    paddingTop: spacingdef?.[padding || py || pt || ''] || undefined,
    paddingBottom: spacingdef?.[padding || py || pb || ''] || undefined
  };

  return <div {...css(style)}>{children}</div>;
};

export default Spacer;
