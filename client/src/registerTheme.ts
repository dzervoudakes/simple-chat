/**
 * Register default theme for 'react-with-styles'.
 * @packageDocumentation
 */
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { defaultTheme } from './theme';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(defaultTheme);
