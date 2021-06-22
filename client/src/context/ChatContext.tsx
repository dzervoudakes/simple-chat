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
import React, { createContext, useEffect, useReducer, Reducer, Dispatch } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';
import { ChatService } from '@src/services';
import { useAuth } from '@src/hooks';
import { Chat, Channel, ChatUser, Message } from '@src/types';
import { updateChat } from './utils';

type ActionType = 'API_LOADING' | 'API_SUCCESS' | 'API_FAILURE' | 'UPDATE_CHAT';

interface Action {
  type: ActionType;
  payload?: Partial<ChatContextProps> | Message;
}

export interface ChatContextProps {
  channels: Channel[];
  chat: Chat;
  chatDispatch: Dispatch<Action>;
  error: boolean;
  loading: boolean;
  users: ChatUser[];
}

type ChatState = Omit<ChatContextProps, 'chatDispatch'>;

const initialState = {
  channels: [],
  chat: {},
  error: false,
  loading: false,
  users: []
};

export const ChatContext = createContext<ChatContextProps>({
  ...initialState,
  chatDispatch: noop
});

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const source = axios.CancelToken.source();

  const chatReducer = (state: ChatState, action: Action): ChatState => {
    switch (action.type) {
      case 'API_LOADING':
        return { ...state, loading: true };
      case 'API_SUCCESS':
        return { ...state, ...action.payload, loading: false, error: false };
      case 'API_FAILURE':
        return { ...state, loading: false, error: true };
      case 'UPDATE_CHAT':
        return {
          ...state,
          chat: updateChat({
            state,
            message: action.payload as Message,
            userId: user?.id ?? ''
          })
        };
      default:
        return state;
    }
  };

  const [chatState, chatDispatch] = useReducer<Reducer<ChatState, Action>>(
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

  return (
    <ChatContext.Provider value={{ ...chatState, chatDispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
