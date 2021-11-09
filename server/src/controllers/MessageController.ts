import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { ISecureRequest, JwtManager } from '@overnightjs/jwt';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { MessageDao } from '@src/daos';

@Controller('api/messages')
export class MessageController {
  private messageDao = new MessageDao();

  @Post('')
  @Middleware(JwtManager.middleware)
  private async createMessage(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const message = await this.messageDao.createMessage(req.body);
      res.status(StatusCodes.CREATED).json({ message });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getMessages(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const messages = await this.messageDao.getMessages(req.query.searchId as string);
      res.status(StatusCodes.OK).json({ messages });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default MessageController;
