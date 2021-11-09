import { useEffect, useState } from 'react';

import axios from 'axios';
import { Formik, Form, ErrorMessage } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import * as Yup from 'yup';

import Button from '@src/components/Button';
import Spacer from '@src/components/Spacer';
import TextInput from '@src/components/TextInput';
import { useAuth } from '@src/hooks';
import { AuthService, UserService } from '@src/services';
import { Theme } from '@src/theme';
import { AuthPayload } from '@src/types';

import Typography from '../Typography';

interface LoginFormProps {
  isSignUp: boolean;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  formContainer: {
    margin: '0 auto',
    maxWidth: '21.25rem', // 340px
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
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const { setUser } = useAuth();
  const { css, styles } = useStyles({ stylesFn });

  const source = axios.CancelToken.source();
  const previousUser = sessionStorage.getItem('user');

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (previousUser) {
    return <Redirect to="/channels" />;
  }

  const onSubmit = async (
    values: AuthPayload,
    setFieldError: (field: string, message: string) => void
  ): Promise<void> => {
    if (!loading) {
      try {
        setLoading(true);
        setError(null);
        const payload = { data: values, source };
        const request = isSignUp ? UserService.createUser : AuthService.generateToken;

        const result = await request(payload);
        const { user, token } = result.data;
        const currentUser = { username: user.username, id: user._id, jwt: token };
        setUser(currentUser);
        sessionStorage.setItem('user', JSON.stringify(currentUser));

        if (isSignUp) {
          sessionStorage.setItem('new-user', 'true');
        }

        setLoading(false);
        history.push('/channels');
      } catch (err) {
        /* istanbul ignore else */
        if (!axios.isCancel(err)) {
          setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error: message } = (err as any).response.data;

          // unique error handling for anti-duplicate constraint
          if (message.includes('E11000') && message.includes('username')) {
            setFieldError('username', 'Username already exists.');
          } else {
            setError(message);
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
              <ErrorMessage name="username">
                {(message) => (
                  <Spacer pt="tiny">
                    <Typography variant="error">{message}</Typography>
                  </Spacer>
                )}
              </ErrorMessage>
            </Spacer>
            <Spacer pb="small">
              <TextInput name="password" type="password" placeholder="ilovesecurity123" />
              <ErrorMessage name="password">
                {(message) => (
                  <Spacer pt="tiny">
                    <Typography variant="error">{message}</Typography>
                  </Spacer>
                )}
              </ErrorMessage>
              {error && (
                <Spacer pt="tiny">
                  <Typography variant="error">{error}</Typography>
                </Spacer>
              )}
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
