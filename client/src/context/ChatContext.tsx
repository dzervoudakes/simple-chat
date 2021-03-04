import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';
import { ChannelService, MessageService, UserService } from '@src/services';
import { useAuth } from '@src/hooks';
import { Message } from '@src/types';

// @todo code coverage

export interface Chat {
  [key: string]: Message[];
}

export interface ChatUser {
  username: string;
  _id: string;
}

export interface ChatContextProps {
  channels: string[];
  chat: Chat;
  updateChat: (message: Message) => void;
  users: ChatUser[];
}

export const ChatContext = createContext<ChatContextProps>({
  channels: [],
  chat: {},
  updateChat: noop,
  users: []
});

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [chat, setChat] = useState({});
  const [users, setUsers] = useState([]);

  const source = axios.CancelToken.source();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (user.id && user.jwt) {
        try {
          // retrieve available channels
          const channelsResult = await ChannelService.getChannels({
            jwt: user.jwt,
            source
          });
          const { channels: channelList } = channelsResult.data;
          setChannels(channelList);

          // retrieve available users
          const usersResult = await UserService.getUsers({ jwt: user.jwt, source });
          const { users: userList } = usersResult.data;
          setUsers(userList);

          // retrieve messages and construct initial chat object
          const messagesResult = await MessageService.getMessages({
            userId: user.id,
            jwt: user.jwt,
            source
          });
          const { messages } = messagesResult.data;
          const initialChat = {};
          messages.forEach((message: Message) => {
            const { channel, recipientId, senderId } = message;

            // public channels
            if (channel) {
              if (!initialChat[channel]) {
                initialChat[channel] = [];
              }

              initialChat[channel].push(message);
            }

            // private conversations
            if (!channel && recipientId !== null) {
              if (!initialChat[recipientId] && recipientId !== user.id) {
                initialChat[recipientId] = [];
              }

              if (!initialChat[senderId] && senderId !== user.id) {
                initialChat[senderId] = [];
              }

              const conversation = initialChat[recipientId] ?? initialChat[senderId];

              if (conversation) {
                conversation.push(message);
              }
            }
          });

          setChat(initialChat);
        } catch (err) {
          // @todo error handling
        }
      }
    };

    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, user.jwt]);

  const updateChat = (message: Message): void => {
    const updatedChat = { ...chat };
    const key = message.channel ?? message.recipientId;

    if (key) {
      if (updatedChat[key]) {
        updatedChat[key] = updatedChat[key].concat([message]);
      } else {
        updatedChat[key] = [message];
      }
    }

    setChat(updatedChat);
  };

  return (
    <ChatContext.Provider value={{ channels, chat, updateChat, users }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
