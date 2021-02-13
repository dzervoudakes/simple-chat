/**
 * Register default theme for 'react-with-styles'.
 * @packageDocumentation
 */
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { defaultTheme } from './theme';

// @todo migrate to 'WithStylesContext' provider; 'ThemedStyleSheet' will be deprecated in the next major release
// @todo when migrating, revisit 'setupTests.js' import

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(defaultTheme);