import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from './types';

const BASE_URL = `${API_BASE_URL}/users`;

export class UserService {
  static createUser({ data, source }: Omit<ApiRequest<AuthPayload>, 'jwt'>): ApiResponse {
    return axios.post(BASE_URL, data, {
      cancelToken: source.token
    });
  }

  static getUsers({ source, jwt }: ApiRequest<void>): ApiResponse {
    return axios.get(BASE_URL, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default UserService;
