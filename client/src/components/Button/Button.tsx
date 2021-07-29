import React from 'react';
import noop from 'lodash/noop';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/theme';

type Variant = 'primary' | 'secondary' | 'link' | 'linkLight';

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  variant?: Variant;
}

const stylesFn = ({ border, color, fonts, spacing }: Theme): Styles => ({
  button: {
    borderRadius: spacing.tiny,
    cursor: 'pointer',
    fontFamily: fonts.primary,
    fontSize: '1rem',
    fontWeight: 600,
    outline: 'none',
    padding: `${spacing.xsmall} ${spacing.medium}`,
    transition: 'all 0.2s ease'
  },
  disabled: {
    cursor: 'not-allowed',
    ':focus': {
      boxShadow: 'none',
      textDecoration: 'none'
    }
  },
  primary: {
    background: color.primary,
    border: 'none',

    color: color.white,
    ':hover': {
      background: color.secondary
    },
    ':focus': {
      boxShadow: `0 0 0 0.2rem ${color.blueFocus}`
    }
  },
  secondary: {
    background: color.secondary,
    border: 'none',
    color: color.primary,
    ':hover': {
      background: color.tertiary
    },
    ':focus': {
      boxShadow: `0 0 0 0.2rem ${color.blueFocus}`
    }
  },
  link: {
    background: 'none',
    border: 'none',
    color: color.primary,
    padding: '0',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    ':hover': {
      color: color.tertiary
    },
    ':focus': {
      color: color.tertiary,
      textDecoration: 'underline'
    }
  },
  linkLight: {
    background: 'none',
    border: 'none',
    color: color.tertiary,
    padding: '0',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    ':hover': {
      color: color.blueAccent
    },
    ':focus': {
      color: color.blueAccent,
      textDecoration: 'underline'
    }
  },
  primaryDisabled: {
    background: color.grayLightest,
    color: color.white,
    ':hover': {
      background: color.grayLightest,
      color: color.white
    }
  },
  secondaryDisabled: {
    border: border.thinGray,
    color: color.grayLightest,
    ':hover': {
      background: 'none'
    }
  },
  linkDisabled: {
    color: color.grayLightest,
    ':hover': {
      color: color.grayLightest
    }
  }
});

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick = noop,
  variant = 'primary'
}) => {
  const { css, styles } = useStyles({ stylesFn });

  const handleClick = (): void => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      {...css(
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'link' && styles.link,
        variant === 'linkLight' && styles.linkLight,
        disabled && styles.disabled,
        disabled && variant === 'primary' && styles.primaryDisabled,
        disabled && variant === 'secondary' && styles.secondaryDisabled,
        disabled && variant === 'link' && styles.linkDisabled
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
