import React from 'react';
import Routes from '@src/routes';
import Header from './components/Header';
import Providers from './components/Providers';

const App: React.FC = () => (
  <Providers>
    <Header />
    <Routes />
  </Providers>
);

export default App;
