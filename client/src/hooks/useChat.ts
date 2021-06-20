/**
 * Hook into the current state of the chat context.
 * When retrieving messages, a 'key' must be provided matching the conversation ID.
 * Only one distinct conversation will be returned at any one time.
 *
 * @example
 * ```tsx
 * const { messages } = useChat('850d5d0e-4633-4cd7-b72d-4eb66a39751e');
 * ```
 *
 * @packageDocumentation
 */
import { useContext } from 'react';
import { ChatContext, ChatContextProps } from '@src/context';
import { Message } from '@src/types';

interface UseChat extends ChatContextProps {
  messages: Message[];
}

export const useChat = (key?: string): UseChat => {
  const context = useContext(ChatContext);

  /* istanbul ignore if */
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider.');
  }

  return {
    ...context,
    messages: key ? context.chat[key] : []
  };
};

export default useChat;
