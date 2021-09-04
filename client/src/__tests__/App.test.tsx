import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the app', () => {
    render(
      <Router basename="/">
        <App />
      </Router>
    );

    expect(screen.getByText('Simple Chat', { selector: 'h1' })).toBeInTheDocument();
  });
});
