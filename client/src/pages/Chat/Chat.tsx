import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import SideMenu from '@src/components/SideMenu';
import ConversationPanel from '@src/components/ConversationPanel';
import MessageForm from '@src/components/MessageForm';

// @todo clean up flex styling here/within side menu (long paragraphs in the panel cause weird overflow things)
// @todo handle new message visibility/scrolling as the list extends beyond viewport height

interface Params {
  chatId: string;
}

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
  const { chatId } = useParams<Params>();
  const { css, styles } = useStyles({ stylesFn });

  if (!chatId) {
    // given the preconfigured channels, 'general' will always be populated
    return <Redirect to="/channels/general" />;
  }

  return (
    <div {...css(styles.conversationPanel)}>
      <SideMenu />
      <div {...css(styles.messagePanel)}>
        <ConversationPanel />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
