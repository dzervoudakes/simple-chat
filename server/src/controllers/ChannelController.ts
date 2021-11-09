import { Controller, Get, Middleware } from '@overnightjs/core';
import { ISecureRequest, JwtManager } from '@overnightjs/jwt';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { ChannelDao } from '@src/daos';

@Controller('api/channels')
export class ChannelController {
  private channelDao = new ChannelDao();

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getChannels(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const channels = await this.channelDao.getChannels();
      res.status(StatusCodes.OK).json({ channels });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default ChannelController;
