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
// import { Theme } from '@src/theme';

// @todo styles
// @todo handle non-unique username error from API

interface LoginFormProps {
  isSignUp: boolean;
}

const stylesFn = (): Styles => ({
  formContainer: {}
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter your username')
    .trim('Please enter your username')
    .min(8, 'Username must be between 8 and 30 characters')
    .max(30, 'Username must be between 8 and 30 characters'),
  password: Yup.string()
    .required('Please enter your password')
    .trim('Please enter your password')
    .min(8, 'Password must be between 8 and 30 characters')
    .max(30, 'Password must be between 8 and 30 characters')
});

const LoginForm: React.FC<LoginFormProps> = ({ isSignUp }) => {
  const history = useHistory();
  const { user, setUser } = useAuth();
  const { css, styles } = useStyles({ stylesFn });

  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: AuthPayload): Promise<void> => {
    try {
      if (isSignUp) {
        const result = await UserService.createUser({ data: values, source });
        const { user: newUser, token } = result.data;
        setUser({ username: newUser.username, id: newUser._id, jwt: token });
      } else {
        const result = await AuthService.generateToken({
          data: values,
          jwt: user.jwt ?? '',
          source
        });
        const { user: existingUser, token } = result.data;
        setUser({ username: existingUser.username, id: existingUser._id, jwt: token });
      }
      history.push('/channels');
    } catch (err) {
      /* istanbul ignore else */
      if (!axios.isCancel(err)) {
        // @todo error handling here
      }
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
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
              <TextInput name="password" placeholder="NewUser123" />
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
