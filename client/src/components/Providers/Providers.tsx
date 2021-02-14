import React from 'react';
import { UserProvider, SideMenuProvider, WithStylesProvider } from '@src/context';

const Providers: React.FC = ({ children }) => (
  <WithStylesProvider>
    <UserProvider>
      <SideMenuProvider>{children}</SideMenuProvider>
    </UserProvider>
  </WithStylesProvider>
);

export default Providers;
