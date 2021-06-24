import React, { useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import SideMenu from '@src/components/SideMenu';
import ConversationPanel from '@src/components/ConversationPanel';
import MessageForm from '@src/components/MessageForm';
import { useAuth, useChat } from '@src/hooks';
import { RouteParams } from '@src/types';
import { MOBILE_QUERY } from '@src/constants';

// @todo handle scrollable container (mobile + desktop)

const stylesFn = (): Styles => ({
  chatContainer: {
    display: 'flex'
  },
  messagePanel: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  messagePanelMobile: {
    height: 'calc(100vh - 3.125rem)' // 3.125rem === header height
  }
});

const Chat: React.FC = () => {
  const history = useHistory();
  const { conversationId } = useParams<RouteParams>();
  const { user } = useAuth();
  const { channels } = useChat();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    if (!conversationId && channels?.[0]) {
      history.push(`/channels/${channels[0]._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, channels]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div {...css(styles.chatContainer)}>
      <SideMenu />
      <div {...css(styles.messagePanel, isMobile && styles.messagePanelMobile)}>
        <ConversationPanel />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
