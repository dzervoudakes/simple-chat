import React, { createContext, useState } from 'react';
import noop from 'lodash/noop';
import { Message } from '@src/types';

export interface Chat {
  [key: string]: Message[];
}

export interface ChatContextProps {
  chat: Chat;
  updateChat: (message: Message) => void;
}

export const ChatContext = createContext<ChatContextProps>({
  chat: {},
  updateChat: noop
});

export const ChatProvider: React.FC = ({ children }) => {
  const [chat, setChat] = useState({});

  const updateChat = (message: Message): void => {
    const updatedChat = { ...chat };
    const key = message.channel ?? message.recipient;

    if (updatedChat[key]) {
      updatedChat[key] = updatedChat[key].concat([message]);
    } else {
      updatedChat[key] = [message];
    }

    setChat(updatedChat);
  };

  return (
    <ChatContext.Provider value={{ chat, updateChat }}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
