/**
 * ChatContext utility that adds a new chat message to the appropriate list.
 *
 * @remarks
 *
 * If 'message.channel', find channel ID from channels in context.
 * If 'message.recipientId', then see if userId === recipientId:
 * - If yes, the key should be senderId
 * - Else (if userId !== recipientId), the key should be recipientId
 *
 * @packageDocumentation
 */
import cloneDeep from 'lodash/cloneDeep';

import { Channel, Chat, Message } from '@src/types';

import { ChatContextProps } from '..';

interface UpdateChatProps {
  state: Omit<ChatContextProps, 'chatDispatch'>;
  message: Message;
  userId: string;
}

export const updateChat = ({ state, message, userId }: UpdateChatProps): Chat => {
  let conversationId = '';
  if (message.channel) {
    conversationId =
      state.channels?.find((channel: Channel) => channel.name === message.channel)?._id ??
      '';
  } else if (message.recipientId) {
    conversationId =
      userId === message.recipientId ? message.senderId : message.recipientId;
  }

  const updatedChat = cloneDeep(state.chat);

  if (!updatedChat[conversationId]) {
    updatedChat[conversationId] = [];
  }

  updatedChat[conversationId].push(message);
  return updatedChat;
};

export default updateChat;
