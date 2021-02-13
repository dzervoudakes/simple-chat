import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import noop from 'lodash/noop';
import TextInput from '..';

describe('TextInput', () => {
  it('renders the placeholder text', () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ test: '' }} onSubmit={noop}>
        {() => <TextInput name="test" placeholder="I am a placeholder" />}
      </Formik>
    );

    expect(getByPlaceholderText('I am a placeholder')).toBeInTheDocument();
  });
});
