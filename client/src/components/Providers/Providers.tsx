import React from 'react';
import {
  AuthProvider,
  ChatProvider,
  SideMenuProvider,
  WithStylesProvider
} from '@src/context';

const Providers: React.FC = ({ children }) => (
  <WithStylesProvider>
    <AuthProvider>
      <ChatProvider>
        <SideMenuProvider>{children}</SideMenuProvider>
      </ChatProvider>
    </AuthProvider>
  </WithStylesProvider>
);

export default Providers;
