import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import noop from 'lodash/noop';
import { WithStylesProvider } from '@src/context';
import TextInput from '..';

describe('TextInput', () => {
  it('renders the placeholder text', () => {
    const { getByPlaceholderText } = render(
      <WithStylesProvider>
        <Formik initialValues={{ test: '' }} onSubmit={noop}>
          {() => <TextInput name="test" placeholder="I am a placeholder" />}
        </Formik>
      </WithStylesProvider>
    );

    expect(getByPlaceholderText('I am a placeholder')).toBeInTheDocument();
  });
});
