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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import noop from 'lodash/noop';
import clone from 'lodash/clone';
import { ChatService } from '@src/services';
import { useAuth } from '@src/hooks';

interface Params {
  chatId: string;
}

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
  const { chatId } = useParams<Params>();
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
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

  // @todo this would only work for the sender, and not the recipient
  // @todo updateChat needs to know which key to append a message to
  // @todo useParams won't work here with ChatProvider wrapping the Routes switch

  // add a new chat message to the appropriate list
  const updateChat = (message: Omit<Message, '_id'>): void => {
    const conversation = clone(chat[chatId]);
    conversation.push(message);
    setChat({ ...chat, [chatId]: conversation });
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
