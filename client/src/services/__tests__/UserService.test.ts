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
      const options = {
        cancelToken: source.token
      };

      UserService.createUser({ source, data });

      expect(spy).toHaveBeenCalledWith(url, data, options);
    });
  });
});
