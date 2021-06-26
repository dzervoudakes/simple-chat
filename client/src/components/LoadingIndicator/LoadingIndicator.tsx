import React from 'react';
import './LoadingIndicator.scss';

interface LoadingIndicatorProps {
  testid?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ testid }) => (
  <div className="loader" data-testid={testid} />
);

export default LoadingIndicator;
