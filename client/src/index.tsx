import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Providers from '@src/components/Providers';
import App from './App';
import './scss/style.scss';

const Main: React.FC = () => (
  <Router basename="/">
    <Providers>
      <App />
    </Providers>
  </Router>
);

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
