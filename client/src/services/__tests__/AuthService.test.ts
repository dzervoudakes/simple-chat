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
      const jwt = 'jwt';
      const url = `${API_BASE_URL}/auth`;
      const payload = {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        data
      };

      AuthService.generateToken({ source, data, jwt });

      expect(spy).toHaveBeenCalledWith(url, payload);
    });
  });
});
