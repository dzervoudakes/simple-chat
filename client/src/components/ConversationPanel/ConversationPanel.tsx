import { useEffect, useRef } from 'react';

import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';

import ConversationHeader from '@src/components/ConversationHeader';
import Layout from '@src/components/Layout';
import Skeleton from '@src/components/Skeleton';
import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import { useChat } from '@src/hooks';
import { RouteParams } from '@src/types';

const stylesFn = (): Styles => ({
  conversationPanel: {
    height: 'min-content',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    wordBreak: 'break-word'
  }
});

const ConversationPanel: React.FC = () => {
  const { conversationId } = useParams<RouteParams>();
  const { messages } = useChat(conversationId);
  const layoutRef = useRef<HTMLElement>();
  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    const height = (layoutRef.current?.offsetHeight ?? 0) + 2000;
    layoutRef.current?.scrollTo(0, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <>
      <ConversationHeader />
      <Layout ref={layoutRef}>
        <div {...css(styles.conversationPanel)}>
          {!messages?.length && (
            <>
              <Spacer pb="tiny">
                <Skeleton height={16} />
              </Spacer>
              <Skeleton height={24}>
                <Typography variant="body">
                  Nothing here, yet! Send a message to get things started.
                </Typography>
              </Skeleton>
            </>
          )}
          {messages?.map((message, index) => {
            const previousMessage = messages[index - 1];
            return (
              <Spacer pb="xsmall" key={message._id}>
                {previousMessage?.username !== message.username && (
                  <Spacer pt={index !== 0 ? 'xsmall' : undefined} pb="xsmall">
                    <Typography variant="disclaimer">
                      {message.username} |{' '}
                      {format(new Date(message.createdAt), 'h:mm a EEEE')}
                    </Typography>
                  </Spacer>
                )}
                <Typography variant="body">{message.text}</Typography>
              </Spacer>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default ConversationPanel;
