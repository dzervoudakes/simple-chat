/**
 * Default theme for 'react-with-styles'.
 * @packageDocumentation
 */
import { Theme } from '@src/types';

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
  error: '#db3820',
  blueFocus: 'rgba(0, 140, 210, 0.6)',
  grayFocus: 'rgba(90, 90, 90, 0.6)'
};

const fonts = {
  body: '"Nunito sans", sans-serif',
  header: '"Poppins", sans-serif'
};

const spacing = {
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
    thinTertiary: `0.0625rem solid ${color.tertiary}`
  },

  typography: {
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
      fontStyle: 'italic',
      fontWeight: 400,
      lineHeight: 1.2,
      WebkitFontSmoothing: 'antialiased'
    }
  }
};

export default defaultTheme;
