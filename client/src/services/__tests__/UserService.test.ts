import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { UserService } from '..';

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      token: 'token'
    }))
  },
  get: jest.fn(),
  post: jest.fn()
}));

describe('UserService', () => {
  describe('createUser', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'post');
      const source = axios.CancelToken.source();
      const data = {
        username: 'test',
        password: 'passworddd'
      };
      const url = `${API_BASE_URL}/users`;
      const payload = {
        cancelToken: source.token,
        data
      };

      UserService.createUser({ source, data });

      expect(spy).toHaveBeenCalledWith(url, payload);
    });
  });

  describe('getUsers', () => {
    it('calls the API with the correct parameters', () => {
      const spy = jest.spyOn(axios, 'get');
      const source = axios.CancelToken.source();
      const jwt = 'jwt';
      const url = `${API_BASE_URL}/users`;
      const payload = {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      UserService.getUsers({ source, jwt });

      expect(spy).toHaveBeenCalledWith(url, payload);
    });
  });
});
