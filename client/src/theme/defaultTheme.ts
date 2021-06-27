/**
 * Default theme for 'react-with-styles'.
 * @packageDocumentation
 */

export type Spacing =
  | 'nudge'
  | 'tiny'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export interface Theme {
  color: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<Spacing, string>;
  border: Record<string, string>;
  typography: Record<string, Record<string, string | number>>;
}

const color = {
  primary: '#119da4',
  secondary: '#063347',
  tertiary: '#fec601',
  tealAccent: '#c2e4f3',
  black: '#000',
  white: '#fff',
  grayDark: '#303030',
  gray: '#5a5a5a',
  grayLight: '#989898',
  grayLightest: '#e1e1e1',
  error: '#dc143c',
  blueFocus: 'rgba(0, 140, 210, 0.6)',
  grayFocus: 'rgba(90, 90, 90, 0.6)'
};

const fonts = {
  body: '"Nunito sans", sans-serif',
  header: '"Poppins", sans-serif'
};

const spacing = {
  nudge: '0.125rem',
  tiny: '0.25rem',
  xsmall: '0.5rem',
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
  xlarge: '2.5rem'
};

export const defaultTheme: Theme = {
  color,
  fonts,
  spacing,

  border: {
    error: `0.0625rem solid ${color.error}`,
    thinGray: `0.0625rem solid ${color.grayLightest}`,
    thinSecondary: `0.0625rem solid ${color.secondary}`,
    thinTertiary: `0.0625rem solid ${color.tertiary}`
  },

  typography: {
    h1: {
      color: color.grayDark,
      fontFamily: fonts.header,
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.25,
      WebkitFontSmoothing: 'antialiased'
    },
    h2: {
      color: color.grayDark,
      fontFamily: fonts.header,
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.25,
      WebkitFontSmoothing: 'antialiased'
    },
    h3: {
      color: color.grayLightest,
      fontFamily: fonts.header,
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.25,
      WebkitFontSmoothing: 'antialiased'
    },
    body: {
      color: color.gray,
      fontFamily: fonts.body,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.25,
      WebkitFontSmoothing: 'antialiased'
    },
    disclaimer: {
      color: color.grayLight,
      fontFamily: fonts.body,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.2,
      WebkitFontSmoothing: 'antialiased'
    },
    error: {
      color: color.error,
      fontFamily: fonts.body,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.25,
      WebkitFontSmoothing: 'antialiased'
    }
  }
};

export default defaultTheme;
