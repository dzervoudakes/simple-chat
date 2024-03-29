import StatusCodes from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';

import { AuthController } from '@src/controllers';

import { TestServer } from './utils';

jest.mock('@overnightjs/jwt', () => ({
  JwtManager: { jwt: jest.fn().mockImplementation(() => 'i am a token') }
}));

const mockGetUser = jest.fn();

jest.mock('@src/daos/UserDao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        getUser: mockGetUser
      };
    })
  };
});

describe('AuthController', () => {
  const authController = new AuthController();
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(authController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdmin', () => {
    it('returns an auth token', async () => {
      mockGetUser.mockImplementationOnce(() => ({
        username: 'TestUser1',
        password: 'passworddd'
      }));
      const result = await agent.post('/api/auth');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.token).toEqual('i am a token');
      expect(result.body.user.username).toEqual('TestUser1');
    });

    it('handles bad requests', async () => {
      mockGetUser.mockRejectedValueOnce(() => Error(''));
      const result = await agent.post('/api/auth');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('handles invalid credentials', async () => {
      mockGetUser.mockImplementationOnce(() => null);
      const result = await agent.post('/api/auth');

      expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(JSON.parse(result.text)).toEqual({ error: 'Invalid credentials.' });
    });
  });
});
