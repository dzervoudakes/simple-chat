import { useHistory } from 'react-router-dom';
import Layout from '@src/components/Layout';
import Typography from '@src/components/Typography';
import Spacer from '@src/components/Spacer';
import Button from '@src/components/Button';
import Card from '@src/components/Card';
import { useAuth } from '@src/hooks';

const Missing: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const path = user?.jwt ? '/channels' : '/';

  return (
    <Layout>
      <Card>
        <Typography variant="h2">You must be lost...</Typography>
        <Spacer py="medium">
          <Typography>Let&apos;s get you back home.</Typography>
        </Spacer>
        <Spacer pb="xsmall">
          <Button variant="primary" onClick={() => history.push(path)}>
            Return to {user?.jwt ? 'chat' : 'login'}
          </Button>
        </Spacer>
      </Card>
    </Layout>
  );
};

export default Missing;
