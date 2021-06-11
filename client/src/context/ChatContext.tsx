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
import clone from 'lodash/clone';
import { ChatService } from '@src/services';
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

/**
 * if a message is sent to a public channel, the channel property will be populated and recipientId will be null
 * if a message is private between two users, the recipientId will be populated and the channel will be null
 */
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
  const [channels, setChannels] = useState<Channel[]>([]);
  const [chat, setChat] = useState({});
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const source = axios.CancelToken.source();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (user.id && user.jwt) {
        try {
          setDataLoading(true);

          // retrieve all available channels, messages and users
          const result = await ChatService.getChat({
            jwt: user.jwt,
            userId: user.id,
            source
          });
          const {
            chat: initialChat,
            channels: channelList,
            users: userList
          } = result.data;

          // @todo useReducer here???
          setChat(initialChat);
          setChannels(channelList);
          setUsers(userList);
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

  /**
   * Add a new chat message to the appropriate list.
   * If 'message.channel', find channel ID from channels in context.
   * If 'message.recipientId', then see if userId === recipientId:
   * -- If yes, the key should be senderId
   * -- Else (if userId !== recipientId), the key should be recipientId
   */
  const updateChat = (message: Omit<Message, '_id'>): void => {
    let chatId = '';
    if (message.channel) {
      chatId = channels.find((channel) => channel.name === message.channel)?._id ?? '';
    } else if (message.recipientId) {
      chatId = user.id === message.recipientId ? message.senderId : message.recipientId;
    }

    const conversation = clone(chat[chatId]);
    conversation.push(message);
    setChat({ ...chat, [chatId]: conversation });

    // @todo sent message is resetting chat to '{}' in the recipient's tab >:(
    // @todo should this method be split into two? one for public; one for private
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
