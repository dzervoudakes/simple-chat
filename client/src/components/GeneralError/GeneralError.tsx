import React from 'react';
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface GeneralErrorProps {
  testid?: string;
}

const GeneralError: React.FC<GeneralErrorProps> = ({ testid }) => (
  <Typography>
    <span data-testid={testid}>Uh oh, something went wrong.</span> Please{' '}
    <Button variant="link" onClick={() => window.location.reload()}>
      refresh the page
    </Button>
    .
  </Typography>
);

export default GeneralError;
