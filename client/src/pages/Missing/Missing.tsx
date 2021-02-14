import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '@src/components/Layout';
import Typography from '@src/components/Typography';
import Spacer from '@src/components/Spacer';
import Button from '@src/components/Button';
import Card from '@src/components/Card';

// @todo is the secondary button necessary here?

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
        {/* <Button
          variant="secondary"
          onClick={() => {
            window.location.assign('https://www.todo.com');
          }}
        >
          TODO
        </Button> */}
      </Card>
    </Layout>
  );
};

export default Missing;
