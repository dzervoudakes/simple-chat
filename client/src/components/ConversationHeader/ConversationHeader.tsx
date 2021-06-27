import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Typography from '@src/components/Typography';
import Skeleton from '@src/components/Skeleton';
import { useChat } from '@src/hooks';
import { Theme } from '@src/theme';
import { RouteParams } from '@src/types';

const stylesFn = ({ border, color, spacing }: Theme): Styles => ({
  conversationHeader: {
    background: color.white,
    borderBottom: border.thinGray,
    padding: spacing.small
  }
});

const ConversationHeader: React.FC = () => {
  const { conversationId, conversationType } = useParams<RouteParams>();
  const { channels, users } = useChat();
  const [title, setTitle] = useState('');
  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    const text =
      conversationType === 'channels'
        ? `# ${channels.find((channel) => channel._id === conversationId)?.name}`
        : users.find((user) => user._id === conversationId)?.username;

    setTitle(text || '');
  }, [channels, conversationId, conversationType, users]);

  return (
    <div {...css(styles.conversationHeader)}>
      <Skeleton height={30}>
        <Typography variant="h2">{title}</Typography>
      </Skeleton>
    </div>
  );
};

export default ConversationHeader;
