import { Response, Request } from 'express';
import StatusCodes from 'http-status-codes';
import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { ISecureRequest, JwtManager } from '@overnightjs/jwt';
import { UserDao } from '@src/daos';

@Controller('api/users')
export class UserController {
  private userDao = new UserDao();

  @Post('')
  private async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userDao.createUser(req.body);
      const token = JwtManager.jwt(req.body);
      res.status(StatusCodes.CREATED).json({ user, token });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }

  @Get('')
  @Middleware(JwtManager.middleware)
  private async getUsers(req: ISecureRequest, res: Response): Promise<void> {
    try {
      const users = await this.userDao.getUsers();
      res.status(StatusCodes.OK).json({ users });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
}

export default UserController;
