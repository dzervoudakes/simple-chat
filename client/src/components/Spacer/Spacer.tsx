import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Spacing, Theme } from '@src/theme';

interface SpacerProps {
  as?: 'div' | 'span';
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

const Spacer: React.FC<SpacerProps> = ({
  as = 'div',
  children,
  padding,
  px,
  py,
  pt,
  pb,
  pl,
  pr
}) => {
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

  const componentMap = {
    div: 'div',
    span: 'span'
  };

  const Component = componentMap[as];

  return <Component {...css(style)}>{children}</Component>;
};

export default Spacer;
