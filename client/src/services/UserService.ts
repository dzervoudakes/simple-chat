/**
 * Service class that controls interactions with the '/users' API.
 * @packageDocumentation
 */
import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from '@src/types';

const BASE_URL = `${API_BASE_URL}/users`;

export class UserService {
  static createUser({ data, source }: Omit<ApiRequest<AuthPayload>, 'jwt'>): ApiResponse {
    return axios.post(BASE_URL, data, {
      cancelToken: source.token
    });
  }
}

export default UserService;
