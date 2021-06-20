import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { dynamicImport } from '..';

describe('dynamicImport', () => {
  const ImportedComponent = dynamicImport(
    () => import(/* webpackChunkName: 'test' */ '../__mocks__/MockImportedComponent')
  );

  it('Loads an external component and displays a loading indicator as a fallback', async () => {
    render(
      <WithStylesProvider>
        <ImportedComponent />
      </WithStylesProvider>
    );

    expect(screen.getByTestId('loadingIndicator')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingIndicator'));

    expect(screen.getByText('imported component')).toBeInTheDocument();
  });
});
