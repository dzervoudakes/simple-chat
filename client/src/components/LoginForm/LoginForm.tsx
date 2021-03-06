import React, { useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Button from '@src/components/Button';
import Spacer from '@src/components/Spacer';
import TextInput from '@src/components/TextInput';
import { AuthPayload, AuthService, UserService } from '@src/services';
import { useAuth } from '@src/hooks';

// @todo styles (including error message)
// @todo handle non-unique username error from API

interface LoginFormProps {
  isSignUp: boolean;
}

const stylesFn = (): Styles => ({
  formContainer: {}
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter your username.')
    .trim('Please enter your username.')
    .min(8, 'Username must be between 8 and 30 characters.')
    .max(30, 'Username must be between 8 and 30 characters.'),
  password: Yup.string()
    .required('Please enter your password.')
    .trim('Please enter your password.')
    .min(8, 'Password must be between 8 and 30 characters.')
    .max(30, 'Password must be between 8 and 30 characters.')
});

const LoginForm: React.FC<LoginFormProps> = ({ isSignUp }) => {
  const history = useHistory();
  const { setUser } = useAuth();
  const { css, styles } = useStyles({ stylesFn });

  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (
    values: AuthPayload,
    setFieldError: (field: string, message: string) => void
  ): Promise<void> => {
    try {
      const payload = { data: values, source };
      if (isSignUp) {
        const result = await UserService.createUser(payload);
        const { user: newUser, token } = result.data;
        setUser({ username: newUser.username, id: newUser._id, jwt: token });
      } else {
        const result = await AuthService.generateToken(payload);
        const { user: existingUser, token } = result.data;
        setUser({ username: existingUser.username, id: existingUser._id, jwt: token });
      }
      // redirect successful logins an sign ups to the 'general' channel by default
      history.push('/channels/general');
    } catch (err) {
      /* istanbul ignore else */
      if (!axios.isCancel(err)) {
        // @todo error handling here (some kind of toast? and unit test)

        // unique error handling for anti-duplicate constraint
        const { error: description } = err.response.data;
        if (description.includes('E11000') && description.includes('username')) {
          setFieldError('username', 'Username already exists.');
        }
      }
    }
  };

  return (
    <Formik
      onSubmit={(values, { setFieldError }) => onSubmit(values, setFieldError)}
      validationSchema={validationSchema}
      initialValues={{ username: '', password: '' }}
    >
      {({ handleSubmit }) => (
        <Form>
          <div {...css(styles.stickyFormContainer)}>
            <Spacer pb="medium">
              <TextInput name="username" placeholder="NewUser123" />
              <ErrorMessage name="username" />
            </Spacer>
            <Spacer pb="medium">
              <TextInput name="password" placeholder="ilovesecurity123" />
              <ErrorMessage name="password" />
            </Spacer>
            <Button onClick={() => handleSubmit()}>
              {isSignUp ? 'Sign up' : 'Log in'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
