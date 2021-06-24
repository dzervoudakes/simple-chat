import React, { useState } from 'react';
import Card from '@src/components/Card';
import Button from '@src/components/Button';
import Layout from '@src/components/Layout';
import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import LoginForm from '@src/components/LoginForm';

const Home: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Layout>
      <Card>
        <Typography variant="h2">
          {isSignUp ? 'Sign up' : 'Log in'} to enter Simple Chat!
        </Typography>
        <LoginForm isSignUp={isSignUp} />
        {isSignUp && (
          <Spacer pb="xsmall">
            <Typography variant="disclaimer">
              Pro tip: this is a demo app with very few real-world features. Keep a record
              of your username and password, as you will not be able to change or recover
              your account later.
            </Typography>
          </Spacer>
        )}
        <Spacer pb="xsmall">
          <Typography variant="body">
            {isSignUp ? 'Already a member?' : 'New to the app?'}
          </Typography>
        </Spacer>
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Log in' : 'Sign up'}
        </Button>
      </Card>
    </Layout>
  );
};

export default Home;
