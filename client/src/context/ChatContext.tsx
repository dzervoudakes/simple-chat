import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';
import { ChannelService, MessageService, UserService } from '@src/services';
import { useAuth } from '@src/hooks';
import { Message } from '@src/types';

export interface Chat {
  [key: string]: Message[];
}

export interface ChatUser {
  username: string;
  _id: string; // the leading underscore here is a MongoDB thing
}

export interface ChatContextProps {
  channels: string[];
  chat: Chat;
  loadingError: boolean;
  updateChat: (message: Message) => void;
  users: ChatUser[];
}

export const ChatContext = createContext<ChatContextProps>({
  channels: [],
  chat: {},
  loadingError: false,
  updateChat: noop,
  users: []
});

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [chat, setChat] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  const source = axios.CancelToken.source();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (user.id && user.jwt) {
        try {
          // retrieve all available channels, messages and users
          const params = { jwt: user.jwt, source };
          const results = await Promise.all([
            ChannelService.getChannels(params),
            UserService.getUsers(params),
            MessageService.getMessages({ ...params, userId: user.id })
          ]);
          const [channelsResult, usersResult, messagesResult] = results;
          const { channels: channelList } = channelsResult.data;
          const { users: userList } = usersResult.data;

          setChannels(channelList);
          setUsers(userList);

          // construct initial chat object
          const { messages } = messagesResult.data;
          const initialChat = {};

          channelList.forEach((channel: string) => {
            initialChat[channel] = [];
          });

          messages.forEach((message: Message) => {
            const { channel, recipientId, senderId } = message;

            // public channels
            if (channel && initialChat[channel]) {
              initialChat[channel].push(message);
            }

            // private conversations
            if (recipientId !== null) {
              const key = user.id === recipientId ? senderId : recipientId;

              if (!initialChat[key]) {
                initialChat[key] = [];
              }

              initialChat[key].push(message);
            }
          });

          setChat(initialChat);
        } catch (err) {
          /* istanbul ignore else */
          if (!axios.isCancel(err)) {
            setLoadingError(true);
          }
        }
      }
    };

    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.jwt]);

  // add a new chat message to the appropriate list
  const updateChat = (message: Message): void => {
    const updatedChat = { ...chat };
    const key = message.channel ?? message.recipientId;

    if (key) {
      updatedChat[key] = updatedChat[key]?.concat([message]) ?? [message];
    }

    setChat(updatedChat);
  };

  return (
    <ChatContext.Provider value={{ channels, chat, loadingError, updateChat, users }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
