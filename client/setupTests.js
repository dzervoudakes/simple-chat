/**
 * Imports and configures polyfills for Jest, and also suppresses css-in-js.
 * @packageDocumentation
 */
import { StyleSheetTestUtils } from 'aphrodite';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

Object.defineProperty(window, 'location', {
  configurable: true,
  value: { assign: jest.fn(), reload: jest.fn() }
});
