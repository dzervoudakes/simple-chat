import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { WithStylesProvider } from '@src/context';
import TextInput from '..';

describe('TextInput', () => {
  it('renders the placeholder text', () => {
    const { getByPlaceholderText } = render(
      <WithStylesProvider>
        <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
          {() => <TextInput name="test" placeholder="I am a placeholder" />}
        </Formik>
      </WithStylesProvider>
    );

    expect(getByPlaceholderText('I am a placeholder')).toBeInTheDocument();
  });
});
