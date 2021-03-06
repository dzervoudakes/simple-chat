import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import SideMenu from '@src/components/SideMenu';
import ConversationPanel from '@src/components/ConversationPanel';
import MessageForm from '@src/components/MessageForm';
import { ChatProvider } from '@src/context';

// @todo clean up flex styling here
// @todo handle new message visibility as the list extends beyond viewport height

const stylesFn = (): Styles => ({
  conversationPanel: {
    display: 'flex'
  },
  messagePanel: {
    flexGrow: 1,
    maxHeight: 'calc(100vh - 6.5rem)', // 6rem === header height + footer height
    overflowX: 'scroll',
    position: 'relative'
  }
});

const Chat: React.FC = () => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <ChatProvider>
      <div {...css(styles.conversationPanel)}>
        <SideMenu />
        <div {...css(styles.messagePanel)}>
          <ConversationPanel />
          <MessageForm />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Chat;
