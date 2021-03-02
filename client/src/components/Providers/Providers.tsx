import React from 'react';
import { AuthProvider, SideMenuProvider, WithStylesProvider } from '@src/context';

const Providers: React.FC = ({ children }) => (
  <WithStylesProvider>
    <AuthProvider>
      <SideMenuProvider>{children}</SideMenuProvider>
    </AuthProvider>
  </WithStylesProvider>
);

export default Providers;
