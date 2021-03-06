import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { WithStylesProvider } from '@src/context';
import { dynamicImport } from '..';

describe('dynamicImport', () => {
  const ImportedComponent = dynamicImport(
    () => import(/* webpackChunkName: 'test' */ '../__mocks__/MockImportedComponent')
  );

  it('Loads an external component and displays a loading indicator as a fallback', async () => {
    const { getByText, getByTestId } = render(
      <WithStylesProvider>
        <ImportedComponent />
      </WithStylesProvider>
    );

    expect(getByTestId('loadingIndicator')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByTestId('loadingIndicator'));

    expect(getByText('imported component')).toBeInTheDocument();
  });
});
