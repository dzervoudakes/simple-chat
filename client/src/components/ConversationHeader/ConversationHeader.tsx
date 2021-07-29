import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Typography from '@src/components/Typography';
import Spacer from '@src/components/Spacer';
import Skeleton from '@src/components/Skeleton';
import { useChat, useSocket } from '@src/hooks';
import { Theme } from '@src/theme';
import { RouteParams } from '@src/types';

const stylesFn = ({ border, color, spacing }: Theme): Styles => ({
  conversationHeader: {
    background: color.white,
    borderBottom: border.thinGray,
    padding: spacing.small
  },
  flexContainer: {
    display: 'flex'
  },
  onlineIndicator: {
    alignSelf: 'center',
    border: `0.0625rem solid ${color.grayLightest}`,
    borderRadius: '50%',
    height: '0.75rem',
    marginRight: spacing.xsmall,
    width: '0.75rem'
  },
  active: {
    backgroundColor: color.green
  }
});

const ConversationHeader: React.FC = () => {
  const { conversationId, conversationType } = useParams<RouteParams>();
  const { channels, users } = useChat();
  const { activeSockets } = useSocket();
  const [title, setTitle] = useState('');
  const [online, setOnline] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  const isChannel = conversationType === 'channels';
  const channel = channels.find((item) => item._id === conversationId);
  const user = users.find((item) => item._id === conversationId);

  useEffect(() => {
    const isOnline =
      activeSockets?.some(({ userId }) => userId === conversationId) || false;
    setOnline(isOnline);
  }, [activeSockets, conversationId]);

  useEffect(() => {
    const text = isChannel ? `# ${channel?.name}` : user?.username;
    setTitle(text || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, conversationId, conversationType, users]);

  return (
    <div {...css(styles.conversationHeader)} role="contentinfo">
      <Skeleton height={30}>
        <div {...css(styles.flexContainer)}>
          {!isChannel && (
            <span {...css(styles.onlineIndicator, online && styles.active)} />
          )}
          <Typography variant="h2">{title}</Typography>
        </div>
        {isChannel && (
          <Spacer pt="tiny">
            <Typography variant="disclaimer">{channel?.description}</Typography>
          </Spacer>
        )}
      </Skeleton>
    </div>
  );
};

export default ConversationHeader;
