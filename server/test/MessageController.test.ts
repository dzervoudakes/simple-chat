import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import { MessageController } from '@src/controllers';
import { TestServer } from './utils';

jest.mock('@overnightjs/core', () => ({
  ...(jest.requireActual('@overnightjs/core') as jest.Mock),
  Middleware: () => jest.fn()
}));

jest.mock('@overnightjs/jwt', () => ({
  ...(jest.requireActual('@overnightjs/jwt') as jest.Mock),
  JwtManager: { middleware: jest.fn() }
}));

const mockGetMessages = jest.fn();
const mockCreateMessage = jest.fn();

jest.mock('@src/daos/MessageDao', () => {
  return {
    MessageDao: jest.fn().mockImplementation(() => {
      return {
        getMessages: mockGetMessages,
        createMessage: mockCreateMessage
      };
    })
  };
});

describe('MessageController', () => {
  const messageController = new MessageController();
  let agent: SuperTest<Test>;

  const mockMessage = {
    username: 'Admin123',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message'
  };

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(messageController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMessages', () => {
    it('returns a list of messages', async () => {
      mockGetMessages.mockImplementation(() => [mockMessage]);
      const result = await agent.get('/api/messages');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.messages.length).toBe(1);
    });

    it('handles bad requests', async () => {
      mockGetMessages.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/messages');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('createMessage', () => {
    it('returns a new user', async () => {
      mockCreateMessage.mockImplementationOnce(() => mockMessage);
      const result = await agent.post('/api/messages');

      expect(result.status).toBe(StatusCodes.CREATED);
      expect(result.body).toEqual({ message: mockMessage });
    });

    it('handles bad requests', async () => {
      mockCreateMessage.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.post('/api/messages');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
