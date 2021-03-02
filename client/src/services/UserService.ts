import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from '@src/types';

export class UserService {
  static createUser({ data, source }: Omit<ApiRequest<AuthPayload>, 'jwt'>): ApiResponse {
    return axios.post(`${API_BASE_URL}/users`, {
      cancelToken: source.token,
      data
    });
  }

  static getUsers({ source, jwt }: ApiRequest<void>): ApiResponse {
    return axios.get(`${API_BASE_URL}/users`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default UserService;
