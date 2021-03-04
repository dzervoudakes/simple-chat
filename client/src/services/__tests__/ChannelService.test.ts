import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ChannelService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      token: 'token'
    }))
  },
  get: jest.fn(),
  post: jest.fn()
}));

describe('ChannelService', () => {
  describe('getChannels', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'get');
      const source = axios.CancelToken.source();
      const jwt = 'jwt';
      const url = `${API_BASE_URL}/channels`;
      const payload = {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      ChannelService.getChannels({ source, jwt });

      expect(spy).toHaveBeenCalledWith(url, payload);
    });
  });
});
