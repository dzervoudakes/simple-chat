import React, { useEffect, useState } from 'react';
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
import { Theme } from '@src/theme';
import { AuthPayload } from '@src/types';

// @todo error message styling

interface LoginFormProps {
  isSignUp: boolean;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  formContainer: {
    paddingBottom: spacing.small,
    paddingTop: spacing.small
  }
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
  const [loading, setLoading] = useState(false);
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
    if (!loading) {
      try {
        setLoading(true);
        const payload = { data: values, source };
        const request = isSignUp ? UserService.createUser : AuthService.generateToken;

        const result = await request(payload);
        const { user, token } = result.data;
        const currentUser = { username: user.username, id: user._id, jwt: token };
        setUser(currentUser);
        sessionStorage.setItem('user', JSON.stringify(currentUser));

        setLoading(false);
        history.push('/channels');
      } catch (err) {
        /* istanbul ignore else */
        if (!axios.isCancel(err)) {
          setLoading(false);
          // @todo handle invalid credentials (and unit testing)

          // unique error handling for anti-duplicate constraint
          const { error: description } = err.response.data;
          if (description.includes('E11000') && description.includes('username')) {
            setFieldError('username', 'Username already exists.');
          }
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
        <Form
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <div {...css(styles.formContainer)}>
            <Spacer pb="small">
              <TextInput name="username" placeholder="NewUser123" />
              <ErrorMessage name="username" />
            </Spacer>
            <Spacer pb="small">
              <TextInput name="password" type="password" placeholder="ilovesecurity123" />
              <ErrorMessage name="password" />
            </Spacer>
            <Button onClick={() => handleSubmit()} disabled={loading}>
              {isSignUp ? 'Sign up' : 'Log in'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
