/**
 * Context that drives the core functionality of Simple Chat. This context groups lists of messages for direct and public chats,
 * updates conversations, and keeps a record of available users and channels.
 *
 * @remarks
 *
 * Note: For demo purposes only, and given the small initial size of messages and channels, everything is loaded up front by design.
 * The ability to lazy load discussions should be feasible with the current data model should I decide to scope creep myself into it later.
 *
 * @packageDocumentation
 */
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';
import { ChannelService, MessageService, UserService } from '@src/services';
import { useAuth } from '@src/hooks';

export interface Chat {
  [key: string]: Message[];
}

export interface Channel {
  name: string;
  _id: string;
}

export interface ChatUser {
  username: string;
  _id: string;
}

// if a message is sent to a public channel, the channel property will be populated and recipientId will be null
// if a message is private between two users, the recipientId will be populated and the channel will be null
export interface Message {
  username: string;
  senderId: string;
  recipientId: string | null;
  channel: string | null;
  text: string;
  _id: string;
}

export interface ChatContextProps {
  channels: Channel[];
  chat: Chat;
  dataLoading: boolean;
  loadingError: boolean;
  updateChat: (message: Omit<Message, '_id'>) => void;
  users: ChatUser[];
}

export const ChatContext = createContext<ChatContextProps>({
  channels: [],
  chat: {},
  dataLoading: false,
  loadingError: false,
  updateChat: noop,
  users: []
});

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [channelLookup, setChannelLookup] = useState({});
  const [chat, setChat] = useState({});
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const source = axios.CancelToken.source();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (user.id && user.jwt) {
        try {
          setDataLoading(true);

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
          const lookup = {};

          channelList.forEach((channel: Channel) => {
            lookup[channel.name] = channel._id;
            initialChat[channel._id] = [];
          });

          messages.forEach((message: Message) => {
            const { channel, recipientId, senderId } = message;

            // public channels
            if (channel) {
              const channelId = lookup[channel];
              initialChat[channelId].push(message);
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

          setChannelLookup(lookup);
          setChat(initialChat);
          setDataLoading(false);
        } catch (err) {
          /* istanbul ignore else */
          if (!axios.isCancel(err)) {
            setLoadingError(true);
            setDataLoading(false);
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
  const updateChat = (message: Omit<Message, '_id'>): void => {
    const updatedChat = { ...chat };
    const key = message.channel ? channelLookup[message.channel] : message.recipientId;

    if (key) {
      // @todo I think this is broken...
      updatedChat[key] = updatedChat[key]?.concat([message]) ?? [message];
    }

    setChat(updatedChat);
  };

  return (
    <ChatContext.Provider
      value={{ channels, chat, dataLoading, loadingError, updateChat, users }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
