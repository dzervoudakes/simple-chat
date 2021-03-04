import { useContext } from 'react';
import { ChatContext, ChatContextProps } from '@src/context';
import { Message } from '@src/types';

// @todo update with the new pieces from the Context
// @todo fix inevitably failing unit tests

interface UseChat extends Partial<ChatContextProps> {
  messages: Message[];
}

export const useChat = (key: string): UseChat => {
  const context = useContext(ChatContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider.');
  }

  return {
    channels: context.channels,
    messages: context.chat[key] ?? [],
    updateChat: context.updateChat,
    users: context.users
  };
};

export default useChat;
