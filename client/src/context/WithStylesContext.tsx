/**
 * Theme provider for react-with-styles.
 * @packageDocumentation
 */
import React from 'react';
import WithStylesContext from 'react-with-styles/lib/WithStylesContext';
import AphroditeInterface from 'react-with-styles-interface-aphrodite';
import { defaultTheme } from '@src/theme';

export const WithStylesProvider: React.FC = ({ children }) => (
  <WithStylesContext.Provider
    value={{ stylesInterface: AphroditeInterface, stylesTheme: defaultTheme }}
  >
    {children}
  </WithStylesContext.Provider>
);

export default WithStylesProvider;
