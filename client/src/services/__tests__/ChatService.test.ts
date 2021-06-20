import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { Message } from '@src/types';
import { ChatService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      token: 'token'
    }))
  },
  get: jest.fn(),
  post: jest.fn()
}));

describe('ChatService', () => {
  describe('getChat', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'get');
      const source = axios.CancelToken.source();
      const jwt = 'jwt';
      const userId = '12345';
      const url = `${API_BASE_URL}/chat?searchId=${userId}`;
      const options = {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      ChatService.getChat({ source, userId, jwt });

      expect(spy).toHaveBeenCalledWith(url, options);
    });
  });

  describe('createMessage', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'post');
      const source = axios.CancelToken.source();
      const data: Message = {
        username: 'test',
        senderId: '12345',
        recipientId: null,
        channel: 'general',
        text: 'i am a message',
        _id: '67890'
      };
      const jwt = 'jwt';
      const url = `${API_BASE_URL}/messages`;
      const options = {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      ChatService.createMessage({ source, data, jwt });

      expect(spy).toHaveBeenCalledWith(url, data, options);
    });
  });
});
