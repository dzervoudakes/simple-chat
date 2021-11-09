import axios from 'axios';

import { API_BASE_URL } from '@src/constants';

import { AuthService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      token: 'token'
    }))
  },
  post: jest.fn()
}));

describe('AuthService', () => {
  describe('generateToken', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'post');
      const source = axios.CancelToken.source();
      const data = {
        username: 'test',
        password: 'passworddd'
      };
      const url = `${API_BASE_URL}/auth`;
      const options = {
        cancelToken: source.token
      };

      AuthService.generateToken({ source, data });

      expect(spy).toHaveBeenCalledWith(url, data, options);
    });
  });
});
