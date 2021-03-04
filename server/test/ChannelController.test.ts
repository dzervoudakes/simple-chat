import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import { ChannelController } from '@src/controllers';
import { TestServer } from './utils';

jest.mock('@overnightjs/core', () => ({
  ...(jest.requireActual('@overnightjs/core') as jest.Mock),
  Middleware: () => jest.fn()
}));

jest.mock('@overnightjs/jwt', () => ({
  ...(jest.requireActual('@overnightjs/jwt') as jest.Mock),
  JwtManager: { middleware: jest.fn() }
}));

const mockGetChannels = jest.fn();

jest.mock('@src/daos/ChannelDao', () => {
  return {
    ChannelDao: jest.fn().mockImplementation(() => {
      return {
        getChannels: mockGetChannels
      };
    })
  };
});

describe('ChannelController', () => {
  const channelController = new ChannelController();
  let agent: SuperTest<Test>;

  const mockChannel = {
    name: 'test',
    description: 'test channel'
  };

  beforeAll(async () => {
    const server = new TestServer();
    await server.setController(channelController);
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getChannels', () => {
    it('returns a list of channels', async () => {
      mockGetChannels.mockImplementation(() => [mockChannel]);
      const result = await agent.get('/api/channels');

      expect(result.status).toBe(StatusCodes.OK);
      expect(result.body.channels.length).toBe(1);
    });

    it('handles bad requests', async () => {
      mockGetChannels.mockRejectedValueOnce(() => new Error(''));
      const result = await agent.get('/api/channels');

      expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
