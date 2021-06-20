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
import { AuthService, UserService } from '@src/services';
import { useAuth } from '@src/hooks';
import { AuthPayload } from '@src/types';

// @todo styles (including error message)
// @todo handle non-unique username error from API
// @todo pressing 'Enter' doesn't submit the form

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

// @todo loading state

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
      const request = isSignUp ? UserService.createUser : AuthService.generateToken;

      const result = await request(payload);
      const { user, token } = result.data;
      const currentUser = { username: user.username, id: user._id, jwt: token };
      setUser(currentUser);
      sessionStorage.setItem('user', JSON.stringify(currentUser));

      history.push('/channels');
    } catch (err) {
      /* istanbul ignore else */
      if (!axios.isCancel(err)) {
        // @todo error handling here (and unit test)
        // @todo handle invalid credentials

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
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, { setFieldError }) => onSubmit(values, setFieldError)}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit }) => (
        <Form>
          <div {...css(styles.formContainer)}>
            <Spacer pb="medium">
              <TextInput name="username" placeholder="NewUser123" />
              <ErrorMessage name="username" />
            </Spacer>
            <Spacer pb="medium">
              <TextInput name="password" type="password" placeholder="ilovesecurity123" />
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
