/**
 * This controller acts as an orchestration layer which returns a single response including multiple resources.
 * @packageDocumentation
 */
import { Controller, Get, Middleware } from '@overnightjs/core';
import { ISecureRequest, JwtManager } from '@overnightjs/jwt';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { ChannelDao, MessageDao, UserDao } from '@src/daos';
import { ChannelType, MessageType } from '@src/models';

interface ChannelTypeWithId extends ChannelType {
  _id: string;
}

@Controller('api/chat')
export class ChatOrchestrationController {
  private channelDao = new ChannelDao();

  private messageDao = new MessageDao();

  private userDao = new UserDao();

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getChat(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const results = await Promise.all([
        this.channelDao.getChannels(),
        this.messageDao.getMessages(req.query.searchId as string),
        this.userDao.getUsers()
      ]);
      const [channels, messages, users] = results;

      /**
       * Construct initial chat object to be sent to the client, where _id is that of the channel or a user (DM):
       * {
       *   [_id]: Message[]
       * }
       */
      const chat = {};
      const lookup = {};

      (channels as ChannelTypeWithId[]).forEach((channel: ChannelTypeWithId) => {
        lookup[channel.name] = channel._id;
        chat[channel._id] = [];
      });

      messages.forEach((message: MessageType) => {
        const { channel, recipientId, senderId } = message;

        // public channels
        if (channel) {
          const channelId = lookup[channel];
          chat[channelId].push(message);
        }

        // private conversations
        if (recipientId !== null) {
          const key = req.query.searchId === recipientId ? senderId : recipientId;
          if (!chat[key]) {
            chat[key] = [];
          }
          chat[key].push(message);
        }
      });

      res.status(StatusCodes.OK).json({ channels, chat, users });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default ChatOrchestrationController;
