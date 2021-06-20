import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@src/components/Layout';
import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import { useChat } from '@src/hooks';
import { RouteParams } from '@src/types';

const ConversationPanel: React.FC = () => {
  const { chatId } = useParams<RouteParams>();
  const { messages } = useChat(chatId);

  return (
    <Layout>
      {messages?.map((message, index) => {
        const previousMessage = messages[index - 1];

        return (
          <Spacer pb="xsmall" key={message._id}>
            {previousMessage?.username !== message.username && (
              <Spacer pt={index !== 0 ? 'xsmall' : undefined} pb="xsmall">
                <Typography variant="disclaimer">{message.username}</Typography>
              </Spacer>
            )}
            <Typography variant="body">{message.text}</Typography>
          </Spacer>
        );
      })}
    </Layout>
  );
};

export default ConversationPanel;
