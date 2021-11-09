import { Controller, Post } from '@overnightjs/core';
import { JwtManager } from '@overnightjs/jwt';
import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';

import { UserDao } from '@src/daos';

@Controller('api/auth')
export class AuthController {
  private userDao = new UserDao();

  @Post('')
  private async generateToken(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userDao.getUser(req.body);
      if (user === null) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials.' });
      } else {
        const token = JwtManager.jwt(req.body);
        res.status(StatusCodes.OK).json({ user, token });
      }
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default AuthController;
