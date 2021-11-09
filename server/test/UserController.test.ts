import StatusCodes from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';

import { UserController } from '@src/controllers';

import { TestServer } from './utils';

jest.mock('@overnightjs/core', () => ({
  ...(jest.requireActual('@overnightjs/core') as jest.Mock),
  Middleware: () => jest.fn()
}));

jest.mock('@overnightjs/jwt', () => ({
  ...(jest.requireActual('@overnightjs/jwt') as jest.Mock),
  JwtManager: {
    middleware: jest.fn(),
    jwt: jest.fn().mockImplementation(() => 'i am a token')
  }
}));

const mockGetUsers = jest.fn();
const mockCreateUser = jest.fn();

jest.mock('@src/daos/UserDao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        getUsers: mockGetUsers,
        createUser: mockCreateUser
      };
    })
  };
});

describe('UserController', () => {
  const userController = new UserController();
  let agent: SuperTest<Test>;

  const mockUser = {
    username: 'Admin123',
    password: 'passworddd'
  };

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(userController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns a list of users', async () => {
      mockGetUsers.mockImplementationOnce(() => [mockUser]);
      const result = await agent.get('/api/users');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.users.length).toBe(1);
    });

    it('handles bad requests', async () => {
      mockGetUsers.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/users');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('createUser', () => {
    it('returns a new user', async () => {
      mockCreateUser.mockImplementationOnce(() => mockUser);
      const result = await agent.post('/api/users');

      expect(result.status).toBe(StatusCodes.CREATED);
      expect(result.body).toEqual({ user: mockUser, token: 'i am a token' });
    });

    it('handles bad requests', async () => {
      mockCreateUser.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.post('/api/users');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
