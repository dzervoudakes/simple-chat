import StatusCodes from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';

import { ChatOrchestrationController } from '@src/controllers';

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

const mockGetChannels = jest.fn();
const mockGetMessages = jest.fn();
const mockGetUsers = jest.fn();

jest.mock('@src/daos/ChannelDao', () => {
  return {
    ChannelDao: jest.fn().mockImplementation(() => {
      return {
        getChannels: mockGetChannels
      };
    })
  };
});

jest.mock('@src/daos/MessageDao', () => {
  return {
    MessageDao: jest.fn().mockImplementation(() => {
      return {
        getMessages: mockGetMessages
      };
    })
  };
});

jest.mock('@src/daos/UserDao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        getUsers: mockGetUsers
      };
    })
  };
});

describe('ChatOrchestrationController', () => {
  const chatOrchestrationController = new ChatOrchestrationController();
  let agent: SuperTest<Test>;

  const mockUser = {
    username: 'Admin123',
    password: 'passworddd'
  };

  const mockChannel = {
    name: 'general',
    description: 'test channel',
    _id: '12345'
  };

  const mockMessages = [
    {
      username: 'Admin123',
      senderId: '12345',
      recipientId: null,
      channel: 'general',
      text: 'i am a message'
    },
    {
      username: 'Admin123',
      senderId: '12345',
      recipientId: '67890',
      channel: null,
      text: 'i am a second message'
    },
    {
      username: 'Admin123',
      senderId: '12345',
      recipientId: '67890',
      channel: null,
      text: 'i am a third message'
    }
  ];

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(chatOrchestrationController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getChat', () => {
    it('returns the full chat experience including channels, messages and users', async () => {
      mockGetChannels.mockImplementation(() => [mockChannel]);
      mockGetMessages.mockImplementation(() => mockMessages);
      mockGetUsers.mockImplementation(() => [mockUser]);
      const result = await agent.get('/api/chat');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.channels.length).toBe(1);
      expect(result.body.users.length).toBe(1);
      expect(result.body.chat['12345']).toHaveLength(1);
      expect(result.body.chat['67890']).toHaveLength(2);
    });

    it('handles bad requests', async () => {
      mockGetMessages.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/chat');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
