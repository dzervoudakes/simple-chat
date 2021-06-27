import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Typography from '@src/components/Typography';
import Spacer from '@src/components/Spacer';
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

  const isChannel = conversationType === 'channels';
  const channel = channels.find((item) => item._id === conversationId);
  const user = users.find((item) => item._id === conversationId);

  useEffect(() => {
    const text = isChannel ? `# ${channel?.name}` : user?.username;
    setTitle(text || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, conversationId, conversationType, users]);

  return (
    <div {...css(styles.conversationHeader)}>
      <Skeleton height={30}>
        <Typography variant="h2">{title}</Typography>
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
