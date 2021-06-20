import React from 'react';
import {
  AuthProvider,
  ChatProvider,
  SideMenuProvider,
  SocketProvider,
  WithStylesProvider
} from '@src/context';

const Providers: React.FC = ({ children }) => (
  <WithStylesProvider>
    <AuthProvider>
      <ChatProvider>
        <SocketProvider>
          <SideMenuProvider>{children}</SideMenuProvider>
        </SocketProvider>
      </ChatProvider>
    </AuthProvider>
  </WithStylesProvider>
);

export default Providers;
