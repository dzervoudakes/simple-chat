import { useContext } from 'react';
import { ChatContext, ChatContextProps } from '@src/context';
import { Message } from '@src/types';

interface UseChat extends Partial<ChatContextProps> {
  messages: Message[];
}

export const useChat = (key?: string): UseChat => {
  const context = useContext(ChatContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider.');
  }

  return {
    channels: context.channels,
    dataLoading: context.dataLoading,
    loadingError: context.loadingError,
    messages: key ? context.chat[key] : [],
    updateChat: context.updateChat,
    users: context.users
  };
};

export default useChat;
