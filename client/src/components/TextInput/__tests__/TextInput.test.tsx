import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { WithStylesProvider } from '@src/context';
import TextInput from '..';

describe('TextInput', () => {
  it('renders the placeholder text', () => {
    render(
      <WithStylesProvider>
        <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
          {() => <TextInput name="test" placeholder="I am a placeholder" />}
        </Formik>
      </WithStylesProvider>
    );

    expect(screen.getByPlaceholderText('I am a placeholder')).toBeInTheDocument();
  });
});
