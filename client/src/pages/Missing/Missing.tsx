import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '@src/components/Layout';
import Typography from '@src/components/Typography';
import Spacer from '@src/components/Spacer';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

// @todo redirect to first channel if the user is logged in
// @todo redirect to Home if the user is not logged in
// @todo update copy

const Missing: React.FC = () => {
  const history = useHistory();

  return (
    <Layout>
      <Card>
        <Typography variant="h2">You must be lost...</Typography>
        <Spacer py="medium">
          <Typography>Let&apos;s get you back home.</Typography>
        </Spacer>
        <Spacer pb="xsmall">
          <Button variant="primary" onClick={() => history.push('/')}>
            Return to User Selection
          </Button>
        </Spacer>
      </Card>
    </Layout>
  );
};

export default Missing;
