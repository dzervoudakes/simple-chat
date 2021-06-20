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
import React, { createContext, useEffect, useReducer, Reducer } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';
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
  error: boolean;
  loading: boolean;
  updateChat: (message: Message) => void;
  users: ChatUser[];
}

type ActionType = 'API_LOADING' | 'API_SUCCESS' | 'API_FAILURE' | 'UPDATE_CHAT';

interface Action {
  type: ActionType;
  payload?: Partial<ChatContextProps>;
}

const initialState = {
  channels: [],
  chat: {},
  error: false,
  loading: false,
  users: []
};

export const ChatContext = createContext<ChatContextProps>({
  ...initialState,
  updateChat: noop
});

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const source = axios.CancelToken.source();

  // @todo state still resets after receiving messages >:(
  // @todo remove 'any' types on chatReducer

  const chatReducer = (
    state: Partial<ChatContextProps>,
    action: Action
  ): Partial<ChatContextProps> => {
    switch (action.type) {
      case 'API_LOADING':
        return { ...state, loading: true };
      case 'API_SUCCESS':
        return { ...state, ...action.payload, loading: false, error: false };
      case 'API_FAILURE':
        return { ...state, loading: false, error: true };
      case 'UPDATE_CHAT':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [chatState, chatDispatch] = useReducer<Reducer<any, Action>>(
    chatReducer,
    initialState
  );

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (user) {
        try {
          chatDispatch({ type: 'API_LOADING' });

          // retrieve all available channels, messages and users
          const result = await ChatService.getChat({
            jwt: user.jwt,
            userId: user.id,
            source
          });

          chatDispatch({ type: 'API_SUCCESS', payload: result.data });
        } catch (err) {
          /* istanbul ignore else */
          if (!axios.isCancel(err)) {
            chatDispatch({ type: 'API_FAILURE' });
          }
        }
      }
    };

    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Add a new chat message to the appropriate list.
   * If 'message.channel', find channel ID from channels in context.
   * If 'message.recipientId', then see if userId === recipientId:
   * -- If yes, the key should be senderId
   * -- Else (if userId !== recipientId), the key should be recipientId
   */
  const updateChat = (message: Message): void => {
    let conversationId = '';
    if (message.channel) {
      conversationId =
        chatState.channels.find((channel: Channel) => channel.name === message.channel)
          ?._id ?? '';
    } else if (message.recipientId) {
      conversationId =
        user?.id === message.recipientId ? message.senderId : message.recipientId;
    }

    const updatedChat = { ...chatState.chat };

    if (!updatedChat[conversationId]) {
      updatedChat[conversationId] = [];
    }

    updatedChat[conversationId].push(message);
    const payload = { chat: updatedChat };
    chatDispatch({ type: 'UPDATE_CHAT', payload });
  };

  return (
    <ChatContext.Provider value={{ ...chatState, updateChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
