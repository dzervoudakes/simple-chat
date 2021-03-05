import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

interface LoadingIndicatorProps {
  testid?: string;
}

const stylesFn = ({ color }: Theme): Styles => {
  // The styling for this component comes from https://projects.lukehaas.me/css-loaders/
  // I simply made it smaller and am using inline styles instead of scss

  const spinnerAnimationKeyframes = {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  };

  return {
    loadingIndicator: {
      border: `0.22rem solid ${color.primary}`,
      borderLeft: `0.22rem solid ${color.tealAccent}`,
      borderRadius: '50%',
      margin: '0 auto',
      fontSize: '0.625rem',
      position: 'relative',
      textIndent: '-9999rem',
      transform: 'translateZ(0)',
      height: '2rem',
      width: '2rem',
      animationName: spinnerAnimationKeyframes,
      animationDuration: '1.1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      ':after': {
        borderRadius: '50%',
        height: '2rem',
        width: '2rem'
      }
    }
  };
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ testid }) => {
  const { css, styles } = useStyles({ stylesFn });

  return <div {...css(styles.loadingIndicator)} data-testid={testid} />;
};

export default LoadingIndicator;
