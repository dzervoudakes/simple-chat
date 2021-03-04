import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { AuthProvider, WithStylesProvider } from '@src/context';
import App from './App';
import './scss/style.scss';

const Main: React.FC = () => (
  <Router basename="/">
    <WithStylesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WithStylesProvider>
  </Router>
);

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
