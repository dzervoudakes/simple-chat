import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the app', () => {
    const { getByText } = render(
      <Router basename="/">
        <App />
      </Router>
    );

    expect(getByText('Simple Chat', { selector: 'h1' })).toBeInTheDocument();
  });
});
